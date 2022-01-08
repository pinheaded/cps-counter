const { Plugin } = require("powercord/entities");

const settings = require("./Settings");
const { DEFAULT_CPS_UNIT, PRIDE_MODE_KEYFRAMES } = require("./constants");

const i18n = require("./i18n");

module.exports = class CPSCounter extends Plugin {
    leftClicks = [];
    rightClicks = [];
    entityID = "cps-counter";

    get color() {
        return "#b643b6";
    }

    startPlugin() {
        powercord.api.settings.registerSettings(
            this.entityID,
            {
                category: this.entityID,
                label: "CPS Counter",
                render: settings,
            }
        );

        powercord.api.i18n.loadAllStrings(i18n);

        this.addCounter.bind(this);
        this.addCounter();

        if (this.settings.get("prideMode", false) === true) {
            let chromaInstance = this.cpsCounterContainer.animate(PRIDE_MODE_KEYFRAMES, {
                duration: 5000, iterations: Infinity
            });
            this.settings.set("_chromaInstance", chromaInstance);
        }

        this.mouseClick = this.registerMouseClick.bind(this);
        this.mouseDown = this.onMouseDown.bind(this);
        
        document.addEventListener("mouseup", this.mouseClick);
        document.addEventListener("mousedown", this.mouseDown);

        var theCounter = document.getElementById("cpsCounterContainer");
        
        this.idkWhatToNameThis = setInterval(() => {
            if (this.leftClicks.length > 0 && new Date().getTime() - this.leftClicks[0] >= 1000) {
                this.leftClicks.shift();
                try {
                    theCounter.innerHTML = this.settings.get("showRightClick")
                    ? `[ ${this.leftClicks.length} | ${this.rightClicks.length} ${this.settings.get("cpsUnit", DEFAULT_CPS_UNIT)} ]`
                    : `[ ${this.leftClicks.length} ${this.settings.get("cpsUnit", DEFAULT_CPS_UNIT)} ]`;
                }
                catch {}
            }

            if (this.rightClicks.length > 0 && new Date().getTime() - this.rightClicks[0] >= 1000) {
                this.rightClicks.shift();
                try {
                    theCounter.innerHTML = this.settings.get("showRightClick")
                    ? `[ ${this.leftClicks.length} | ${this.rightClicks.length} ${this.settings.get("cpsUnit", DEFAULT_CPS_UNIT)} ]`
                    : `[ ${this.leftClicks.length} ${this.settings.get("cpsUnit", DEFAULT_CPS_UNIT)} ]`;
                }
                catch {}
            }}, 1
        );

        this.observer = new MutationObserver(mutationsList => {
            mutationsList.forEach(mutation => {
                mutation.removedNodes.forEach(removedNode => {
                    if (removedNode.className == "typeWindows-2-g3UY withFrame-2dL45i titleBar-1it3bQ horizontalReverse-2QssvL flex-3BkGQD directionRowReverse-HZatnx justifyStart-2Mwniq alignStretch-Uwowzr") {
                        setTimeout(() => {
                            this.addCounter();
                            theCounter = document.getElementById("cpsCounterContainer");
                            if (this.settings.get("prideMode", false) === true) {
                                theCounter.classList.add(["prideMode"]);
                                let chromaInstance = this.cpsCounterContainer.animate(PRIDE_MODE_KEYFRAMES, {
                                    duration: 5000, iterations: Infinity
                                });
                                this.settings.set("_chromaInstance", chromaInstance);
                            }
                        }, 1000)
                    };
                });
            });
        });

        this.observer.observe(document.getElementById("app-mount"), {childList: true, subtree: false});
    }

    registerMouseClick(e) {
        this.cpsCounterContainer.classList.remove(["mouseDown"]);
        if (this.settings.get("prideMode", false) === true) {
            let chromaInstance = this.settings.get("_chromaInstance");
            chromaInstance.play();
            if (this.settings.get("seperateClickColor", false) === true) {
                chromaInstance.currentTime = this.chromaCurrentTime;
            }
        }
        if (typeof e === "object") {
            switch (e.button) {
                case 0: this.leftClicks.push(new Date().getTime());
                    break;
                
                case 2: this.rightClicks.push(new Date().getTime());
            }
        }
        try {
            this.cpsCounterContainer.innerHTML = this.settings.get("showRightClick")
            ? `[ ${this.leftClicks.length} | ${this.rightClicks.length} ${this.settings.get("cpsUnit", DEFAULT_CPS_UNIT)} ]`
            : `[ ${this.leftClicks.length} ${this.settings.get("cpsUnit", DEFAULT_CPS_UNIT)} ]`;

            this.cpsCounterContainer.style.color = this.settings.get("color", "white");
        }
        catch {}
    }

    onMouseDown(_) {
        if (this.settings.get("seperateClickColor", false) === true) {
            try {
                if (this.settings.get("prideMode", false) === true) {
                    let chromaInstance = this.settings.get("_chromaInstance");
                    this.chromaCurrentTime = chromaInstance.currentTime;
                    chromaInstance.cancel();
                }
                let defaultColor = this.settings.get("color", "#ffffff");
                this.cpsCounterContainer.style.color = this.settings.get("clickColor", this.settings.get("color", defaultColor));
                this.cpsCounterContainer.classList.add(["mouseDown"]);
            }
            catch {}
        }
    }

    addCounter() {
        var parent = document.querySelector(".flexCenter-1Mwsxg.flex-3BkGQD.justifyCenter-rrurWZ.alignCenter-14kD11:last-child");
        var little_baby = document.createElement("div");

        little_baby.className = "cpsCounterContainer";
        little_baby.id = "cpsCounterContainer";
        little_baby.style.maxWidth = "unset";
        little_baby.style.height = "18px";
        little_baby.style.position = "relative";
        little_baby.style.margin = "auto";
        little_baby.style.background = "transparent";
        little_baby.style.textAlign = "center";
        little_baby.style.color = this.settings.get("color", "white");

        little_baby.innerHTML = this.settings.get("showRightClick")
        ? `[ 0 | 0 ${this.settings.get("cpsUnit", DEFAULT_CPS_UNIT)} ]`
        : `[ 0 ${this.settings.get("cpsUnit", DEFAULT_CPS_UNIT)} ]`;

        this.cpsCounterContainer = parent.parentNode.insertBefore(little_baby, parent.nextSibling);
    }

    pluginWillUnload() {
        clearInterval(this.idkWhatToNameThis);
        this.observer.disconnect();
        document.removeEventListener("mouseup", this.mouseClick);
        document.removeEventListener("mousedown", this.mouseDown);
        this.cpsCounterContainer.remove();
        powercord.api.settings.unregisterSettings(this.entityID);
    }
}
