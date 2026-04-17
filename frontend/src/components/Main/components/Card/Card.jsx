import { useContext } from "react";
import ImagePopup from "../ImagePopup/ImagePopup.jsx"
import DeletePopup from "../DeletePopup/DeletePopup.jsx";
import { CurrentUserContext } from '../../../../contexts/CurrentUserContext.js';

export default function Card(props) {
    const { currentUser } = useContext(CurrentUserContext);
    const { name, link, likes } = props.card;
    const { handleOpenPopup, onCardLike, onCardDelete } = props;
    const isLiked = likes.some(id => id === currentUser._id);
    const cardLikeButtonClassName = `landscapes__card-icon ${ isLiked ? 'landscapes__card-icon_liked' : ''}`;

    function handleLikeClick() {
        onCardLike(props.card);
    };

    function handleDeleteClick() {
        onCardDelete(props.card);
    };

    const imageComponent = {
        name: name,
        link: link,
        children: <ImagePopup card={props.card}/>
    }

    const deletePopup = { title: "Eliminar tarjeta?", children: <DeletePopup card={props.card} onCardDelete={handleDeleteClick} />, element: "#popup__button" };

    return (
        <div className="landscapes__card">
            <img className="landscapes__image" alt="" src={link} onClick={() => handleOpenPopup(imageComponent)} /> 
            <div className="landscapes__card-description">
                <h2 className="landscapes__card-title">{name}</h2>
                <div className={cardLikeButtonClassName} onClick={handleLikeClick}></div> 
            </div>
            <div className="landscapes__card-trash" onClick={() => handleOpenPopup(deletePopup)}></div>
        </div>
    )
}
