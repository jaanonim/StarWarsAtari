import {
    PositionType,
    SizeType,
} from "3d-game-engine-canvas/src/classes/Components/SizedComponent";
import Text from "3d-game-engine-canvas/src/components/Text";
import UiElement from "3d-game-engine-canvas/src/components/UiElement";
import Importer from "3d-game-engine-canvas/src/tools/Importer";
import Data from "../Classes/Data";
import { DeathScreenComp } from "../Components/DeathScreenComp";

export default async function DeathScreen() {
    const c = new Text("GAME - OVER", {
        font: "pixeled",
        fontSize: 30,
        color: Data.UI.accentColor,
    });

    return Importer.object({
        name: "DeathScreen",
        components: [
            new UiElement({
                sizeType: SizeType.PERCENTAGE,
                positionType: PositionType.CENTER_CENTER,
                smoothing: false,
            }),
            c,
            new DeathScreenComp(c),
        ],
    });
}
