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
import Texture from "3d-game-engine-canvas/src/utilities/Texture";
import { ShieldComp } from "../Components/ShieldComp";
import Color from "3d-game-engine-canvas/src/utilities/math/Color";
import Text from "3d-game-engine-canvas/src/components/Text";
import ShieldText from "../Components/ShieldText";
import Data from "../Classes/Data";

function ShieldElement(i: number, name: string, t: Texture) {
    return Importer.object({
        name: name + i,
        transform: {
            position: [-8 * i, (i + 1) * 2, 0],
        },
        components: [
            new UiElement({
                size: new Vector2(8, 4 * (i + 1)),
                positionType: PositionType.TOP_RIGHT,
                smoothing: false,
            }),
            new Image(t, Color.red),
        ],
    });
}

export default async function Shield() {
    const tex = (
        await Promise.all(
            Array(6)
                .fill(0)
                .map((_, i) => FileLoader.loadImg(`img/shield/${i + 1}.png`))
        )
    ).map((e) => new TextureLoader(e).parse());
    const leftObjs = tex.map((t, i) => ShieldElement(i, "left", t));
    const rightObjs = tex.map((t, i) => ShieldElement(i, "right", t));
    const valueText = new Text("8", {
        font: "pixeled",
        fontSize: 10,
        color: Data.UI.mainColor,
    });
    const shieldText = new ShieldText();

    return Importer.object({
        name: "Shield",
        children: [
            {
                name: "left",
                children: leftObjs,
                components: [
                    new UiElement({
                        size: new Vector2(50, 26),
                        positionType: PositionType.TOP_CENTER,
                        smoothing: false,
                        anchor: new Vector2(1, 0),
                    }),
                ],
            },
            {
                name: "right",
                children: rightObjs,
                components: [
                    new UiElement({
                        size: new Vector2(50, 26),
                        positionType: PositionType.TOP_CENTER,
                        smoothing: false,
                        flip: [true, false],
                        anchor: new Vector2(1, 0),
                    }),
                ],
            },
            {
                name: "Value",
                transform: {
                    position: [0, 20, 0],
                },
                components: [
                    new UiElement({
                        size: new Vector2(50, 40),
                        positionType: PositionType.TOP_CENTER,
                        smoothing: false,
                    }),
                    valueText,
                ],
            },
            {
                name: "ShieldText",
                transform: {
                    position: [0, 34, 0],
                },
                components: [
                    new UiElement({
                        size: new Vector2(500, 100),
                        positionType: PositionType.TOP_CENTER,
                        smoothing: false,
                    }),
                    shieldText,
                ],
            },
        ],
        components: [
            new UiElement({
                size: new Vector2(100, 100),
                sizeType: SizeType.PERCENTAGE,
                positionType: PositionType.CENTER_CENTER,
            }),
            new ShieldComp(leftObjs, rightObjs, valueText, shieldText),
        ],
    });
}
