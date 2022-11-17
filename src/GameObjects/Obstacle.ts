import WireframeMaterial from "3d-game-engine-canvas/src/classes/Materials/WireframeMaterial";
import MeshRenderer from "3d-game-engine-canvas/src/components/MeshRenderer";
import Importer from "3d-game-engine-canvas/src/tools/Importer";
import FileLoader from "3d-game-engine-canvas/src/tools/FileLoader";
import ObjLoader from "3d-game-engine-canvas/src/tools/ObjLoader";
import Color from "3d-game-engine-canvas/src/utilities/math/Color";
import Vector3 from "3d-game-engine-canvas/src/utilities/math/Vector3";
import BoxCollider from "3d-game-engine-canvas/src/components/colliders/BoxCollider";

export default async function Obstacle(position: Vector3, color: Color) {
    const tower = new ObjLoader(await FileLoader.load("model/tower.obj")).parse(
        true
    );

    const mat = new WireframeMaterial(color);

    return Importer.object({
        name: "Obstacle",
        transform: {
            position: position,
            rotation: [0, Math.PI, Math.PI / 2],
            scale: [0.633, 1, 0.633],
        },
        components: [
            new MeshRenderer(tower.copy(), mat),
            new BoxCollider(
                new Vector3(-0.3, -1, -0.3),
                new Vector3(0.3, 1, 0.3)
            ),
        ],
    });
}
