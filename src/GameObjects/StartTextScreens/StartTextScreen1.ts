import {
    PositionType,
    SizeType,
} from "3d-game-engine-canvas/src/classes/Components/SizedComponent";
import Text from "3d-game-engine-canvas/src/components/Text";
import UiElement from "3d-game-engine-canvas/src/components/UiElement";
import Importer from "3d-game-engine-canvas/src/tools/Importer";
import Color from "3d-game-engine-canvas/src/utilities/math/Color";
import Vector2 from "3d-game-engine-canvas/src/utilities/math/Vector2";
import TitleImg from "./TitleImg";

async function StartTextScreen1() {
    return Importer.object({
        name: "StartTextScreen1",
        children: [
            await TitleImg(),
            {
                name: "line",
                transform: {
                    position: [0, 80, 0],
                },
                components: [
                    new UiElement({
                        size: new Vector2(250, 100),
                        anchor: new Vector2(0.5, 0),
                        positionType: PositionType.TOP_CENTER,
                        smoothing: false,
                    }),
                    new Text(
                        "REMAKE OF STAR WARS GAME ATARI VERSION\nMADE BY JAANONIM\nAS SCHOOL PROJECT\n\n ORIGINAL GAME MADE BY: \n ZEPPELIN GAMES LTD. \n PROGRAMMED BY IAN COPELAND\n PUBLISHED BY DOMARK",
                        {
                            font: "pixeled",
                            fontSize: 6,
                            color: Color.blue,
                        }
                    ),
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
export default StartTextScreen1;
