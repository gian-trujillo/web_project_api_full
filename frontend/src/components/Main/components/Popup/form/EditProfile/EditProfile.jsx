import { useState, useContext } from "react";
import { CurrentUserContext } from '../../../../../../contexts/CurrentUserContext.js';

export default function EditProfile() {
    const {currentUser, handleUpdateUser } = useContext(CurrentUserContext);
    const [name, setName] = useState(currentUser.name);
    const [about, setAbout] = useState(currentUser.about);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleAboutChange = (e) => {
        setAbout(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleUpdateUser({ name, about: about });
    };

    return (
        <form className="popup__form" id="popup__editer-form" onSubmit={handleSubmit}>
            <label className="popup__field-holder">
                <input
                id="name"
                className="popup__field popup__field-name"
                type="text"
                placeholder="Nombre"
                name="userName"
                required
                minLength="2"
                maxLength="40"
                value={name}
                onChange={handleNameChange}
                />
                <span className="popup__field-error popup__name-error"></span>
            </label>
            <label className="popup__field-holder">
                <input
                id="job"
                className="popup__field popup__field-job"
                type="text"
                placeholder="Acerca de mí"
                required
                minLength="2"
                maxLength="200"
                name="userDescription"
                value={about}
                onChange={handleAboutChange}
                />
                <span className="popup__field-error popup__job-error"></span>
            </label>
            <button className="popup__button">Guardar</button>
        </form>
    )
}