var filmsState = {
    _filmList: document.querySelector(".films-container ul"),
    // _filmList: document.getElementsByClassName("films-container")[0].children[0],

    _filmsArr: null,
    _filmNameElement: document.querySelector(".filmName"),
    // _filmNameElement: document.getElementsByClassName("filmName")[0],

    _filmDescriptionList: document.querySelector(".description ul"),
    // _filmDescriptionList: document.getElementsByClassName("description")[0].children[0],
    _defaultLeftPosition: 520,
    _currentIndex: -1,
    _currentLeftPosition: 0,
    _bgElement: document.querySelector("div.background"),
    // _bgElement: document.getElementsByClassName("background")[0],

    update: function(category) {
        this._setDefault();

        if (category.filmNames.length === 0 ){
            this._setEmpty();
            return;
        }

        this._filmsArr = [];
        for (var i = 0; i < category.filmNames.length; i++){
            this._filmsArr.push(CopyObj(config.films[category.filmNames[i]]));
        }
        this._renderFilms();

        this._setCurrent(0);
    },

    _setCurrent: function (index) {
        if(index < 0 || index >= this._filmsArr.length){
            return;
        }

        var offset = 0;
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

    _sefFilmDescription: function(film){
        this._setBackground(film.imgPath);
        this._filmNameElement.innerHTML = film.name;
        var str = '<li>' + film.countries.toString().replace(",", ", ") +
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
        mainApp.setFocusedState("categoryState");
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

        this.removeFocus();
        this._addLine(this._currentIndex);
        this._filmsArr[this._currentIndex].HTMLElement.classList.add("focus");
    },

    removeFocus: function(){
        // var temp = document.getElementsByClassName("films-container")[0]
        //     .getElementsByClassName("focus")[0];
        var temp = document.querySelector(".films-container .focus");

        if ( temp ){
            temp.classList.remove("focus");
        }
        this._removeLine();
    },

    _removeLine: function () {
        // var temp = document.getElementsByClassName("films-container")[0]
        //     .getElementsByClassName("line")[0];
        var temp = document.querySelector(".films-container .line");

        if(temp){
            temp.remove();
        }
    },

    _addLine: function (index) {
        this._filmsArr[index].HTMLElement.insertAdjacentHTML("beforeend",
            '<div class="line"></div>');
    },

    _renderFilms: function () {
        this._filmList.innerHTML = "";
        for (var i = 0; i < this._filmsArr.length; i++) {
            var li = document.createElement("li");
            var img = document.createElement("img");
            img.src = this._filmsArr[i].imgPath;
            li.appendChild(img);
            this._filmList.appendChild(li);
            this._filmsArr[i].HTMLElement = li;
        }
        this._filmList.style.left = this._defaultLeftPosition + "px";
        document.querySelector(".films-container").appendChild(this._filmList);
        // document.getElementsByClassName("films-container")[0].appendChild(this._filmList);
    },

    _setBackground: function(imgPath){
        this._bgElement.style.background = 'url(' + '"' + imgPath + '") no-repeat';
        this._bgElement.style.backgroundSize = "cover";
    }

};