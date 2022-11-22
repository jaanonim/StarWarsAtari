import Importer from "3d-game-engine-canvas/src/tools/Importer";
import DifficultySelectComp from "../../Components/Stages/DifficultySelectComp";

export default async function DifficultySelect() {
    return Importer.object({
        name: "DifficultySelect",
        children: [],
        components: [new DifficultySelectComp()],
    });
}
