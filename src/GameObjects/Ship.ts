import {
    PositionType,
    SizeType,
} from "3d-game-engine-canvas/src/classes/Components/SizedComponent";
import UiElement from "3d-game-engine-canvas/src/components/UiElement";
import FileLoader from "3d-game-engine-canvas/src/tools/FileLoader";
import Importer from "3d-game-engine-canvas/src/tools/Importer";
import TextureLoader from "3d-game-engine-canvas/src/tools/TextureLoader";
import Vector2 from "3d-game-engine-canvas/src/utilities/math/Vector2";
import Image from "3d-game-engine-canvas/src/components/Image";
import { ShipComp } from "../Components/ShipComp";
import Data from "../Classes/Data";
import HideOnCursorHiddenComp from "../Components/HideOnCursorHiddenComp";

export default async function Ship() {
    const tex = new TextureLoader(
        await FileLoader.loadImg("img/arm.png")
    ).parse();
    const tex3 = new TextureLoader(
        await FileLoader.loadImg("img/ship.png")
    ).parse();

    return Importer.object({
        name: "ship",
        children: [
            {
                name: "arm",
                transform: {
                    position: [25, -40, 0],
                },
                components: [
                    new UiElement({
                        size: new Vector2(25, 18),
                        rotation: 0,
                        positionType: PositionType.CENTER_LEFT,
                        anchor: new Vector2(0, 0),
                        flip: [true, true],
                    }),
                    new Image(tex),
                ],
            },

            {
                name: "arm",
                transform: {
                    position: [25, 60, 0],
                },
                components: [
                    new UiElement({
                        size: new Vector2(25, 18),
                        rotation: 0,
                        positionType: PositionType.CENTER_LEFT,
                        anchor: new Vector2(0, 0),
                        flip: [true, false],
                    }),
                    new Image(tex),
                ],
            },

            {
                name: "arm",
                transform: {
                    position: [-25, -40, 0],
                },
                components: [
                    new UiElement({
                        size: new Vector2(25, 18),
                        rotation: 0,
                        positionType: PositionType.CENTER_RIGHT,
                        anchor: new Vector2(0, 0),
                        flip: [false, true],
                    }),
                    new Image(tex),
                ],
            },

            {
                name: "arm",
                transform: {
                    position: [-25, 60, 0],
                },
                components: [
                    new UiElement({
                        size: new Vector2(25, 18),
                        rotation: 0,
                        positionType: PositionType.CENTER_RIGHT,
                        anchor: new Vector2(0, 0),
                        flip: [false, false],
                    }),
                    new Image(tex),
                ],
            },
            {
                name: "ship",
                transform: {
                    position: [0, -16, 0],
                },
                components: [
                    new UiElement({
                        size: new Vector2(58, 16),
                        positionType: PositionType.BOTTOM_CENTER,
                        anchor: new Vector2(0.5, 0),
                    }),
                    new Image(tex3),
                ],
            },
        ],
        components: [
            new UiElement({
                size: new Vector2(Data.width + 10, Data.height + 10),
                sizeType: SizeType.PIXEL,
                positionType: PositionType.CENTER_CENTER,
            }),
            new ShipComp(),
            new HideOnCursorHiddenComp(),
        ],
    });
}
