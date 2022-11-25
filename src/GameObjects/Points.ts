import {
    PositionType,
    SizeType,
} from "3d-game-engine-canvas/src/classes/Components/SizedComponent";
import UiElement from "3d-game-engine-canvas/src/components/UiElement";
import Importer from "3d-game-engine-canvas/src/tools/Importer";
import Vector2 from "3d-game-engine-canvas/src/utilities/math/Vector2";
import Text from "3d-game-engine-canvas/src/components/Text";
import { PointsComp } from "../Components/PointsComp";
import Data from "../Classes/Data";
import HideInMenuComp from "../Components/HideInMenuComp";

export default async function Points() {
    const vText = new Text("1234567890", {
        font: "pixeled",
        fontSize: 8,
        color: Data.UI.accentColor,
        textAlign: PositionType.CENTER_RIGHT,
    });
    const lastText = new Text("1234567890", {
        font: "pixeled",
        fontSize: 8,
        color: Data.UI.accentColor,
        textAlign: PositionType.CENTER_RIGHT,
    });

    return Importer.object({
        name: "Points",
        children: [
            {
                name: "SCORE",
                transform: {
                    position: [60, 6, 0],
                },
                components: [
                    new UiElement({
                        size: new Vector2(60, 40),
                        smoothing: false,
                    }),
                    new Text("SCORE", {
                        font: "pixeled",
                        fontSize: 8,
                        color: Data.UI.mainColor,
                    }),
                ],
            },
            {
                name: "value",
                transform: {
                    position: [50, 18, 0],
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
                    position: [50, 32, 0],
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
            new HideInMenuComp(),
        ],
    });
}
