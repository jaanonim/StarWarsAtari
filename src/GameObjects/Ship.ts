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

export default async function Ship() {
    const tex = new TextureLoader(
        await FileLoader.loadImg("img/arm.png")
    ).parse();
    const tex2 = new TextureLoader(
        await FileLoader.loadImg("img/arm2.png")
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
                    position: [170, -150, 0],
                },
                components: [
                    new UiElement({
                        size: new Vector2(150, 150),
                        rotation: Math.PI,
                        positionType: PositionType.CENTER_LEFT,
                    }),
                    new Image(tex2),
                ],
            },
            {
                name: "arm",
                transform: {
                    position: [170, 200, 0],
                },
                components: [
                    new UiElement({
                        size: new Vector2(150, 150),
                        rotation: Math.PI,
                        positionType: PositionType.CENTER_LEFT,
                    }),
                    new Image(tex),
                ],
            },
            {
                name: "arm",
                transform: {
                    position: [-170, -150, 0],
                },
                components: [
                    new UiElement({
                        size: new Vector2(150, 150),
                        positionType: PositionType.CENTER_RIGHT,
                    }),
                    new Image(tex),
                ],
            },
            {
                name: "arm",
                transform: {
                    position: [-170, 200, 0],
                },
                components: [
                    new UiElement({
                        size: new Vector2(150, 150),
                        positionType: PositionType.CENTER_RIGHT,
                    }),
                    new Image(tex2),
                ],
            },
            {
                name: "ship",
                transform: {
                    position: [0, -140, 0],
                },
                components: [
                    new UiElement({
                        size: new Vector2(250, 170),
                        positionType: PositionType.BOTTOM_CENTER,
                    }),
                    new Image(tex3),
                ],
            },
        ],
        components: [
            new UiElement({
                size: new Vector2(120, 120),
                sizeType: SizeType.PERCENTAGE,
                positionType: PositionType.CENTER_CENTER,
            }),
            new ShipComp(),
        ],
    });
}
