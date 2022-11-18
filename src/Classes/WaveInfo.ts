import Stage1 from "../GameObjects/Stages/Stage1";
import Stage2 from "../GameObjects/Stages/Stage2";
import Stage3 from "../GameObjects/Stages/Stage3";
import Stage4 from "../GameObjects/Stages/Stage4";
import Stage5 from "../GameObjects/Stages/Stage5";
import Box from "3d-game-engine-canvas/src/utilities/math/Box";
import Vector3 from "3d-game-engine-canvas/src/utilities/math/Vector3";
import { PlayerControllerMode } from "../Components/PlayerController";

export default class {
    static readonly stages = [
        {
            func: Stage1,
            controls: PlayerControllerMode.ROTATION,
            maxPos: new Box(Vector3.zero, Vector3.zero),
        },
        {
            func: Stage2,
            controls: PlayerControllerMode.POSITION,
            maxPos: new Box(new Vector3(-20, -1, 0), new Vector3(20, 0.5, 100)),
        },
        {
            func: Stage3,
            controls: PlayerControllerMode.POSITION,
            maxPos: new Box(new Vector3(-20, -3, 0), new Vector3(20, 0.5, 100)),
        },
        {
            func: Stage4,
            controls: PlayerControllerMode.POSITION,
            maxPos: new Box(
                new Vector3(-1.1, 0, -100),
                new Vector3(1.1, 3.5, 160)
            ),
        },
        {
            func: Stage5,
            controls: PlayerControllerMode.POSITION,
            maxPos: new Box(
                new Vector3(-1.1, 0, -100),
                new Vector3(1.1, 4, 160)
            ),
        },
    ];

    static readonly waves = [
        {
            stages: [0, 3],
        },
        {
            stages: [0, 1, 4],
        },
        {
            stages: [0, 2, 4],
        },
        {
            stages: [0, 2, 4],
        },
    ];
}
