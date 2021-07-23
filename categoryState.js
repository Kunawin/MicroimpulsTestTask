let categoriesState = {
    _categoryList: null,
    _currentIndex: -1,
    _leftPosition: 200,

    init: function () {
        this._renderCategory();
        this._setCurrent(0);
    },

    _renderCategory: function(){
        this._categoryList = document.createElement("ul");
        if (config.categories.length !== 0){
            for (let i = 0; i < config.categories.length; i++){
                let listItem = document.createElement("li");
                let div = document.createElement('div');
                div.innerText = config.categories[i].name;
                listItem.appendChild(div);
                this._categoryList.appendChild(listItem);
                config.categories[i].HTMLElement = listItem;
            }
            document.querySelector(".category-container").appendChild(this._categoryList);
        }
    },

    _setCurrent: function (index) {
        if(index < 0 || index >= config.categories.length ){
            return;
        }

        let offset = 0;
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

        app.states["filmsState"].update(config.categories[this._currentIndex]);
    },

    _removeLine: function () {
        document.querySelector(".category-container .line")?.remove();
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
        app.setFocusedState("filmsState");
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

        document.querySelector("div.category-container .focus")?.classList.remove("focus");
        this._removeLine();
        this._addLine(this._currentIndex);
        config.categories[this._currentIndex].HTMLElement.classList.add("focus");
    },

    removeFocus: function () {
        document.querySelector("div.category-container .focus")?.classList.remove("focus");
        this._removeLine();
    }
};
