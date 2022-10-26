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

export default async function Laser(camera: Camera, renderer: Renderer) {
    return Importer.object({
        name: "laser",
        components: [
            new UiElement(
                new Vector2(100, 100),
                undefined,
                SizeType.PERCENTAGE,
                PositionType.CENTER_CENTER
            ),
            new LaserComp(camera, renderer),
        ],
    });
}
