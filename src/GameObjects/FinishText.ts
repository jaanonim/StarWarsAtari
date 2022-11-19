import {
    PositionType,
    SizeType,
} from "3d-game-engine-canvas/src/classes/Components/SizedComponent";
import UiElement from "3d-game-engine-canvas/src/components/UiElement";
import Importer from "3d-game-engine-canvas/src/tools/Importer";
import Vector2 from "3d-game-engine-canvas/src/utilities/math/Vector2";
import Text from "3d-game-engine-canvas/src/components/Text";
import Color from "3d-game-engine-canvas/src/utilities/math/Color";
import FinishTextComp from "../Components/FinishTextComp";

export default async function FinishText() {
    const text = new Text("", {
        font: "pixeled",
        fontSize: 8,
        color: Color.white,
    });
    const text2 = new Text("", {
        font: "pixeled",
        fontSize: 8,
        color: Color.white,
    });
    const text3 = new Text("", {
        font: "pixeled",
        fontSize: 8,
        color: Color.white,
    });
    const text4 = new Text("", {
        font: "pixeled",
        fontSize: 8,
        color: Color.white,
    });

    return Importer.object({
        name: "FinishText",
        children: [
            {
                name: "text",
                transform: {
                    position: [0, -25, 0],
                },
                components: [
                    new UiElement({
                        size: new Vector2(200, 40),
                        positionType: PositionType.CENTER_CENTER,
                        smoothing: false,
                    }),
                    text,
                ],
            },
            {
                name: "text2",
                transform: {
                    position: [0, -8, 0],
                },
                components: [
                    new UiElement({
                        size: new Vector2(200, 40),
                        positionType: PositionType.CENTER_CENTER,
                        smoothing: false,
                    }),
                    text2,
                ],
            },
            {
                name: "text3",
                transform: {
                    position: [0, 8, 0],
                },
                components: [
                    new UiElement({
                        size: new Vector2(200, 40),
                        positionType: PositionType.CENTER_CENTER,
                        smoothing: false,
                    }),
                    text3,
                ],
            },
            {
                name: "text4",
                transform: {
                    position: [0, 25, 0],
                },
                components: [
                    new UiElement({
                        size: new Vector2(200, 40),
                        positionType: PositionType.CENTER_CENTER,
                        smoothing: false,
                    }),
                    text4,
                ],
            },
        ],
        components: [
            new UiElement({
                size: new Vector2(100, 100),
                sizeType: SizeType.PERCENTAGE,
                positionType: PositionType.CENTER_CENTER,
            }),
            new FinishTextComp([text, text2, text3, text4]),
        ],
    });
}
