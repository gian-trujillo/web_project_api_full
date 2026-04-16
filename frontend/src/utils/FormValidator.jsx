class FormValidator {
    constructor(config) {
        this._config = config;
    }
    
    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(
            `.popup__${inputElement.id}-error`
        );
        inputElement.classList.add(this._config.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._config.errorClass);
    }
    
    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(
            `.popup__${inputElement.id}-error`
        );
        inputElement.classList.remove(this._config.inputErrorClass);
        errorElement.textContent = "";
        errorElement.classList.remove(this._config.errorClass);
    }
    
    _setEventListeners() {
        this._toggleButtonState();
        this._inputList.forEach((inputItem) => {
            inputItem.addEventListener("input", () => {
                this._toggleButtonState();
                this._validityState(inputItem);
            });
        });
    }
    
    _validityState(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }
    
    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }
    
    _toggleButtonState() {
        if (this._inputList.length === 0) {
            return
        }
        else if (this._hasInvalidInput(this._inputList)) {
            this._buttonElement.classList.add(this._config.inactiveButtonClass);
            this._buttonElement.disabled = true;
        } else {
            this._buttonElement.classList.remove(this._config.inactiveButtonClass);
            this._buttonElement.disabled = false;
        }
    }
    
    enableValidation(formElement) {

        this._formElement = formElement;        
        this._inputList = Array.from(
            this._formElement.querySelectorAll(config.inputSelector)
        );
        this._buttonElement = this._formElement.querySelector(
            config.submitButtonSelector
        );
        this._formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    }
}

const config = {
    formSelector: ".popup__form",
    inputSelector: ".popup__field",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_inactive",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__field-error_active",
};

export const formValidator = new FormValidator(config);