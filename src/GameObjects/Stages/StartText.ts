import Importer from "3d-game-engine-canvas/src/tools/Importer";
import StartTextComp from "../../Components/Stages/StartTextComp";

export default async function StartText() {
    return Importer.object({
        name: "StartText",
        children: [],
        components: [new StartTextComp()],
    });
}
