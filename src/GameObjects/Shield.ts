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

function ShieldElement(i: number, name: string, t: Texture) {
    return Importer.object({
        name: name + i,
        transform: {
            position: [-35 * i, (i + 1) * 8, 0],
        },
        components: [
            new UiElement(
                new Vector2(35, 16 * (i + 1)),
                0,
                undefined,
                PositionType.TOP_RIGHT,
                undefined,
                undefined,
                false
            ),
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
        fontSize: 40,
        color: Color.white,
    });

    const v = 100;
    return Importer.object({
        name: "Shield",
        children: [
            {
                name: "left",
                transform: {
                    position: [-v, 140, 0],
                },
                children: leftObjs,
                components: [
                    new UiElement(
                        new Vector2(200, 100),
                        0,
                        undefined,
                        PositionType.TOP_CENTER,
                        undefined,
                        undefined,
                        false
                    ),
                ],
            },
            {
                name: "right",
                transform: {
                    position: [v, 140, 0],
                },
                children: rightObjs,
                components: [
                    new UiElement(
                        new Vector2(200, 100),
                        0,
                        undefined,
                        PositionType.TOP_CENTER,
                        undefined,
                        [true, false],
                        false
                    ),
                ],
            },
            {
                name: "Value",
                transform: {
                    position: [0, 170, 0],
                },
                components: [
                    new UiElement(
                        new Vector2(100, 100),
                        0,
                        undefined,
                        PositionType.TOP_CENTER,
                        undefined,
                        undefined,
                        false
                    ),
                    valueText,
                ],
            },
        ],
        components: [
            new UiElement(
                new Vector2(120, 120),
                undefined,
                SizeType.PERCENTAGE,
                PositionType.CENTER_CENTER
            ),
            new ShieldComp(leftObjs, rightObjs, valueText),
        ],
    });
}