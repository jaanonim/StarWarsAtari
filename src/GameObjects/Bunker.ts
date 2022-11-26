import WireframeMaterial from "3d-game-engine-canvas/src/classes/Materials/WireframeMaterial";
import MeshRenderer from "3d-game-engine-canvas/src/components/MeshRenderer";
import Importer from "3d-game-engine-canvas/src/tools/Importer";
import FileLoader from "3d-game-engine-canvas/src/tools/FileLoader";
import ObjLoader from "3d-game-engine-canvas/src/tools/ObjLoader";
import Color from "3d-game-engine-canvas/src/utilities/math/Color";
import Vector3 from "3d-game-engine-canvas/src/utilities/math/Vector3";
import Hittable from "../Components/Hittable";
import { BunkerComp } from "../Components/BunkerComp";

export default async function Bunker(position: Vector3) {
    const tower = new ObjLoader(
        await FileLoader.load("model/bunker.obj")
    ).parse(true);
    const mat = new WireframeMaterial(Color.red);
    const comp = new BunkerComp();

    return await Importer.object({
        name: "Bunker",
        transform: {
            position: position,
            rotation: [0, Math.PI, 0],
            scale: [0.5, 0.3, 0.5],
        },
        components: [
            new MeshRenderer(tower.copy(), mat),
            new Hittable(comp),
            comp,
        ],
    });
}
