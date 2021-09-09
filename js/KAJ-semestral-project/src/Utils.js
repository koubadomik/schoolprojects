import Constants from "./Constants";

class Utils{

    static getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    static hourOptionsInit(query){
        let hourSelect = document.querySelector(query);
        for (let i = 0; i < 24; i++){
            let option = document.createElement("option");
            option.value = i+"";
            option.innerHTML = i+"";
            hourSelect.appendChild(option);
        }
    }

    static initLocalStorage(timetable) {
        let events = null;
        try {
            events = JSON.parse(localStorage.getItem("events"));

        }catch (e){//SAFARI HACK
             }

        if(events !== null){
            events.forEach(event => timetable.addEvent(event));
        }
    }

    static getCurrentLocation(success, error) {
        navigator.geolocation.getCurrentPosition(Position => {
            this.callGoogleAPI(Position, success, error);
        }, error);
    }
    static callGoogleAPI(position, success, error){
        fetch(`${Constants.LOCATION_SOURCE}&latlng=${(position.coords.latitude+"".substring(0, 7))},${(position.coords.longitude+"").substring(0, 7)}`)
            .then(response => response.json()).then(json=> success(json.results)).catch(error);
    }
    static indexToDayOfWeek(index){
        switch(index){
            case 0: return "Monday";
            case 1: return "Tuesday";
            case 2: return "Wednesday";
            case 3: return "Thursday";
            case 4: return "Friday";
            case 5: return "Saturday";
            case 6: return "Sunday";
        }
    }

    static playSound(sound){
        sound.load();
        sound.play();
    }

}

export default Utils;