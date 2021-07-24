let filmsState = {
    _filmList: document.querySelector(".films-container ul"),
    _filmsArr: null,
    _filmNameElement: document.querySelector(".filmName"),
    _filmDescriptionList: document.querySelector(".description ul"),
    _defaultLeftPosition: 520,
    _currentIndex: -1,
    _currentLeftPosition: 0,
    _bgElement: document.querySelector("div.background"),

    update: function(category) {
        this._setDefault();

        if (category.filmNames.length === 0 ){
            this._setEmpty();
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

        this._sefFilmDescription(this._filmsArr[this._currentIndex]);
    },

    _sefFilmDescription(film){
        this._setBackground(film.imgPath);
        this._filmNameElement.innerHTML = film.name;
        let str = '<li>' + film.countries.toString().replace(",", ", ") +
            ', ' + film.year + '</li>'+
            '<li>'+ film.genres.toString().replace(",", ", ") + '</li>'+
            '<li><div class="rect">' + film.parentalGuidance + '+' + '</div></li>'+
            '<li>IMDb: ' + film.imdRating + ' <img src="img/rating-star-icon.png"> Кинопоиск: ' + film.kpRating +
            ' <img src="img/rating-star-icon.png"></li>';
        this._filmDescriptionList.innerHTML = str;
    },

    _setDefault: function(){
        this._filmList.innerHTML = "";
        this._currentIndex = -1;
        this._currentLeftPosition = this._defaultLeftPosition;
    },

    _setEmpty: function(){
        this._setBackground("img/default-bg.png");
        this._filmNameElement.innerHTML = "";
        this._filmDescriptionList.innerHTML = "";
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
        app.setFocusedState("categoryState");
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
        this._filmList.innerHTML = "";
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