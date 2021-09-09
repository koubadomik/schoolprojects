import Utils from "../Utils";
import Event from "../Components/Event"
import Constants from "../Constants";
import DragAndDrop from "./DragAndDrop";
class EventFormHandler {

    constructor(timetable){
        this.timatable = timetable;
        this._initElements();
        this._initEventListeners();
    }

    _initElements(){
        this.modalButtons = document.querySelectorAll(".modal-button");
        this.daySelect = document.querySelector("#create-event-form select");
        this.startHourField = document.querySelector("#create-event-form input[type=number]");
        this.placeField = document.querySelector("#create-event-form #place-field");
        this.nameField = document.querySelector("#create-event-form #name-field");
        this.durationField = document.querySelector("#create-event-form #duration-field");
        this.locationButton = document.querySelector("#create-event-form #location-button");
        this.form = document.querySelector("#create-event-form");
        this.noteField = document.querySelector("#create-event-form #note-field");
        this.dod = new DragAndDrop();
        this.addEventSound = new Audio(`${Constants.MEDIA_PATH}add_event.mp3`);
    }

    _initEventListeners(){
        this.modalButtons.forEach(button => button.addEventListener("click",this._toggleModal));
        this.locationButton.addEventListener("click", this.fillLocation.bind(this));
        this.form.addEventListener("submit", this._onSubmit.bind(this));
        this.durationField.addEventListener("change", this._duration_normalize.bind(this));
    }



    _duration_normalize(e){
        if(24 -parseInt(this.startHourField.value) < this.durationField.value){
            this.durationField.value = 24 -parseInt(this.startHourField.value);
        }
    }

    _onSubmit(event){
        event.preventDefault();
        this.timatable.addEvent(new Event(
            parseInt(this.daySelect.value),
            this.noteField.value,
            parseInt(this.startHourField.value),
            parseInt(this.durationField.value),
            this.placeField.value,
            this.nameField.value, this.dod.base));
        this._toggleModal();
        Utils.playSound(this.addEventSound);
        this.removeForm();
    }


    removeForm() {
        this.placeField.value = "";
        this.nameField.value = "";
        this.noteField.value = "";
        this.placeField.value = "";
        this._initLocalizationButton();
        this.dod.initArea();

    }

    _initLocalizationButton(){
        this.locationButton.innerHTML = "Use your current location";
        this.locationButton.disabled = true;
        this.locationButton.classList.remove("error-on-button");
        this.locationButton.classList.remove("ok-on-button");
    };

    // LOCATION
    fillLocation(e){
        e.preventDefault();
        Utils.getCurrentLocation(this.successLocation.bind(this), this.errorLocation.bind(this));

        this.locationButton.innerHTML = "Loading";
        this.locationButton.disabled = true;
        this.locationButton.classList.remove("error-on-button");
        this.locationButton.classList.remove("ok-on-button");
    }

    successLocation(location){
        this.placeField.value = `${location[0].address_components[2].long_name}, ${location[0].address_components[3].long_name}, ${location[0].address_components[4].long_name}`;
        this.locationButton.innerHTML = "Now it is done!";
        this.locationButton.classList.remove("error-on-button");
        this.locationButton.classList.toggle("ok-on-button");
        this.locationButton.disabled = true;
    }

    errorLocation(){
        this.locationButton.innerHTML = "Localization denied or failed, try again";
        this.locationButton.style.color = "red";
        this.locationButton.classList.toggle("error-on-button");
        this.locationButton.classList.remove("ok-on-button");
        this.locationButton.disabled = false;

    }
    //UTILS
    _toggleModal(){
        document.querySelector("body").classList.toggle("modal-visible");
    }


}
export default EventFormHandler;