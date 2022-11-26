import Importer from "3d-game-engine-canvas/src/tools/Importer";
import StartTextBackgroundComp from "../Components/StartTextBackgroundComp";

export default async function StartTextBackground() {
    return await Importer.object({
        name: "StartTextBackground",
        transform: {
            position: [0, 0, 19.9],
        },
        components: [new StartTextBackgroundComp()],
    });
}
