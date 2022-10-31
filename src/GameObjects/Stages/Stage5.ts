import Importer from "3d-game-engine-canvas/src/tools/Importer";
import Stage5Comp from "../../Components/Stages/Stage5Comp";

export default async function Stage3() {
    return Importer.object({
        name: "Stage5",
        children: [],
        components: [new Stage5Comp()],
    });
}
