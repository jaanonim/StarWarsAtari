import Importer from "3d-game-engine-canvas/src/tools/Importer";
import StartTextComp from "../../Components/Stages/StartTextComp";
import StartTextBackground from "../StartTextBackground";

export default async function StartText() {
    return await Importer.object({
        name: "StartText",
        children: [await StartTextBackground()],
        components: [new StartTextComp()],
    });
}
