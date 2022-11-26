import UiElement from "3d-game-engine-canvas/src/components/UiElement";
import Importer from "3d-game-engine-canvas/src/tools/Importer";
import {
    PositionType,
    SizeType,
} from "3d-game-engine-canvas/src/classes/Components/SizedComponent";
import StartTextScreenComp from "../Components/StartTextScreenComp";
import Vector2 from "3d-game-engine-canvas/src/utilities/math/Vector2";
import Text from "3d-game-engine-canvas/src/components/Text";
import Color from "3d-game-engine-canvas/src/utilities/math/Color";

export default async function StartTextScreen() {
    return await Importer.object({
        name: "StartTextScreen",
        children: [
            {
                name: "pullTrigger",
                components: [
                    new UiElement({
                        size: new Vector2(200, 30),
                        anchor: new Vector2(0.5, 0),
                        positionType: PositionType.TOP_CENTER,
                        smoothing: false,
                    }),
                    new Text("PULL TRIGGER TO START", {
                        font: "pixeled",
                        fontSize: 6,
                        color: Color.blue,
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
            new StartTextScreenComp(),
        ],
    });
}
