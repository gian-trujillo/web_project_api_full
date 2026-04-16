import { useContext } from "react";
import NewCard from './components/Popup/form/NewCard/NewCard.jsx';
import EditProfile from './components/Popup/form/EditProfile/EditProfile.jsx';
import EditAvatar from './components/Popup/form/EditAvatar/EditAvatar.jsx';
import Popup from './components/Popup/Popup.jsx';
import Card from './components/Card/Card.jsx';
import EditButton from '../../images/edit_button.png';
import ProfileEditButton from '../../images/profile_edit_button.png';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

function Main({ onOpenPopup, onClosePopup, cards, onCardLike, onCardDelete }) {
    const { currentUser, popup } = useContext(CurrentUserContext);
   
    const newCardPopup = { title: "Nuevo Lugar", children: <NewCard />, element: "#popup__add-form" };
    const editProfilePopup = { title: "Editar Perfil", children: <EditProfile />, element: "#popup__editer-form" };
    const editAvatarPopup = { title: "Cambiar foto de perfil", children: <EditAvatar />, element: "#popup__profile-pic-form" };

    return (
        <>
            <main>
                <section className="profile">
                <div className="profile__container">
                    <div className="profile__container-image">
                    <img className="profile__image" alt="Foto de perfil" src={currentUser.avatar} />
                    <button className="profile__image-change" type='button' onClick={() => onOpenPopup(editAvatarPopup)}>
                        <img
                        className="profile__image-button"
                        alt="Cambio de foto de perfil"
                        src={ProfileEditButton}
                        />
                    </button>
                    </div>

                    <div className="profile__info">
                    <div className="profile__info-adjust">
                        <h1 className="profile__info-name">{currentUser.name}</h1>
                        <img
                        className="profile__edit-button"
                        onClick={() => onOpenPopup(editProfilePopup)}
                        alt="icono de editar perfil"
                        src={EditButton}
                        />
                    </div>
                    <p className="profile__info-description">{currentUser.about}</p>
                    </div>
                </div>
                <button className="profile__add-button" aria-label='add card' type='button' onClick={() => onOpenPopup(newCardPopup)}>+</button>
                </section>
                <section className="landscapes">
                    {cards.map((card) => {
                        return <Card key={card._id} card={card} handleOpenPopup={onOpenPopup} onCardLike={onCardLike} onCardDelete={onCardDelete} />
                    })}
                </section>

                {popup && (
                    <Popup onClose={onClosePopup} title={popup.title} element={popup.element}>
                        {popup.children}
                    </Popup>
                )}
            </main>
        </>
    )
}

export default Main