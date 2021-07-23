let app = {
    states: {"categoryState": categoriesState, "filmsState": filmsState},
    _currentState: null,

    init: function () {
        for (let key in this.states){
            if (this.states[key].init !== undefined){
                this.states[key].init();
            }
        }

        this.setFocusedState("categoryState");
    },

    setFocusedState: function (stateKey) {
        if (!stateKey in this.states){
            return;
        }

        if(app.states[stateKey].canSetFocus()){
            this._currentState?.removeFocus();
            this._currentState = this.states[stateKey];
            this._currentState.setFocus();
        }
    },

    leftAction:function () {
        if (this._currentState.leftAction !== undefined){
            this._currentState.leftAction();
        }
    },

    rightAction:function () {
        if (this._currentState.rightAction !== undefined){
            this._currentState.rightAction();
        }
    },

    upAction:function () {
        if (this._currentState.upAction !== undefined){
            this._currentState.upAction();
        }
    },

    downAction:function () {
        if (this._currentState.downAction !== undefined){
            this._currentState.downAction();
        }
    },
};

window.onload = function () {
    app.init();

    window.addEventListener("keydown", function (key) {
        switch (key.keyCode) {
           case 37:
               app.leftAction();
               break;
           case  39:
               app.rightAction();
               break;
            case 38:
                app.upAction();
                break;
            case  40:
                app.downAction();
                break;
       }
    });
};