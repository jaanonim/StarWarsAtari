import {
    PositionType,
    SizeType,
} from "3d-game-engine-canvas/src/classes/Components/SizedComponent";
import UiElement from "3d-game-engine-canvas/src/components/UiElement";
import Importer from "3d-game-engine-canvas/src/tools/Importer";
import Vector2 from "3d-game-engine-canvas/src/utilities/math/Vector2";
import Renderer from "3d-game-engine-canvas/src/classes/Renderer";
import Camera from "3d-game-engine-canvas/src/components/Camera";
import { LaserComp } from "../Components/LaserComp";
import HideInMenuComp from "../Components/HideInMenuComp";

export default async function Laser(camera: Camera, renderer: Renderer) {
    return Importer.object({
        name: "laser",
        components: [
            new UiElement({
                size: new Vector2(100, 100),
                sizeType: SizeType.PERCENTAGE,
                positionType: PositionType.CENTER_CENTER,
            }),
            new LaserComp(camera, renderer),
            new HideInMenuComp(),
        ],
    });
}
