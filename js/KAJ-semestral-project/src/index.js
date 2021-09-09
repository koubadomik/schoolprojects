import Timetable from "./Components/Timetable"
import Event from "./Components/Event";
import EventFormHandler from "./Components/EventFormHandler";
import TimeFormHandler from "./Components/TimeFormHandler";
import Utils from "./Utils";
import Constants from "./Constants";
import DragAndDrop from "./Components/DragAndDrop";

class Main {
    constructor() {

        //fade-in
        document.querySelector("body").classList.add("fade-in");


        //timetable init state
        const initState = document.querySelector("main").innerHTML;

        //timetable init
        let timetable = null;
        try{
            let start = localStorage.getItem("start");
            let end = localStorage.getItem("end");
            if(start && end){
                timetable = new Timetable(parseInt(end)-parseInt(start), parseInt(start));
            }else{
                localStorage.setItem("start", 7);
                localStorage.setItem("end", 21);
                timetable = new Timetable(14, 7);
            }
        }catch(e){
            timetable = new Timetable(14, 7);
        }

        //localStorageInit
        Utils.initLocalStorage(timetable);


        //Handlers
        new EventFormHandler(timetable);
        new TimeFormHandler(timetable, initState);
    }

}

// MAIN RUN
new Main();
