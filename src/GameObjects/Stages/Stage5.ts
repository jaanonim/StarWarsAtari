import Importer from "3d-game-engine-canvas/src/tools/Importer";
import Color from "3d-game-engine-canvas/src/utilities/math/Color";
import { getRandomElement } from "3d-game-engine-canvas/src/utilities/math/Math";
import Data from "../../Classes/Data";
import Stage5Comp from "../../Components/Stages/Stage5Comp";
import Floor from "../Floor";
import Wall from "../Wall";

export default async function Stage5() {
    const len = Data.lengthOfTrench * 2;
    const PATTERNS = [
        [[0], [0]],
        [[1], [1]],
        [[2], [2]],
        [[3], [3]],
    ];
    const COLORS = [Color.blue, Color.red, Color.green];

    return Importer.object({
        name: "Stage5",
        children: [
            await Floor(len),
            ...(await Promise.all(
                Array(len / 2)
                    .fill(0)
                    .map((_, i) =>
                        Wall(
                            i * 4 + 2,
                            [[], []],
                            i > 2 && i < len / 2 - 3
                                ? getRandomElement(PATTERNS)
                                : [[], []],
                            getRandomElement(COLORS)
                        )
                    )
            )),
        ],
        components: [new Stage5Comp()],
    });
}
