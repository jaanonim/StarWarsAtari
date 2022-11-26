import Importer from "3d-game-engine-canvas/src/tools/Importer";
import GroundComp from "../Components/GroundComp";

export default async function Ground() {
    return await Importer.object({
        name: "Ground",
        transform: {
            position: [0, 0, 19.9],
        },
        components: [new GroundComp()],
    });
}
