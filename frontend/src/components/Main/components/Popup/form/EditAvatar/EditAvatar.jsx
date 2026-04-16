import { useRef, useContext } from "react";
import { CurrentUserContext } from '../../../../../../contexts/CurrentUserContext.js';

export default function EditAvatar() {
    const { handleUpdateAvatar } = useContext(CurrentUserContext);
    const avatarRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        handleUpdateAvatar({ avatar: avatarRef.current.value });
    }

    return (
        <form className="popup__form" id="popup__profile-pic-form" onSubmit={handleSubmit}>
            <label className="popup__field-holder">
                <input
                id="imageURL"
                className="popup__field popup__field-url"
                type="url"
                placeholder="URL de nueva foto de perfil"
                required
                ref={avatarRef}
                />
                <span className="popup__field-error popup__imageURL-error"></span>
            </label>
            <button className="popup__button">Actualizar</button>
        </form>
    )
}