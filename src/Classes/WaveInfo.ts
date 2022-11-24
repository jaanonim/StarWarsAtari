import Stage1 from "../GameObjects/Stages/Playable/Stage1";
import Stage2 from "../GameObjects/Stages/Playable/Stage2";
import Stage3 from "../GameObjects/Stages/Playable/Stage3";
import Stage4 from "../GameObjects/Stages/Playable/Stage4";
import Stage5 from "../GameObjects/Stages/Playable/Stage5";
import DifficultySelect from "../GameObjects/Stages/DifficultySelect";
import Box from "3d-game-engine-canvas/src/utilities/math/Box";
import Vector3 from "3d-game-engine-canvas/src/utilities/math/Vector3";
import { PlayerControllerMode } from "../Components/PlayerController";
import Finish from "../GameObjects/Stages/Finish";
import { default as WAVES } from "../Data/waves.json";

export default class {
    static readonly stages = [
        {
            func: Stage1,
            controls: PlayerControllerMode.ROTATION,
            maxPos: new Box(Vector3.zero, Vector3.zero),
            data: {
                tieCount: 6,
                fireCooldown: 3000,
            },
        },
        {
            func: Stage2,
            controls: PlayerControllerMode.POSITION,
            maxPos: new Box(
                new Vector3(-20, -1, -100),
                new Vector3(20, 0.5, 1000)
            ),
            data: {
                width: 20,
                length: 60,
                margin: 10,
                numberOfBunkers: 24,
                fireCooldown: 1500,
                maxDistance: 255,
                minDistance: 25,
                chanceOfShooting: 0.5,
            },
        },
        {
            func: Stage3,
            controls: PlayerControllerMode.POSITION,
            maxPos: new Box(
                new Vector3(-20, -3, -100),
                new Vector3(20, 0.5, 1000)
            ),
            data: {
                width: 20,
                length: 60,
                margin: 15,
                numberOfTowers: 16,
                fireCooldown: 1500,
                maxDistance: 255,
                minDistance: 25,
                chanceOfShooting: 0.5,
            },
        },
        {
            func: Stage4,
            controls: PlayerControllerMode.POSITION,
            maxPos: new Box(
                new Vector3(-1.1, 0, -100),
                new Vector3(1.1, 3.5, 1000)
            ),
            data: {
                bunkerPattern: [
                    [[0], [0]],
                    [[1], [1]],
                    [[2], [2]],
                    [[3], [3]],
                    [
                        [2, 3],
                        [2, 3],
                    ],
                    [
                        [1, 2],
                        [1, 2],
                    ],
                    [
                        [0, 1],
                        [0, 1],
                    ],
                    [[0, 1], []],
                    [[], [0, 1]],
                    [[], []],
                    [[], []],
                    [[], []],
                    [[], []],
                ],
            },
        },
        {
            func: Stage5,
            controls: PlayerControllerMode.POSITION,
            maxPos: new Box(
                new Vector3(-1.1, 0, -100),
                new Vector3(1.1, 4, 1000)
            ),
            data: {
                obstaclePattern: [
                    [[0], [0]],
                    [[1], [1]],
                    [[2], [2]],
                    [[3], [3]],
                ],
            },
        },
        {
            func: Finish,
            controls: PlayerControllerMode.POSITION,
            maxPos: new Box(new Vector3(0, 0, 0), new Vector3(0, 0, 0)),
            data: {},
        },
    ];

    static readonly menu = [
        {
            func: DifficultySelect,
            controls: PlayerControllerMode.POSITION,
            maxPos: new Box(new Vector3(0, 0, 0), new Vector3(0, 0, 0)),
            data: {},
        },
    ];

    // 8
    static readonly waves = WAVES;
}
