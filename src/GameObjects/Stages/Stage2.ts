import Importer from "3d-game-engine-canvas/src/tools/Importer";
import Vector3 from "3d-game-engine-canvas/src/utilities/math/Vector3";
import WaveSystem from "../../Classes/WaveSystem";
import Stage2Comp from "../../Components/Stages/Stage2Comp";
import Bunker from "../Bunker";

export default async function Stage2() {
    const pos: Array<Vector3> = [];

    for (
        let i = 0;
        i < WaveSystem.getInstance().stageData.numberOfBunkers;
        i++
    ) {
        let v: Vector3;
        do
            v = new Vector3(
                Math.random() * WaveSystem.getInstance().stageData.width -
                    WaveSystem.getInstance().stageData.width / 2,
                -2,
                Math.random() * WaveSystem.getInstance().stageData.length +
                    WaveSystem.getInstance().stageData.margin
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
