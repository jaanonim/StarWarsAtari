import WireframeMaterial from "3d-game-engine-canvas/src/classes/Materials/WireframeMaterial";
import MeshRenderer from "3d-game-engine-canvas/src/components/MeshRenderer";
import Importer from "3d-game-engine-canvas/src/tools/Importer";
import FileLoader from "3d-game-engine-canvas/src/tools/FileLoader";
import ObjLoader from "3d-game-engine-canvas/src/tools/ObjLoader";
import Color from "3d-game-engine-canvas/src/utilities/math/Color";
import WallBunker from "./WallBunker";
import Vector3 from "3d-game-engine-canvas/src/utilities/math/Vector3";
import Obstacle from "./Obstacle";

export default async function Wall(
    zPos: number,
    bunkerPattern: [Array<number>, Array<number>],
    obstaclePattern: [Array<number>, Array<number>],
    obstacleColor: Color = Color.white
) {
    const plane = new ObjLoader(await FileLoader.load("model/plane.obj")).parse(
        true
    );
    const PI2 = Math.PI / 2;
    const mat = new WireframeMaterial(Color.green);
    const POS = [0, 1.25, 2.5, 3.75];

    return await Importer.object({
        name: "Floor",
        children: [
            {
                name: "wall",
                transform: {
                    position: [2, 2, zPos],
                    rotation: [0, PI2, 0],
                    scale: [2, 3, 1],
                },
                components: [new MeshRenderer(plane.copy(), mat)],
            },
            {
                name: "wall",
                transform: {
                    position: [-2, 2, zPos],
                    rotation: [0, -PI2, 0],
                    scale: [2, 3, 1],
                },
                components: [new MeshRenderer(plane.copy(), mat)],
            },
            ...(await Promise.all(
                bunkerPattern[0].map((y) =>
                    WallBunker(new Vector3(-2, POS[y], zPos))
                )
            )),
            ...(await Promise.all(
                bunkerPattern[1].map((y) =>
                    WallBunker(new Vector3(2, POS[y], zPos))
                )
            )),
            ...(await Promise.all(
                obstaclePattern[0].map((y) =>
                    Obstacle(new Vector3(-1, POS[y], zPos), obstacleColor)
                )
            )),
            ...(await Promise.all(
                obstaclePattern[1].map((y) =>
                    Obstacle(new Vector3(1, POS[y], zPos), obstacleColor)
                )
            )),
        ],
        components: [],
    });
}
