import {
    PositionType,
    SizeType,
} from "3d-game-engine-canvas/src/classes/Components/SizedComponent";
import UiElement from "3d-game-engine-canvas/src/components/UiElement";
import Importer from "3d-game-engine-canvas/src/tools/Importer";
import Vector2 from "3d-game-engine-canvas/src/utilities/math/Vector2";
import Text from "3d-game-engine-canvas/src/components/Text";
import Data from "../Classes/Data";
import WaveInfoComp from "../Components/WaveInfoComp";
import HideInMenuComp from "../Components/HideInMenuComp";

export default async function WaveInfo() {
    const wave = new Text("5  WAVE", {
        font: "pixeled",
        fontSize: 8,
        color: Data.UI.mainColor,
    });
    const info1 = new Text("TOWERS", {
        font: "pixeled",
        fontSize: 8,
        color: Data.UI.accentColor,
    });
    const info2 = new Text("16", {
        font: "pixeled",
        fontSize: 8,
        color: Data.UI.accentColor,
    });

    return Importer.object({
        name: "WaveInfo",
        children: [
            {
                name: "Wave",
                transform: {
                    position: [-50, 6, 0],
                },
                components: [
                    new UiElement({
                        size: new Vector2(60, 40),
                        positionType: PositionType.TOP_RIGHT,
                        smoothing: false,
                    }),
                    wave,
                ],
            },
            {
                name: "Info1",
                transform: {
                    position: [-50, 18, 0],
                },
                components: [
                    new UiElement({
                        size: new Vector2(60, 40),
                        positionType: PositionType.TOP_RIGHT,
                        smoothing: false,
                    }),
                    info1,
                ],
            },
            {
                name: "Info2",
                transform: {
                    position: [-50, 32, 0],
                },
                components: [
                    new UiElement({
                        size: new Vector2(60, 40),
                        positionType: PositionType.TOP_RIGHT,
                        smoothing: false,
                    }),
                    info2,
                ],
            },
        ],
        components: [
            new UiElement({
                size: new Vector2(100, 100),
                sizeType: SizeType.PERCENTAGE,
                positionType: PositionType.CENTER_CENTER,
            }),
            new WaveInfoComp(wave, info1, info2),
            new HideInMenuComp(),
        ],
    });
}
