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

async function StartTextScreen2() {
    return Importer.object({
        name: "StartTextScreen2",
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
                        "OBI-WAN KENOBI IS GONE BUT HIS\nPRESENCE IS FELT WITHIN THE FORCE\nTHE EMPIRES DEATH STAR UNDER THE\nCOMMAND OF DARTH VADER NEARS THE\nREBEL PLANET. YOU MUST JOIN THE\nREBELLION TO STOP THE EMPIRE.\n\nTHE FORCE WILL BE WITH YOU.\nALWAYS",
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
export default StartTextScreen2;
