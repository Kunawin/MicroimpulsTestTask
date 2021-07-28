var mainApp = {
    states: {categoryState: categoriesState, filmsState: filmsState, menuState: menuState},
    _currentState: null,

    init: function () {
        for (var key in this.states){
            if (this.states[key].init){
                this.states[key].init();
            }
        }

        this.setFocusedState("categoryState");
    },

    setFocusedState: function (stateKey) {
        if (!stateKey in this.states){
            return;
        }

        if(mainApp.states[stateKey].canSetFocus()){
            if (this._currentState){
                this._currentState.removeFocus();
            }
            this._currentState = this.states[stateKey];
            this._currentState.setFocus();
        }
    },

    leftAction:function () {
        if (this._currentState.leftAction){
            this._currentState.leftAction();
        }
    },

    rightAction:function () {
        if (this._currentState.rightAction){
            this._currentState.rightAction();
        }
    },

    upAction:function () {
        if (this._currentState.upAction){
            this._currentState.upAction();
        }
    },

    downAction:function () {
        if (this._currentState.downAction){
            this._currentState.downAction();
        }
    },
};

window.onload = function () {
    mainApp.init();

    window.addEventListener("keydown", function (key) {
        switch (key.keyCode) {
            case 37:
                mainApp.leftAction();
                break;
            case  39:
                mainApp.rightAction();
                break;
            case 38:
                mainApp.upAction();
                break;
            case  40:
                mainApp.downAction();
                break;
        }
    });
};