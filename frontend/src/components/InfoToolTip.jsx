import closeIcon from '../images/closeToolTip.svg';
import successImage from '../images/correct.svg';
import errorImage from '../images/wrong.svg';
import loading from '../images/loading.gif';

export default function InfoToolTip({ isOpen, onClose, authStatus, infoToolTipMessage }) {

    const handleTitle = () => {
        if (infoToolTipMessage === 'login') {
            return authStatus === 'success' ? '¡Correcto! Iniciaste sesión.' : authStatus === 'error' ? 'Uy, algo salió mal. Por favor, inténtalo de nuevo.' : 'Iniciando sesión...';
        } else if (infoToolTipMessage === 'register') {
            return authStatus === 'success' ? '¡Correcto! Ya estás registrado.' : authStatus === 'error' ? 'Uy, algo salió mal. Por favor, inténtalo de nuevo.' : 'Registrando...';
        }
    };


    return (
        <div className={`info info__tooltip ${isOpen ? "info__open" : ""}`}>
            <div className="info__container">
                <button id="close" className="info__close-button" onClick={onClose}>
                    <img
                        className="info__close-image"
                        alt="close"
                        src={closeIcon}
                    />
                </button>
                <img className="info__status-image" alt='status' src={authStatus === 'success' ? successImage : authStatus === 'error' ? errorImage : authStatus === 'loading' ? loading : null} />
                <h2 className="info__status-message">{handleTitle()}</h2>
            </div>
        </div>
    )
}