import Importer from "3d-game-engine-canvas/src/tools/Importer";
import Vector3 from "3d-game-engine-canvas/src/utilities/math/Vector3";
import Stage3Comp from "../../Components/Stages/Stage3Comp";
import Tower from "../Tower";

export default async function Stage3() {
    const pos: Array<Vector3> = [];

    for (let i = 0; i < 16; i++) {
        let v: Vector3;
        do
            v = new Vector3(
                Math.random() * 10 - 5,
                -2,
                Math.random() * 25 + 5
            ).roundXYToInt();
        while (pos.some((e) => v.subtract(e).squareLength() < 8));
        pos.push(v);
    }

    let v = pos.map((pos) => {
        return Tower(pos);
    });

    return Importer.object({
        name: "Stage3",
        children: await Promise.all(v),
        components: [new Stage3Comp()],
    });
}
