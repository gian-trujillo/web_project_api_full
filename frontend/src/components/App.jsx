import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import '../index.css'
import Header from './Header/Header.jsx'
import Main  from './Main/Main.jsx'
import Footer from './Footer/Footer.jsx'
import Login from "./Login.jsx"
import Register from "./Register.jsx"
import InfoToolTip from './InfoToolTip.jsx';
import * as auth from './auth.js'
import { getToken, setToken } from '../utils/tokens.js'
import ProtectedRoute from './ProtectedRoute.jsx';
import { api } from '../utils/api.jsx'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'


function App() {
  const [ currentUser, setCurrentUser ] = useState({});
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authStatus, setAuthStatus] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [infoToolTipMessage, setInfoToolTipMessage] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const abort = new AbortController();
    const jwt = getToken();
    if (!jwt) {
      return;
    }    
    auth.getContent(jwt).then((res) => {
      setIsLoggedIn(true);
      setCurrentUser(res);
    }).catch((err) => {
      console.log(err);
    })
    api.getCards(abort.signal)
    .then((cards) => {
      setCards(cards);
    })
    .catch((err) => {
      console.log(err);
    });
    return () => abort.abort();
  }, []);

  useEffect(() => {
    if (authStatus === 'loading' || isInfoTooltipOpen === false) return;

    const timer = setTimeout(() => {
      setIsInfoTooltipOpen(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isInfoTooltipOpen, authStatus]);

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }
    setAuthStatus('loading');
    setIsInfoTooltipOpen(true);
    setInfoToolTipMessage('login');
    auth.signin(email, password)
    .then((data) => {
      if (!data || !data.token) {
        throw new Error('No se recibio un token');
      }
      if (data.token) {
        setAuthStatus('success');
        setToken(data.token);
        auth.getContent(data.token).then((res) => {
          setCurrentUser(res)
        });
        api.getCards()
        .then((cards) => {
          setCards(cards);
        })
        .catch((err) => {
          console.log(err);
        });

        setIsLoggedIn(true);

        const redirectPath = location.state?.from?.pathname || "/";
        setTimeout(() => {
          navigate(redirectPath);
        }, 3000);
        
      }
    }).catch((err) => {
      setAuthStatus('error');
      setIsInfoTooltipOpen(true);
      console.log(err);
    });
  }

  const handleRegistration = ({ email, password }) => {
    setAuthStatus('loading');
    setIsInfoTooltipOpen(true);
    setInfoToolTipMessage('register');

    if (!email || !password) {
      return;
    }
    auth.signup(email, password)
    .then((res) => {
      if (!res || res.error) {
        throw new Error(res.error);
      }
      setAuthStatus('success');
      navigate("/login");
    }) 
    .catch((err) => {
      setAuthStatus('error');
      console.log(err);
    });
  }

  async function handleAddPlaceSubmit(data) {
    await api.sendCardData(data.name, data.link).then((newCard) => {
        setCards([newCard, ...cards]);
        handleClosePopup();
    }).catch((err) => {
        console.log(err);
    });
  }

  async function handleCardDelete(card) {
    await api.deleteCard(card._id).then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        handleClosePopup();
    }).catch((err) => {
        console.log(err);
    });
  }
    
  async function handleCardLike(card) {
    let isLiked;
    if (card.likes.includes(currentUser._id)) {
      isLiked = true;
    }
    // const isLiked = card.isLiked;
    await api.toggleLike(card._id, !isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    }).catch((err) => {
        console.log(err);
    });
  }



  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  function handleInfoToolTipClose() {
    setIsInfoTooltipOpen(false);
  }

  const handleUpdateUser = (data) => {
    
      api.updateUserInfo(data.name, data.about).then((updatedData) => {
        setCurrentUser(prev => ({
          ...prev,
          ...updatedData
        }));
        handleClosePopup();
      }).catch((err) => {
        console.log(err);
      });
  }

  const handleUpdateAvatar = (data) => {
    (async () => {
      await api.updateUserAvatar(data.avatar).then((updatedData) => {
        setCurrentUser(prev => ({
          ...prev,
          ...updatedData
        }));
        handleClosePopup();
      }).catch((err) => {
        console.log(err);
      });
    })();
  }

  return (
    <>
      <CurrentUserContext.Provider value={{currentUser, handleUpdateUser, handleUpdateAvatar, handleAddPlaceSubmit, popup, isInfoTooltipOpen, authStatus, handleInfoToolTipClose}}>
        <div className="page">
          <Header setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          <Routes>
            <Route path="/" element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Main onOpenPopup={handleOpenPopup} onClosePopup={handleClosePopup} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />
              </ProtectedRoute>
            }></Route>
            <Route path="/login" element={
              <ProtectedRoute isLoggedIn={isLoggedIn} anonymous>
                <Login handleLogin={handleLogin} setIsInfoTooltipOpen={setIsInfoTooltipOpen} />
              </ProtectedRoute>
            } />
            <Route path="/register" element={
              <ProtectedRoute isLoggedIn={isLoggedIn} anonymous>
                <Register handleRegistration={handleRegistration} />
              </ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} />} />
          </Routes>
          <InfoToolTip isOpen={isInfoTooltipOpen} onClose={handleInfoToolTipClose} authStatus={authStatus} infoToolTipMessage={infoToolTipMessage} />
          <Footer />
        </div>
      </CurrentUserContext.Provider>
    </>
  )
}

export default App
