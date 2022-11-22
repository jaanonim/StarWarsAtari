import Color from "3d-game-engine-canvas/src/utilities/math/Color";

export default {
    width: 336,
    height: 224,
    scale: 0.25,
    moveY: 5,
    moveX: 5,
    start: {
        stage: 1,
        wave: 2,
    },
    player: {
        movementSpeed: 0.005, //0.002,
        startShield: 8,
    },
    UI: {
        accentColor: Color.red,
        mainColor: Color.white,
    },
    lengthOfTrench: 40,
    groundRange: 30,
    stage1: {
        time: 60,
    },
};
