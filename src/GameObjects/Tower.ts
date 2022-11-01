import WireframeMaterial from "3d-game-engine-canvas/src/classes/Materials/WireframeMaterial";
import MeshRenderer from "3d-game-engine-canvas/src/components/MeshRenderer";
import Importer from "3d-game-engine-canvas/src/tools/Importer";
import FileLoader from "3d-game-engine-canvas/src/tools/FileLoader";
import ObjLoader from "3d-game-engine-canvas/src/tools/ObjLoader";
import Color from "3d-game-engine-canvas/src/utilities/math/Color";
import Vector3 from "3d-game-engine-canvas/src/utilities/math/Vector3";
import BoxCollider from "3d-game-engine-canvas/src/components/colliders/BoxCollider";
import { TowerComp } from "../Components/TowerComp";
import { Hittable } from "../Components/Hittable";

export default async function Tower(position: Vector3) {
    const tower = new ObjLoader(await FileLoader.load("./tower.obj")).parse(
        true
    );
    const mat = new WireframeMaterial(Color.yellow);
    const towerComp = new TowerComp();
    return Importer.object({
        name: "Tower",
        children: [
            {
                name: "tower",
                transform: {
                    position: position,
                    rotation: [Math.PI, 0, 0],
                    scale: [0.5, 2, 0.5],
                },
                components: [
                    new MeshRenderer(tower.copy(), mat),
                    new BoxCollider(
                        new Vector3(-0.5, -1, -0.5),
                        new Vector3(0.5, 1, 0.5)
                    ),
                ],
            },
            {
                name: "top",
                transform: {
                    position: position.add(new Vector3(0, 2.2, 0)),
                    rotation: [Math.PI, 0, 0],
                    scale: [0.5, 0.2, 0.5],
                },
                components: [
                    new MeshRenderer(tower.copy(), mat),
                    new Hittable(towerComp),
                    towerComp,
                ],
            },
        ],
        components: [],
    });
}
