import {
    PositionType,
    SizeType,
} from "3d-game-engine-canvas/src/classes/Components/SizedComponent";
import Text from "3d-game-engine-canvas/src/components/Text";
import UiElement from "3d-game-engine-canvas/src/components/UiElement";
import Importer from "3d-game-engine-canvas/src/tools/Importer";
import Color from "3d-game-engine-canvas/src/utilities/math/Color";
import Vector2 from "3d-game-engine-canvas/src/utilities/math/Vector2";
import { StartTextScreen3Comp } from "../../Components/StartTextScreen3Comp";

async function StartTextScreen3() {
    const text = new Text("FLIGHT INSTRUCTIONS TO RED FIVE\n\n", {
        font: "pixeled",
        fontSize: 6,
        color: Color.red,
        textAlign: PositionType.TOP_CENTER,
    });

    return Importer.object({
        name: "StartTextScreen3",
        children: [
            {
                name: "line",
                transform: {
                    position: [0, 20, 0],
                },
                components: [
                    new UiElement({
                        size: new Vector2(250, 220),
                        anchor: new Vector2(0.5, 0),
                        positionType: PositionType.TOP_CENTER,
                        smoothing: false,
                    }),
                    text,
                ],
            },
        ],
        components: [
            new UiElement({
                sizeType: SizeType.PERCENTAGE,
                positionType: PositionType.CENTER_CENTER,
                smoothing: false,
            }),
            new StartTextScreen3Comp(text),
        ],
    });
}
export default StartTextScreen3;
