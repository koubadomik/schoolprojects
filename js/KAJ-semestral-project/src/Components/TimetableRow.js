import Utils from "../Utils";
import TimetableTab from "./TimetableTab";

class TimetableRow{
    constructor(element, start, cols){
        this.start = start;
        this.cols = cols;
        this.end = start+cols;
        this.element = element;
        this.element.setAttribute("style", `grid-template-columns: repeat(${cols}, 1fr)`);
        this.events = [];
    }

    update(){
        // const oneHourDistance = 100/this.cols;
        this.element.innerHTML = "";
        this.events.forEach(event => {
            const gridStart = this.getGridStart(event);
            const gridEnd = this.getGridEnd(event);
            // console.log("TEST: DISPLAY: "+gridStart > this.cols || gridEnd <= 1+" "+event.name);
            if(gridStart > this.cols || gridEnd <= 1){
                //do nothing
            }else{
                new TimetableTab(this.element, event, gridStart, gridEnd, this.detail);
            }
        })
    };


    addEvent(event, detail){
        this.detail = detail;
        this.events.push(event);
        this.update();
    }


    getGridStart(event) {
        let gridStart = event.startInHours-this.start+1;
        return gridStart <= 0 ? 1 : gridStart;
    }

    getGridEnd(event) {
        return event.startInHours-this.start+1 + event.duration;
    }
}
export default TimetableRow;