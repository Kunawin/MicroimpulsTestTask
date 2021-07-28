var menuState = {
    _headerElement: document.querySelector(".header"),
    _menuItemsList: document.querySelectorAll(".menu-container div, .settings-container div"),
    _currentIndex: -1,

    init: function () {
        console.log(this.menuItemsList);
        if (this._menuItemsList.length !== 0){
            this._currentIndex = 0;
        }
    },

    _setCurrent: function(index){
        if(index < 0 || index >= this._menuItemsList.length){
            return;
        }
        if(this._currentIndex !== -1) {
            this.removeFocus();
        }

        this._currentIndex = index;

        this.setFocus();
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

        this._menuItemsList[this._currentIndex].classList.add("focus");
        this._headerElement.classList.add("active");
    },

    removeFocus: function () {
        var temp = document.querySelector(".header .focus");

        if (temp){
            temp.classList.remove("focus");
        }

        this._headerElement.classList.remove("active");
    },

    downAction: function () {
        mainApp.setFocusedState("categoryState");
    },

    leftAction: function () {
        this._setCurrent(this._currentIndex - 1);
    },

    rightAction: function () {
        this._setCurrent(this._currentIndex + 1);
    }

};