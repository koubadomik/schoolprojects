import TimetableRow from "./TimetableRow";
import EventDetail from "./EventDetail";

class Timetable{
    constructor(cols, start){
        this.cols = cols;
        this.start = start;
        this.end = start+cols;

        this._colsInit(cols);
        this._rowsInit();
        this._detailInit();
    }

    get events(){
        return [].concat.apply([],this.rows.map(row => row.events));
    }

    _colsInit(cols){
        Timetable._verticalLinesInit(cols);
        this._hourLabelsInit();
    }

    static _verticalLinesInit(cols){
        let svg = document.querySelector("svg");
        for (let i = 0; i < cols; i++){
            let position = 100/cols;
            let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", (position*i)+"%");
            line.setAttribute("x2", (position*i)+"%");
            line.setAttribute("y1", "0");
            line.setAttribute("y2", "99%");
            svg.appendChild(line);
        }
    }

    _hourLabelsInit(){
        let numberDiv = document.querySelector(".numbers");
        let div = document.createElement("div");
        div.style.width = "15%";
        numberDiv.appendChild(div);
        for (let i = this.start; i < this.end; i++){
            let span = document.createElement("span");
            span.innerHTML = i+"";
            span.style.width = `${85 / this.cols}%`;
            numberDiv.appendChild(span);
        }
    }

    _detailInit(){
        this.detail = new EventDetail();
    }

    _rowsInit(){
        this.rows = [];
        document.querySelectorAll(".timetablerow").forEach(
          row => this.rows.push(new TimetableRow(row, this.start, this.cols))
        );
    }

    addEvent(event){
        // if(event.day > this.rows.length-1) return;
        this.rows[event.day].addEvent(event, this.detail);
        try{
            localStorage.setItem("events", JSON.stringify(this.events));
        }catch(e){
            //because of SAFARI for IOS
        }
    }


}
export default Timetable;