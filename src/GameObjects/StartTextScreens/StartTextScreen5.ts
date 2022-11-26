import {
    PositionType,
    SizeType,
} from "3d-game-engine-canvas/src/classes/Components/SizedComponent";
import Text from "3d-game-engine-canvas/src/components/Text";
import UiElement from "3d-game-engine-canvas/src/components/UiElement";
import Importer from "3d-game-engine-canvas/src/tools/Importer";
import Color from "3d-game-engine-canvas/src/utilities/math/Color";
import Vector2 from "3d-game-engine-canvas/src/utilities/math/Vector2";

async function StartTextScreen5() {
    return await Importer.object({
        name: "StartTextScreen5",
        children: [
            {
                name: "text",
                transform: {
                    position: [0, 35, 0],
                },
                components: [
                    new UiElement({
                        size: new Vector2(200, 10),
                        positionType: PositionType.TOP_CENTER,
                        smoothing: false,
                    }),
                    new Text("PRINCESS LEIA'S REBEL FORCE", {
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
                        size: new Vector2(150, 200),
                        positionType: PositionType.TOP_CENTER,
                        smoothing: false,
                    }),
                    new Text(
                        "1. IAN\n2. KEV\n3. NIK\n4. MIK\n5. R B\n6. TIK\n7. JED\n8. SPI\n9. ZEP\n10. DOM",
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
                        size: new Vector2(150, 200),
                        positionType: PositionType.TOP_CENTER,
                        smoothing: false,
                    }),
                    new Text(
                        "01285353\n01110936\n01024650\n00872551\n00813553\n00704899\n00518000\n00492159\n00384766\n00380655",
                        {
                            font: "pixeled",
                            fontSize: 6,
                            color: Color.blue,
                            textAlign: PositionType.TOP_RIGHT,
                        }
                    ),
                ],
            },
            {
                name: "text",
                transform: {
                    position: [0, -20, 0],
                },
                components: [
                    new UiElement({
                        anchor: new Vector2(0.5, 1),
                        size: new Vector2(150, 30),
                        positionType: PositionType.BOTTOM_CENTER,
                        smoothing: false,
                    }),
                    new Text("STAR WARS\nMADE BY JAANONIM\n2022", {
                        font: "pixeled",
                        fontSize: 6,
                        color: Color.red,
                        textAlign: PositionType.BOTTOM_CENTER,
                    }),
                ],
            },
        ],
        components: [
            new UiElement({
                sizeType: SizeType.PERCENTAGE,
                positionType: PositionType.CENTER_CENTER,
                smoothing: false,
            }),
        ],
    });
}
export default StartTextScreen5;
