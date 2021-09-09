import Utils from "../Utils";

class TimetableTab{

    constructor(element, event, gridStart, gridEnd, detail) {
        this.row = element;
        this.event = event;
        this.detail = detail;
        this.initElement(gridStart, gridEnd);
    }

    initElement(gridStart, gridEnd){
        let tab = this.createElement();
        tab.setAttribute("style", "grid-column:"+gridStart+"/"+ gridEnd);
        this.event.displayElement = tab;
        this.row.appendChild(tab);
        tab.style.backgroundColor = Utils.getRandomColor();
        tab.classList.add(".event");
    }

    createElement(){
        const ev = this.event;
        let result = document.createElement("div");
        let span = document.createElement("span");
        span.appendChild(document.createTextNode(`${ev.name}`));
        result.appendChild(span);
        result.addEventListener("overflow", this.overFlowHandler.bind(this));
        result.addEventListener("click", this.clickHandler.bind(this));
        return result;
    }

    overFlowHandler(e){
        let el = e.target;
        console.log(el.offsetWidth /10);
        el.innerHTML = el.innerHTML.substr(0, el.offsetWidth/15)+"...";
    }

    clickHandler(e){
        this.detail.displayEvent(this.event);
        document.querySelector("main").classList.toggle("modal-visible");
    }


}

export default TimetableTab;



