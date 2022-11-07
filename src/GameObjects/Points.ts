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
        fontSize: 8,
        color: Color.white,
        textAlign: "right",
    });
    const lastText = new Text("1234567890", {
        font: "pixeled",
        fontSize: 8,
        color: Color.white,
        textAlign: "right",
    });

    return Importer.object({
        name: "Points",
        children: [
            {
                name: "SCORE",
                transform: {
                    position: [60, 12, 0],
                },
                components: [
                    new UiElement({
                        size: new Vector2(60, 40),
                        smoothing: false,
                    }),
                    new Text("SCORE", {
                        font: "pixeled",
                        fontSize: 8,
                        color: Color.white,
                    }),
                ],
            },
            {
                name: "value",
                transform: {
                    position: [50, 26, 0],
                },
                components: [
                    new UiElement({
                        size: new Vector2(60, 40),
                        smoothing: false,
                    }),
                    vText,
                ],
            },
            {
                name: "lastValue",
                transform: {
                    position: [50, 38, 0],
                },
                components: [
                    new UiElement({
                        size: new Vector2(60, 40),
                        smoothing: false,
                    }),
                    lastText,
                ],
            },
        ],
        components: [
            new UiElement({
                size: new Vector2(100, 100),
                sizeType: SizeType.PERCENTAGE,
                positionType: PositionType.CENTER_CENTER,
            }),
            new PointsComp(vText, lastText),
        ],
    });
}
