import Utils from "../Utils";

class EventDetail{
    constructor(){
        this.initElements();
    }

    initElements(){
        document.querySelector(".back-button").addEventListener("click",
            e => {document.querySelector("main").classList.toggle("modal-visible");});
        this.element = document.querySelector(".event-detail-content section");
    }

    displayEvent(event){
        this.element.innerHTML = "";
        this.initValues(event);
    }

    initValues(e){
        let name = document.createElement("h1");
        let time = document.createElement("h2");
        let place = document.createElement("h2");
        let file = document.createElement("h2");
        let descriptionLabel = document.createElement("h2");
        let description = document.createElement("p");

        name.appendChild(document.createTextNode(e.name));
        time.innerHTML = `<span>Time </span>${Utils.indexToDayOfWeek(e.day)} ${e.startInHours}:00 - ${e.startInHours+e.duration}:00`;
        let placeLabel = document.createElement("span");
        placeLabel.innerHTML = "Place";
        place.appendChild(placeLabel);
        place.appendChild(document.createTextNode(`${e.place}`));

        if(e.fileBase64){
            file.innerHTML = "<a href='"+e.fileBase64+"'><img src='./resource/media/download.svg' alt='download'> attachment</a>";
        }
        if(e.note){
            descriptionLabel.innerHTML = "<span>Description</span>";
            description.appendChild(document.createTextNode(e.note));
        }

        this.element.appendChild(name);
        this.element.appendChild(time);
        this.element.appendChild(place);
        this.element.appendChild(file);
        this.element.appendChild(document.createElement("br"));
        this.element.appendChild(descriptionLabel);
        this.element.appendChild(description);
    }





}

export default EventDetail;