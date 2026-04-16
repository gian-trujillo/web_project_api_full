import { useEffect } from 'react';
import closeIcon from '../../../../images/closeIcon.png'
import { formValidator } from '../../../../utils/FormValidator.jsx';

export default function Popup(props) {
    const { onClose, title, children, element } = props;
    useEffect(() => {
        const formElement = document.querySelector(element);
        title ? formValidator.enableValidation(formElement) : null;
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])



    
    return (
        <div className="popup">
            <div className={`popup__container ${!title ? "popup__container_viewer" : "popup__open"}`}>
                <button id="close" className="popup__close-button" onClick={onClose}>
                <img
                    className="popup__close-image"
                    alt="close"
                    src={closeIcon}
                />
                </button>
                {title && <h3 className="popup__title">{title}</h3>}
                
                {children}
            </div>
        </div>
    )
}
