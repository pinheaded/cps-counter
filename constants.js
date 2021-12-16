module.exports = Object.freeze({
    DEFAULT_CPS_UNIT: "CPS",
    PRIDE_MODE_KEYFRAMES: [
        { color: "rgb(255,0,0)"},
        { color: "rgb(255,127,0)"},
        { color: "rgb(255,255,0)"},
        { color: "rgb(127,255,0)"},
        { color: "rgb(0,255,0)"},
        { color: "rgb(0,255,127)"},
        { color: "rgb(0, 255, 255)"},
        { color: "rgb(0, 127, 255)"},
        { color: "rgb(0, 0, 255)"},
        { color: "rgb(127, 0, 255)"},
        { color: "rgb(255, 0, 255)"},
        { color: "rgb(255, 0, 127)"},
    ],
    Labels: {
        DESCRIPTION: `CPS stands for Clicks Per Second,
        or how many times you are clicking in a second. 
        Use these settings to config the counter 
        at the top of the window to your liking!`.replace(/(\r\n|\n|\r)/gm, ""),
        COLOR: "Text Colour",
        ALT_COLOR: "Seperate Click Colour",
        PRIDE_MODE_SWITCH: "Pride Mode (overrides text colour)",
        RIGHT_CLICK_SWITCH: "Show Right Click CPS",
        CPS_UNIT: "CPS UNIT",
        CPS_UNIT_PLACEHOLDER: "Enter Something..."
    }
});
