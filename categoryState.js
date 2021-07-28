var categoriesState = {
    _categoryList: document.getElementsByClassName("category-container")[0].children[0],
    _currentIndex: -1,
    _leftPosition: 200,

    init: function () {
        this._renderCategory();
        this._setCurrent(0);
    },

    _renderCategory: function(){
        if (config.categories.length !== 0){
            for (var i = 0; i < config.categories.length; i++){
                var listItem = document.createElement("li");
                var div = document.createElement('div');
                div.innerText = config.categories[i].name;
                listItem.appendChild(div);
                this._categoryList.appendChild(listItem);
                config.categories[i].HTMLElement = listItem;
            }
            document.querySelector(".category-container").appendChild(this._categoryList);
            // document.getElementsByClassName("category-container")[0].appendChild(this._categoryList);
        }
    },

    _setCurrent: function (index) {
        if(index < 0 || index >= config.categories.length ){
            return;
        }

        var offset = 0;
        if(this._currentIndex !== -1) {
            config.categories[this._currentIndex].HTMLElement.classList.remove("current");

            this.removeFocus();

            offset = getCoords(config.categories[index].HTMLElement).left -
                getCoords(config.categories[this._currentIndex].HTMLElement).left;
        }

        this._leftPosition = this._leftPosition - offset;

        this._categoryList.style.left = this._leftPosition + 'px';

        config.categories[index].HTMLElement.classList.add("current");

        this._currentIndex = index;

        this.setFocus();

        mainApp.states["filmsState"].update(config.categories[this._currentIndex]);
    },

    _removeLine: function () {
        var temp = document.getElementsByClassName("category-container")[0]
                 .getElementsByClassName("line")[0];
        if(temp){
           temp.remove();
        }
    },

    _addLine:function (index) {
        config.categories[index].HTMLElement.insertAdjacentHTML("beforeend",
            '<div class="line"></div>');
    },

    leftAction: function(){
        this._setCurrent(this._currentIndex - 1);
    },

    rightAction: function() {
        this._setCurrent(this._currentIndex + 1);
    },

    downAction: function(){
        mainApp.setFocusedState("filmsState");
    },

    upAction: function(){
        mainApp.setFocusedState("menuState");
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
        config.categories[this._currentIndex].HTMLElement.classList.add("focus");

        this._categoryList.classList.add("active");
    },

    removeFocus: function () {
        // var temp = document.getElementsByClassName("category-container")[0]
        //     .getElementsByClassName("focus")[0];
        var temp = document.querySelector(".category-container .focus");

        if (temp){
            temp.classList.remove("focus");
        }
        this._removeLine();
        this._categoryList.classList.remove("active");
    },
};

