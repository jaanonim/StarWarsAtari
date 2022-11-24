import Importer from "3d-game-engine-canvas/src/tools/Importer";
import VaderFighter from "../../VaderFighter";
import Stage1Comp from "../../../Components/Stages/Playable/Stage1Comp";

export default async function Stage1() {
    return Importer.object({
        name: "Stage1",
        children: [await VaderFighter()],
        components: [new Stage1Comp()],
    });
}
