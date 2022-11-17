import Importer from "3d-game-engine-canvas/src/tools/Importer";
import { getRandomElement } from "3d-game-engine-canvas/src/utilities/math/Math";
import Data from "../../Classes/Data";
import Stage4Comp from "../../Components/Stages/Stage4Comp";
import Floor from "../Floor";
import Wall from "../Wall";

export default async function Stage4() {
    const len = Data.lengthOfTrench * 2;
    const PATTERNS = [
        [[0], [0]],
        [[1], [1]],
        [[2], [2]],
        [[3], [3]],
        [
            [2, 3],
            [2, 3],
        ],
        [
            [1, 2],
            [1, 2],
        ],
        [
            [0, 1],
            [0, 1],
        ],
        [[0, 1], []],
        [[], [0, 1]],
        [[], []],
        [[], []],
        [[], []],
        [[], []],
    ];

    return Importer.object({
        name: "Stage4",
        children: [
            await Floor(len),
            ...(await Promise.all(
                Array(len / 2)
                    .fill(0)
                    .map((_, i) =>
                        Wall(
                            i * 4 + 2,
                            i > 2 && i < len / 2 - 3
                                ? getRandomElement(PATTERNS)
                                : [[], []],
                            [[], []]
                        )
                    )
            )),
        ],
        components: [new Stage4Comp()],
    });
}
