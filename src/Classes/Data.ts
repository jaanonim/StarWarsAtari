import Color from "3d-game-engine-canvas/src/utilities/math/Color";

export default {
    width: 336,
    height: 224,
    scale: 0.25,
    moveY: 5,
    moveX: 5,
    start: {
        stage: 1,
        wave: 0,
    },
    player: {
        movementSpeed: 0.005, //0.002,
        startShield: 1,
    },
    UI: {
        accentColor: Color.red,
        mainColor: Color.white,
    },
    screenTime: 15000,
    lengthOfTrench: 40,
    groundRange: 30,
    startTextBackgroundRange: 27,
    stage1: {
        time: 60,
    },
};
