import { useContext } from "react";
import { CurrentUserContext } from '../../../../../../contexts/CurrentUserContext.js';


export default function NewCard() {
    const { handleAddPlaceSubmit } = useContext(CurrentUserContext);
    function handleSubmit(e) {
        e.preventDefault();
        const title = e.target.title.value;
        const imageUrl = e.target['image-url'].value;
        handleAddPlaceSubmit({ name: title, link: imageUrl });
    }
    
    return (
        <form className="popup__form" id="popup__add-form" onSubmit={handleSubmit}>
            <label className="popup__field-holder">
                <input
                id="title"
                className="popup__field popup__field-title"
                type="text"
                placeholder="Titulo"
                required
                minLength="2"
                maxLength="30"
                />
                <span className="popup__field-error popup__title-error"></span>
            </label>
            <label className="popup__field-holder">
                <input
                id="image-url"
                className="popup__field popup__field-url"
                type="url"
                placeholder="URL del imagen"
                required
                />
                <span className="popup__field-error popup__image-url-error"></span>
            </label>
            <button className="popup__button">Crear</button>
        </form>
    )
}