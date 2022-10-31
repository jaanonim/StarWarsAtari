import Importer from "3d-game-engine-canvas/src/tools/Importer";
import Stage3Comp from "../../Components/Stages/Stage3Comp";

export default async function Stage3() {
    return Importer.object({
        name: "Stage3",
        children: [],
        components: [new Stage3Comp()],
    });
}
