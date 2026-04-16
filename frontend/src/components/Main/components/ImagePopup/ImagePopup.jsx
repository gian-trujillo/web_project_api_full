export default function ImagePopup({ card }) {
    
    return (
        <>              
            <img className="popup__image" src={card.link} alt="" />
            <h2 className="popup__title-viewer">{card.name}</h2>
        </>
        
    );
}