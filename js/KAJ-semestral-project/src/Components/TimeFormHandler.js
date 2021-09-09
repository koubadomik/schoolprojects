import Timetable from "./Timetable";
import Constants from "../Constants";
import Utils from "../Utils";

class TimeFormHandler{
    constructor(timetable, initState){
        this.timetable = timetable;
        this.initState = initState;
        this.startField = document.querySelector("#start-timetable");
        this.endField = document.querySelector("#end-timetable");
        this.startField.addEventListener("change", this.onChange.bind(this));
        this.endField.addEventListener("change", this.onChange.bind(this));

        this.initLableListeners();

        //TODO: another formats
        this.changeTimeTableScaleSound = new Audio(`${Constants.MEDIA_PATH}change_scale.mp3`);
    }

    initLableListeners(){
        document.querySelector("#end-up").addEventListener("click", e=>{
            if(parseInt(this.endField.value) < 24){
                this.endField.value = parseInt(this.endField.value)+1;
                this.endField.dispatchEvent(new Event("change"));
            }
        });
        document.querySelector("#end-down").addEventListener("click", e=>{
            if(parseInt(this.endField.value) > (parseInt(this.startField.value)+2)){
                this.endField.value = parseInt(this.endField.value)-1;
                this.endField.dispatchEvent(new Event("change"));
            }
        });
        document.querySelector("#start-up").addEventListener("click", e=>{
            if(parseInt(this.endField.value) > (parseInt(this.startField.value)+2)){
                this.startField.value = parseInt(this.startField.value)+1;
                this.startField.dispatchEvent(new Event("change"));
            }
            });
        document.querySelector("#start-down").addEventListener("click", e=>{
            if(parseInt(this.startField.value) > 1){
                this.startField.value = parseInt(this.startField.value)-1;
                this.startField.dispatchEvent(new Event("change"));
            }
            });
    }

    onChange(e){
        this.changeTimeTableScaleSound.volume = 0.7;
        Utils.playSound(this.changeTimeTableScaleSound);
        const events = this.timetable.events;
        this._initMainSection();
        try{
            localStorage.setItem("start", this.startField.value);
            localStorage.setItem("end", this.endField.value);
        }catch(e){
            //SAFARI anonymous mode hack
        }
        this.timetable = new Timetable(parseInt(this.endField.value) - parseInt(this.startField.value), parseInt(this.startField.value));
        events.forEach( event => this.timetable.addEvent(event));
    }

    _initMainSection(){
        document.querySelector("main").innerHTML = this.initState;
    }

}

export default TimeFormHandler;