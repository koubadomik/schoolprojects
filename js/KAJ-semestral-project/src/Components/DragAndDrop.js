import Constants from "../Constants";

class DragAndDrop{

    constructor(){
        this.area = document.querySelector("#drop-area");
        this.initArea();
        this.area.addEventListener("dragover", this.handleDrag.bind(this));
        this.area.addEventListener("drop", this.handleDrop.bind(this));
        document.querySelector("body").addEventListener("dragover", e => e.preventDefault());
        document.querySelector("body").addEventListener("drop", e => {
            e.preventDefault();
            this.area.classList.remove("dragover");
            // this.initArea();
        });
        this.fr = new FileReader();
        this.fr.addEventListener("load", this._loadFile.bind(this));
        this.base = null;
    }

    initArea(){
        this.base = null;
        this.area.innerHTML = "Just drag 'n drop some file";
        this.area.style.color = "black";
        this.area.style.border = "none";
        this.area.classList.remove("dragover");
    }

    handleDrag(event){
        event.preventDefault();
        this.area.classList.add("dragover");
        this.area.innerHTML = "Drop here";
    }

    _displayWrong(message){
        this.area.innerHTML = message;
        this.area.classList.add("wrong-dod");
    }

    _displayFileName(file){
        this.area.innerHTML = file.name;
        this.area.style.color = "green";
        this.area.style.border = "green 1px solid";
    }

    _isFileBiggerThanLimit(fileSize){
        return (fileSize/1000000) > Constants.MAX_FILE_SIZE;
    }

    handleDrop(ev) {
        ev.preventDefault();

        if (ev.dataTransfer.items) {
            if (ev.dataTransfer.items.length > 1) {
               this._displayWrong("Only one file");
            }
            if (ev.dataTransfer.items[0].kind === 'file') {
                let file = ev.dataTransfer.items[0].getAsFile();
                if(this._isFileBiggerThanLimit(file.size)){
                    this._displayWrong(`Too big file, max ${Constants.MAX_FILE_SIZE}MB`);
                    return;
                }
                this.fr.readAsDataURL(file);
                this._displayFileName(file);
            } else {
                this._displayWrong("Only files nothing else");
            }
        }
        else {
            if(ev.dataTransfer.files.length > 1) {
                this._displayWrong("Only one file");
            }else {
                let file = ev.dataTransfer.files[0];
                if(this._isFileBiggerThanLimit(file.size)){
                    this._displayWrong(`Too big file, max ${Constants.MAX_FILE_SIZE}MB`);
                    return;
                }
                this.fr.readAsDataURL(file);
                this._displayFileName(file);
            }
        }
        this._cleanUp(ev);
    }


    _loadFile(event){
        this.base = event.target.result;
    }

    _cleanUp(event){
        if (event.dataTransfer.items) {
            event.dataTransfer.items.clear();
        } else {
            event.dataTransfer.clearData();
        }
    }

}

export default DragAndDrop;