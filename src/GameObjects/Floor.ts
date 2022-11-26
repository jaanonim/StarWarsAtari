import WireframeMaterial from "3d-game-engine-canvas/src/classes/Materials/WireframeMaterial";
import MeshRenderer from "3d-game-engine-canvas/src/components/MeshRenderer";
import Importer from "3d-game-engine-canvas/src/tools/Importer";
import FileLoader from "3d-game-engine-canvas/src/tools/FileLoader";
import ObjLoader from "3d-game-engine-canvas/src/tools/ObjLoader";
import Color from "3d-game-engine-canvas/src/utilities/math/Color";
import Hittable from "../Components/Hittable";
import { TargetComp } from "../Components/TargetComp";

export default async function Floor(length: number) {
    const plane = new ObjLoader(await FileLoader.load("model/plane.obj")).parse(
        true
    );
    const PI2 = Math.PI / 2;
    const mat = new WireframeMaterial(Color.green);
    const tar = new TargetComp();

    return await Importer.object({
        name: "Floor",
        children: [
            {
                name: "floor",
                transform: {
                    position: [0, -1, length],
                    rotation: [PI2, 0, 0],
                    scale: [2, length, 1],
                },
                components: [new MeshRenderer(plane.copy(), mat)],
            },
            {
                name: "floor",
                transform: {
                    position: [0, -1, length],
                    rotation: [PI2, 0, 0],
                    scale: [1.8, length, 1],
                },
                components: [new MeshRenderer(plane.copy(), mat)],
            },
            {
                name: "wall",
                transform: {
                    position: [0, 2, length * 2],
                    rotation: [0, 0, 0],
                    scale: [2, 3, 1],
                },
                components: [new MeshRenderer(plane.copy(), mat)],
            },
            {
                name: "target",
                transform: {
                    position: [0, -1, length * 2 - 2],
                    rotation: [PI2, 0, 0],
                    scale: [0.5, 0.5, 0.5],
                },
                components: [
                    new MeshRenderer(plane.copy(), mat),
                    new Hittable(tar),
                    tar,
                ],
            },
        ],
        components: [],
    });
}
