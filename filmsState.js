let filmsState = {
    _filmList: null,
    _filmsArr: null,
    _defaultLeftPosition: 520,
    _currentIndex: -1,
    _currentLeftPosition: 0,
    _bgElement: document.querySelector("div.background"),

    update: function(category) {
        document.querySelector("div.films-container").children[0]?.remove();
        this._currentIndex = -1;
        this._currentLeftPosition = this._defaultLeftPosition;

        if (category.filmNames.length === 0 ){
            this._setBackground("img/default-bg.png");
            document.querySelector(".filmName").innerHTML = "";
            return;
        }

        this._filmsArr = [];
        for (let i = 0; i < category.filmNames.length; i++){
            this._filmsArr.push(CopyObj(config.films[category.filmNames[i]]));
        }
        this._renderFilms();

        this._setCurrent(0);
    },

    _setCurrent: function (index) {
        if(index < 0 || index >= this._filmsArr.length){
            return;
        }

        let offset = 0;
        if(this._currentIndex !== -1)
        {
            this.removeFocus();
            offset = getCoords(this._filmsArr[index].HTMLElement).left -
                getCoords(this._filmsArr[this._currentIndex].HTMLElement).left;
        }

        this._currentLeftPosition = this._currentLeftPosition - offset;

        this._filmList.style.left = this._currentLeftPosition + "px";

        this._currentIndex = index;

        this._setBackground(this._filmsArr[this._currentIndex].imgPath);
        document.querySelector(".filmName").innerHTML = this._filmsArr[this._currentIndex].name;
    },

    leftAction: function(){
        this._setCurrent(this._currentIndex - 1);
        this.setFocus();
    },

    rightAction: function(){
        this._setCurrent(this._currentIndex + 1);
        this.setFocus();
    },

    upAction: function(){
        app.setFocusedState(0);
    },

    canSetFocus: function(){
        if (this._currentIndex === -1){
            return false;
        }

        return true;
    },

    setFocus: function () {
        if (!this.canSetFocus()){
            return;
        }

        document.querySelector("div.films-container .focus")?.classList.remove("focus");
        this._removeLine();
        this._addLine(this._currentIndex);
        this._filmsArr[this._currentIndex].HTMLElement.classList.add("focus");
    },

    removeFocus: function(){
        document.querySelector("div.films-container .focus")?.classList.remove("focus");
        this._removeLine();
    },

    _removeLine: function () {
        document.querySelector("div.films-container div.line")?.remove();
    },

    _addLine: function (index) {
        this._filmsArr[this._currentIndex].HTMLElement.insertAdjacentHTML("beforeend",
            '<div class="line"></div>');
    },

    _renderFilms: function () {
        this._filmList = document.createElement("ul");
        for (let i = 0; i < this._filmsArr.length; i++) {
            let li = document.createElement("li");
            let img = document.createElement("img");
            img.src = this._filmsArr[i].imgPath;
            li.appendChild(img);
            this._filmList.appendChild(li);
            this._filmsArr[i].HTMLElement = li;
        }
        this._filmList.style.left = this._defaultLeftPosition + "px";
        document.querySelector(".films-container").appendChild(this._filmList);
    },

    _setBackground: function(imgPath){
        this._bgElement.style.background = 'url(' + '"' + imgPath + '") no-repeat';
        this._bgElement.style.backgroundSize = "cover";
    }

};