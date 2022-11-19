import Importer from "3d-game-engine-canvas/src/tools/Importer";
import { StarsComp } from "../Components/StarsComp";

export default async function Stars(revers = false) {
    return Importer.object({
        name: "Stars",
        transform: {
            position: [0, 0, 19.9],
        },
        components: [new StarsComp(revers)],
    });
}
