import {
    PositionType,
    SizeType,
} from "3d-game-engine-canvas/src/classes/Components/SizedComponent";
import UiElement from "3d-game-engine-canvas/src/components/UiElement";
import Importer from "3d-game-engine-canvas/src/tools/Importer";
import { ExplosionComp } from "../Components/ExplosionComp";

export default async function Explosion() {
    return await Importer.object({
        name: "Explosion",
        transform: { position: [0, 0, 19.8] },
        components: [
            new UiElement({
                sizeType: SizeType.PERCENTAGE,
                positionType: PositionType.CENTER_CENTER,
                smoothing: false,
            }),
            new ExplosionComp(),
        ],
    });
}
