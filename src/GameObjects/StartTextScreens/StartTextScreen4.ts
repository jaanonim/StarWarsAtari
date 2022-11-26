import {
    PositionType,
    SizeType,
} from "3d-game-engine-canvas/src/classes/Components/SizedComponent";
import Text from "3d-game-engine-canvas/src/components/Text";
import UiElement from "3d-game-engine-canvas/src/components/UiElement";
import Importer from "3d-game-engine-canvas/src/tools/Importer";
import Color from "3d-game-engine-canvas/src/utilities/math/Color";
import Vector2 from "3d-game-engine-canvas/src/utilities/math/Vector2";
import { StartTextScreen4Comp } from "../../Components/StartTextScreen4Comp";

async function StartTextScreen4() {
    return await Importer.object({
        name: "StartTextScreen4",
        children: [
            {
                name: "scoring",
                transform: {
                    position: [-60, 35, 0],
                },
                components: [
                    new UiElement({
                        size: new Vector2(100, 10),
                        positionType: PositionType.TOP_CENTER,
                        smoothing: false,
                    }),
                    new Text("SCORING", {
                        font: "pixeled",
                        fontSize: 6,
                        color: Color.blue,
                        textAlign: PositionType.CENTER_CENTER,
                    }),
                ],
            },

            {
                name: "text",
                transform: {
                    position: [0, 55, 0],
                },
                components: [
                    new UiElement({
                        anchor: new Vector2(0.5, 0),
                        size: new Vector2(200, 200),
                        positionType: PositionType.TOP_CENTER,
                        smoothing: false,
                    }),
                    new Text(
                        "TIE FIGHTERS\nDART VADER SHIP\nLASER BUNKERS\nLASER TOWERS\nTRENCH TURRETS\nFIRE BALLS\n\nEXHAUST PORT\nDESTROYING ALL TOWER TOPS",
                        {
                            font: "pixeled",
                            fontSize: 6,
                            color: Color.blue,
                            textAlign: PositionType.TOP_LEFT,
                        }
                    ),
                ],
            },
            {
                name: "text",
                transform: {
                    position: [0, 55, 0],
                },
                components: [
                    new UiElement({
                        anchor: new Vector2(0.5, 0),
                        size: new Vector2(200, 200),
                        positionType: PositionType.TOP_CENTER,
                        smoothing: false,
                    }),
                    new Text(
                        "1,000\n2,000\n200\n200\n100\n33\n\n25,000\n50,000",
                        {
                            font: "pixeled",
                            fontSize: 6,
                            color: Color.blue,
                            textAlign: PositionType.TOP_RIGHT,
                        }
                    ),
                ],
            },
        ],
        transform: { position: [0, 200, 0] },
        components: [
            new UiElement({
                sizeType: SizeType.PERCENTAGE,
                positionType: PositionType.CENTER_CENTER,
                smoothing: false,
            }),
            new StartTextScreen4Comp(),
        ],
    });
}
export default StartTextScreen4;
