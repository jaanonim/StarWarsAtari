import {
    PositionType,
    SizeType,
} from "3d-game-engine-canvas/src/classes/Components/SizedComponent";
import UiElement from "3d-game-engine-canvas/src/components/UiElement";
import Importer from "3d-game-engine-canvas/src/tools/Importer";
import Vector2 from "3d-game-engine-canvas/src/utilities/math/Vector2";
import Text from "3d-game-engine-canvas/src/components/Text";
import HintComp from "../Components/HintComp";
import Color from "3d-game-engine-canvas/src/utilities/math/Color";
import HideInMenuComp from "../Components/HideInMenuComp";

export default async function Hint() {
    const text = new Text("This is hint".toUpperCase(), {
        font: "pixeled",
        fontSize: 6,
        color: Color.cyan,
    });

    return Importer.object({
        name: "Hint",
        children: [
            {
                name: "text",
                transform: {
                    position: [0, 46, 0],
                },
                components: [
                    new UiElement({
                        size: new Vector2(200, 40),
                        positionType: PositionType.TOP_CENTER,
                        smoothing: false,
                    }),
                    text,
                ],
            },
        ],
        components: [
            new UiElement({
                size: new Vector2(100, 100),
                sizeType: SizeType.PERCENTAGE,
                positionType: PositionType.CENTER_CENTER,
            }),
            new HintComp(text),
            new HideInMenuComp(),
        ],
    });
}
