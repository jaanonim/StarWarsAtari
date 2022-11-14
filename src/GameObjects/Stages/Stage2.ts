import Importer from "3d-game-engine-canvas/src/tools/Importer";
import Vector3 from "3d-game-engine-canvas/src/utilities/math/Vector3";
import Data from "../../Classes/Data";
import Stage2Comp from "../../Components/Stages/Stage2Comp";
import Bunker from "../Bunker";

export default async function Stage2() {
    const pos: Array<Vector3> = [];

    for (let i = 0; i < Data.stage2.numberOfBunkers; i++) {
        let v: Vector3;
        do
            v = new Vector3(
                Math.random() * Data.stage2.width - Data.stage2.width / 2,
                -2,
                Math.random() * Data.stage2.length + Data.stage2.margin
            ).roundXYToInt();
        while (pos.some((e) => v.subtract(e).squareLength() < 25));
        pos.push(v);
    }

    let v = pos.map((pos) => {
        return Bunker(pos);
    });

    return Importer.object({
        name: "Stage2",
        children: await Promise.all(v),
        components: [new Stage2Comp()],
    });
}
