import {
    PositionType,
    SizeType,
} from "3d-game-engine-canvas/src/classes/Components/SizedComponent";
import UiElement from "3d-game-engine-canvas/src/components/UiElement";
import Importer from "3d-game-engine-canvas/src/tools/Importer";
import Vector2 from "3d-game-engine-canvas/src/utilities/math/Vector2";
import Text from "3d-game-engine-canvas/src/components/Text";
import Color from "3d-game-engine-canvas/src/utilities/math/Color";
import { PointsComp } from "../Components/PointsComp";

export default async function Points() {
    const vText = new Text("1234567890", {
        font: "pixeled",
        fontSize: 28,
        color: Color.white,
        textAlign: "right",
    });
    const lastText = new Text("1234567890", {
        font: "pixeled",
        fontSize: 28,
        color: Color.white,
        textAlign: "right",
    });

    return Importer.object({
        name: "Points",
        children: [
            {
                name: "SCORE",
                transform: {
                    position: [250, 40, 0],
                },
                components: [
                    new UiElement(
                        new Vector2(200, 100),
                        0,
                        undefined,
                        PositionType.TOP_LEFT,
                        undefined,
                        undefined,
                        false
                    ),
                    new Text("SCORE", {
                        font: "pixeled",
                        fontSize: 28,
                        color: Color.white,
                    }),
                ],
            },
            {
                name: "value",
                transform: {
                    position: [170, 84, 0],
                },
                components: [
                    new UiElement(
                        new Vector2(300, 100),
                        0,
                        undefined,
                        PositionType.TOP_LEFT,
                        undefined,
                        undefined,
                        false
                    ),
                    vText,
                ],
            },
            {
                name: "lastValue",
                transform: {
                    position: [170, 128, 0],
                },
                components: [
                    new UiElement(
                        new Vector2(300, 100),
                        0,
                        undefined,
                        PositionType.TOP_LEFT,
                        undefined,
                        undefined,
                        false
                    ),
                    lastText,
                ],
            },
        ],
        components: [
            new UiElement(
                new Vector2(100, 100),
                undefined,
                SizeType.PERCENTAGE,
                PositionType.CENTER_CENTER
            ),
            new PointsComp(vText, lastText),
        ],
    });
}
