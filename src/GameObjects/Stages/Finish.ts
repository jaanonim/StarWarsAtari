import Importer from "3d-game-engine-canvas/src/tools/Importer";
import FinishComp from "../../Components/Stages/FinishComp";

export default async function Finish() {
    return await Importer.object({
        name: "Finish",
        children: [],
        components: [new FinishComp()],
    });
}
