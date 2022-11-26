import WireframeMaterial from "3d-game-engine-canvas/src/classes/Materials/WireframeMaterial";
import MeshRenderer from "3d-game-engine-canvas/src/components/MeshRenderer";
import Importer from "3d-game-engine-canvas/src/tools/Importer";
import FileLoader from "3d-game-engine-canvas/src/tools/FileLoader";
import ObjLoader from "3d-game-engine-canvas/src/tools/ObjLoader";
import Color from "3d-game-engine-canvas/src/utilities/math/Color";
import TieComp from "../Components/TieComp";
import Hittable from "../Components/Hittable";

export default async function VaderFighter() {
    const wing = new ObjLoader(await FileLoader.load("model/wing2.obj")).parse(
        true
    );
    wing.doubleSided = true;
    const body = new ObjLoader(await FileLoader.load("model/body.obj")).parse();
    body.doubleSided = true;
    const mat = new WireframeMaterial(Color.blue);

    const tieComp = new TieComp(true, []);
    return await Importer.object({
        name: "VaderFighter",
        transform: { position: [0, 0, -5] },
        children: [
            {
                name: "wing2",
                transform: {
                    position: [1, 0, 0],
                    rotation: [0, 0, Math.PI],
                    scale: [1, 1, 0.7],
                },
                components: [
                    new MeshRenderer(wing.copy(), mat),
                    new Hittable(tieComp),
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
                name: "wing2",
                transform: {
                    position: [-1, 0, 0],
                    rotation: [0, 0, 0],
                    scale: [1, 1, 0.7],
                },
                components: [
                    new MeshRenderer(wing.copy(), mat),
                    new Hittable(tieComp),
                ],
            },
        ],
        components: [tieComp],
    });
}
