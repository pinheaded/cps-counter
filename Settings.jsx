const { React, getModule } = require("powercord/webpack");
const { ColorPickerInput, SwitchItem, TextInput } = require("powercord/components/settings");

const ColorUtils = getModule(["isValidHex"], false);
const marginTopPixels = 15;
const { DEFAULT_CPS_UNIT, PRIDE_MODE_KEYFRAMES, Labels } = require("./constants");

module.exports = class CPSCounterSettings extends React.PureComponent {
    render() {
        return(
            <div className="cpsSettings">
                <div className="description-3_Ncsb formText-3fs7AJ marginBottom20-32qID7 modeDefault-3a2Ph1 primary-jw0I4K">
                    {Labels.DESCRIPTION}
                </div>
                <div className="cpsSettingsMainSettingsContainer">
                    <ColorPickerInput
                        className = "cpsSettingsColorPickerInput"
                        value = {ColorUtils.hex2int(this.props.getSetting("color", "#ffffff"))}
                        onChange = {(arg) => {
                            this.props.updateSetting("color", ColorUtils.int2hex(arg));
                            document.getElementById("cpsCounterContainer").style.color = ColorUtils.int2hex(arg);
                        }}>
                        {Labels.COLOR}
                    </ColorPickerInput>

                    <SwitchItem
                        className = "cpsSettingsSeperateClickColorSwitch"
                        id = "cpsSettingsSeperateClickColorSwitch"
                        style = {{"margin-top": `${marginTopPixels}px`}}
                        value = {this.props.getSetting("seperateClickColor", false)}
                        onChange = {(arg) => {
                            this.props.updateSetting("seperateClickColor", arg)
                            if (arg === false) {
                                this.props.updateSetting("clickColor", undefined);
                            }
                        }}>
                        {Labels.ALT_COLOR}
                    </SwitchItem>

                    {this.props.getSetting("seperateClickColor", false) === true &&
                        <div className = "cpsSettingsClickColorPickerInputContainer">
                            <ColorPickerInput
                                className = "cpsSettingsClickColorPickerInput"
                                value = {ColorUtils.hex2int(this.props.getSetting("clickColor", this.props.getSetting("color", "#ffffff")))}
                                onChange = {(arg) => {
                                    this.props.updateSetting("clickColor", ColorUtils.int2hex(arg));
                                }}>
                                {Labels.ALT_COLOR}
                            </ColorPickerInput>
                        </div>
                    }

                    <div className = "divider-3573oO dividerDefault-3rvLe-"/>

                    <SwitchItem
                        className = "cpsSettingsPrideModeSwitch"
                        style = {{"margin-top": `${marginTopPixels}px`}}
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
                        {Labels.PRIDE_MODE_SWITCH}
                    </SwitchItem>

                    <SwitchItem
                        className = "cpsSettingsRightClickSwitch"
                        style = {{"margin-top": `${marginTopPixels}px`}}
                        value = {this.props.getSetting("showRightClick", false)}
                        onChange = {(arg) => {this.props.updateSetting("showRightClick", arg)}}>
                        {Labels.RIGHT_CLICK_SWITCH}
                    </SwitchItem>

                    <TextInput
                        className = "cpsSettingsUnitInput"
                        placeholder = {Labels.CPS_UNIT_PLACEHOLDER}
                        value = {this.props.getSetting("cpsUnit", DEFAULT_CPS_UNIT)}
                        onChange = {(arg) => {this.props.updateSetting("cpsUnit", arg)}}>
                        {Labels.CPS_UNIT}
                    </TextInput>

                    <style>
                    {`
                        @keyframes loadIn {
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
                        }

                        .cpsSettingsMainSettingsContainer,
                        .cpsSettingsClickColorPickerInputContainer {
                            animation-name: loadIn;
                            animation-duration: 0.69s;
                            animation-iteration-count: 1;
                            margin-top: 0;
                        }

                        .cpsSettingsSeperateClickColorSwitch + div .divider-3573oO.dividerDefault-3rvLe-,
                        .cpsSettingsSeperateClickColorSwitch > div[class*="divider-"],
                        .cpsSettingsUnitInput + div[class*="divider-"] {
                            display: none;
                        }
                    `}
                    </style>
                </div>
            </div>
        )
    }
}
