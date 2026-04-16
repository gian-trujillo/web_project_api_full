import logo from '../../../favicon.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { removeToken } from '../../utils/tokens.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import closeImage from '../../images/closeIcon.png'
import menuIcon from '../../images/menu.svg'

function Header({ setIsLoggedIn, isLoggedIn, isMenuOpen, setIsMenuOpen }) {
    const location = useLocation();
    const navigate = useNavigate();
    const { currentUser } = useContext(CurrentUserContext);

    const pathname = location.pathname;

    let buttonText = "";
    let action;

    if (pathname === "/login") {
        buttonText = "Registrate";
        action = () => navigate("/register");
    } else if (pathname === "/register") {
        buttonText = "Iniciar sesión";
        action = () => navigate("/login");
    } else {
        buttonText = "Cerrar sesión";
        action = () => {
            setIsLoggedIn(false);
            setIsMenuOpen(false);
            removeToken();
        };
    }

    const handleButtonAction = () => {
        setIsMenuOpen(prev => !prev)
    }

    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname])

    return (
        <>
            <header className="header">
                {isMenuOpen && isLoggedIn && (           
                    <div className="header__dropdown">
                        <p>{currentUser.email}</p>
                        <button className='header__button' onClick={action}>{buttonText}</button>
                        <div className='header__line-menu'></div>
                    </div>
                )}
                <div className="header__container">
                    <img
                        className="header__logo"
                        alt="Logo de Around the U.S."
                        src={logo}
                    />
                    <div className={`header__info ${isLoggedIn ? 'header__info-mobile' : ''}`}>
                        {isLoggedIn && <p>{currentUser.email}</p>}
                        <button className="header__button" onClick={action}>{buttonText}</button>
                    </div>
                    {isLoggedIn && (
                        <button className='header__menu-button' onClick={handleButtonAction}>
                            <img
                                src={isMenuOpen ? closeImage : menuIcon}
                                alt='menu toggle'
                            />
                        </button>
                    )}

                </div>
                  <div className="header__line"></div>
            </header>
        </>
    )
}

export default Header