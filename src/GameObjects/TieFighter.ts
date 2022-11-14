import WireframeMaterial from "3d-game-engine-canvas/src/classes/Materials/WireframeMaterial";
import MeshRenderer from "3d-game-engine-canvas/src/components/MeshRenderer";
import Importer from "3d-game-engine-canvas/src/tools/Importer";
import FileLoader from "3d-game-engine-canvas/src/tools/FileLoader";
import ObjLoader from "3d-game-engine-canvas/src/tools/ObjLoader";
import Color from "3d-game-engine-canvas/src/utilities/math/Color";
import { Hittable } from "../Components/Hittable";
import TieComp from "../Components/TieComp";
import { RandomMovementComp } from "../Components/RandomMovementComp";

export default async function TieFighter() {
    const wing = new ObjLoader(await FileLoader.load("model/wing.obj")).parse(
        true
    );
    wing.doubleSided = true;
    const body = new ObjLoader(await FileLoader.load("model/body.obj")).parse();
    body.doubleSided = true;
    const mat = new WireframeMaterial(Color.blue);
    const PI2 = Math.PI / 2;
    const ele1 = new RandomMovementComp();
    const ele2 = new RandomMovementComp();
    const tieComp = new TieComp(false, [ele1, ele2]);
    return Importer.object({
        name: "TieFighter",
        children: [
            {
                name: "wing",
                transform: {
                    position: [1, 0, 0],
                    rotation: [PI2, 0, 0],
                },
                components: [
                    new MeshRenderer(wing.copy(), mat),
                    new Hittable(tieComp),
                    ele1,
                ],
            },
            {
                name: "body",
                transform: {
                    position: [0, 0, 0],
                    scale: [1, 0.5, 0.5],
                },
                components: [
                    new MeshRenderer(body.copy(), mat),
                    new Hittable(tieComp),
                ],
            },
            {
                name: "wing",
                transform: {
                    position: [-1, 0, 0],
                    rotation: [PI2, 0, 0],
                },
                components: [
                    new MeshRenderer(wing.copy(), mat),
                    new Hittable(tieComp),
                    ele2,
                ],
            },
        ],
        components: [tieComp],
    });
}
