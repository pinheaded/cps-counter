const { Plugin } = require("powercord/entities");

const settings = require("./Settings");
const { DEFAULT_CPS_UNIT, PRIDE_MODE_KEYFRAMES } = require("./constants");

module.exports = class CPSCounter extends Plugin {
    leftClicks = [];
    rightClicks = [];
    entityID = "cps-counter";

    startPlugin() {
        powercord.api.settings.registerSettings(
            this.entityID,
            {
                category: this.entityID,
                label: "CPS Counter",
                render: settings,
            }
        );

        const parent = document.querySelector(".flexCenter-3_1bcw.flex-1O1GKY.justifyCenter-3D2jYp.alignCenter-1dQNNs:last-child");
        const little_baby = document.createElement("div");

        little_baby.className = "cpsCounterContainer";
        little_baby.id = "cpsCounterContainer";
        little_baby.style.maxWidth = "unset";
        little_baby.style.height = "18px";
        little_baby.style.position = "relative";
        little_baby.style.margin = "auto";
        little_baby.style.background = "transparent";
        little_baby.style.textAlign = "center";
        little_baby.style.color = this.settings.get("color", "white");
        little_baby.innerHTML = this.settings.get("showRightClick") ? `0 | 0 ${this.settings.get("cpsUnit", DEFAULT_CPS_UNIT)}` : `0 ${this.settings.get("cpsUnit", DEFAULT_CPS_UNIT)}`;

        parent.parentNode.insertBefore(little_baby, parent.nextSibling);

        if (this.settings.get("prideMode", false) === true) {
            let chromaInstance = document.getElementById("cpsCounterContainer").animate(PRIDE_MODE_KEYFRAMES, {duration: 5000, iterations: Infinity});
            this.settings.set("_chromaInstance", chromaInstance);
        }

        this.mouseClick = this.registerMouseClick.bind(this);

        document.addEventListener("mouseup", this.mouseClick);

        this.idkWhatToNameThis = setInterval(() => {
            if (this.leftClicks.length > 0 && new Date().getTime() - this.leftClicks[0] >= 1000) {
                this.leftClicks.shift();
                try {little_baby.innerHTML = this.settings.get("showRightClick") ? `${this.leftClicks.length} | ${this.rightClicks.length} ${this.settings.get("cpsUnit", DEFAULT_CPS_UNIT)}` : `${this.leftClicks.length} ${this.settings.get("cpsUnit", DEFAULT_CPS_UNIT)}`;}
                catch {}
            }

            if (this.rightClicks.length > 0 && new Date().getTime() - this.rightClicks[0] >= 1000) {
                this.rightClicks.shift();
                try {little_baby.innerHTML = this.settings.get("showRightClick") ? `${this.leftClicks.length} | ${this.rightClicks.length} ${this.settings.get("cpsUnit", DEFAULT_CPS_UNIT)}` : `${this.leftClicks.length} ${this.settings.get("cpsUnit", DEFAULT_CPS_UNIT)}`;}
                catch {}
            }}, 1
        )
    }

    registerMouseClick(e) {
        if (typeof e === "object") {
            switch (e.button) {
                case 0: this.leftClicks.push(new Date().getTime());
                    break;
                
                case 2: this.rightClicks.push(new Date().getTime());
            }
        }
        try {document.getElementById("cpsCounterContainer").innerHTML = this.settings.get("showRightClick") ? `${this.leftClicks.length} | ${this.rightClicks.length} ${this.settings.get("cpsUnit", DEFAULT_CPS_UNIT)}` : `${this.leftClicks.length} ${this.settings.get("cpsUnit", DEFAULT_CPS_UNIT)}`;}
        catch {}
    }

    pluginWillUnload() {
        clearInterval(this.idkWhatToNameThis);
        document.removeEventListener("mouseup", this.mouseClick);
        document.getElementById("cpsCounterContainer").remove();
        powercord.api.settings.unregisterSettings(this.entityID);
        this.leftClicks = [];
        this.rightClicks = [];
    }
}
