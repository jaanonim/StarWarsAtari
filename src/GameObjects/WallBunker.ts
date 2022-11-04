import WireframeMaterial from "3d-game-engine-canvas/src/classes/Materials/WireframeMaterial";
import MeshRenderer from "3d-game-engine-canvas/src/components/MeshRenderer";
import Importer from "3d-game-engine-canvas/src/tools/Importer";
import FileLoader from "3d-game-engine-canvas/src/tools/FileLoader";
import ObjLoader from "3d-game-engine-canvas/src/tools/ObjLoader";
import Color from "3d-game-engine-canvas/src/utilities/math/Color";
import { Hittable } from "../Components/Hittable";
import Vector3 from "3d-game-engine-canvas/src/utilities/math/Vector3";
import { WallBunkerComp } from "../Components/WallBunkerComp";

export default async function WallBunker(position: Vector3) {
    const plane = new ObjLoader(await FileLoader.load("./plane.obj")).parse(
        true
    );
    plane.doubleSided = true;
    const PI2 = Math.PI / 2;
    const mat = new WireframeMaterial(Color.red);
    const wal = new WallBunkerComp();

    return Importer.object({
        name: "WallBunker",
        transform: {
            position: position,
            rotation: [0, PI2, 0],
            scale: [0.3, 0.3, 0.3],
        },
        components: [
            new MeshRenderer(plane.copy(), mat),
            new Hittable(wal),
            wal,
        ],
    });
}
