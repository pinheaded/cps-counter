const { React, getModule } = require("powercord/webpack");
const { ColorPickerInput, SwitchItem, TextInput } = require("powercord/components/settings");

const ColorUtils = getModule(["isValidHex"], false);
const { DEFAULT_CPS_UNIT, PRIDE_MODE_KEYFRAMES } = require("./constants");

module.exports = class CPSCounterSettings extends React.PureComponent {
    render() {
        return(
            <div className="cpsSettings">
                <div className="description-3_Ncsb formText-3fs7AJ marginBottom20-32qID7 modeDefault-3a2Ph1 primary-jw0I4K">
                    CPS stands for Clicks Per Second, or how many times you are clicking in a second. Use these settings to config the counter at the top of the window to your liking!
                </div>
                <div className="cpsSettingsMainSettingsContainer">
                    <ColorPickerInput
                        className = "cpsSettingsColorPickerInput"
                        value = {ColorUtils.hex2int(this.props.getSetting("color", "#ffffff"))}
                        onChange = {(arg) => {
                            this.props.updateSetting("color", ColorUtils.int2hex(arg));
                            document.getElementById("cpsCounterContainer").style.color = ColorUtils.int2hex(arg);
                        }}>
                    Text Colour
                    </ColorPickerInput>
                    <SwitchItem
                        className = "cpsSettingsPrideModeSwitch"
                        style = {{"margin-top": "25px"}}
                        value = {this.props.getSetting("prideMode", false)}
                        onChange = {(arg) => {
                            this.props.updateSetting("prideMode", arg);
                            if (arg === true) {
                                let chromaInstance = document.getElementById("cpsCounterContainer").animate(PRIDE_MODE_KEYFRAMES, {duration: 5000, iterations: Infinity});
                                this.props.updateSetting("_chromaInstance", chromaInstance);
                            }
                            else {
                                let chromaInstance = this.props.getSetting("_chromaInstance")
                                chromaInstance.cancel();
                            }
                        }}>
                        Pride Mode (overrides text colour)
                    </SwitchItem>
                    <SwitchItem
                        className = "cpsSettingsRightClickSwitch"
                        style = {{"margin-top": "25px"}}
                        value = {this.props.getSetting("showRightClick", false)}
                        onChange = {(arg) => {this.props.updateSetting("showRightClick", arg)}}>
                        Show Right Click CPS
                    </SwitchItem>
                    <TextInput
                        className = "cpsSettingsUnitInput"
                        value = {this.props.getSetting("cpsUnit", DEFAULT_CPS_UNIT)}
                        onChange = {(arg) => {this.props.updateSetting("cpsUnit", arg)}}>
                        CPS Unit
                    </TextInput>
                    <style>
                    {`
                        @keyframes load-in {
                            from {
                                opacity: 0;
                                margin-top: -10px;
                            }
                            to {
                                opacity: 1;
                                margin-top: 0;
                            }
                        }

                        .cpsSettingsMainSettingsContainer {
                            background: var(--background-secondary);
                            backdrop-filter: blur(10px);
                            border-radius: 10px;
                            box-shadow: var(--elevation-high);
                            padding: 20px 20px 20px 20px;
                            animation-name: load-in;
                            animation-duration: 0.69s;
                            animation-iteration-count: 1;
                            margin-top: 0;
                        }

                        .cpsSettingsMainSettingsContainer .divider-3573oO.dividerDefault-3rvLe- {
                            display: none
                        }
                    `}
                    </style>
                </div>
            </div>
        )
    }
}
