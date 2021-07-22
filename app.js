let app = {
    states: [categoriesState, filmsState],
    _currentState: null,

    init: function () {
        for (let i = 0; i < this.states.length; i++){
            if (this.states[i].init !== undefined){
                this.states[i].init();
            }
        }

        this.setFocusedState(0);
    },

    setFocusedState: function (index) {
        if (index < 0 || index >= this.states.length){
            return;
        }

        if(app.states[index].canSetFocus()){
            this._currentState?.removeFocus();
            this._currentState = this.states[index];
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