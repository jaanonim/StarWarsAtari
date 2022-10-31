import WireframeMaterial from "3d-game-engine-canvas/src/classes/Materials/WireframeMaterial";
import MeshRenderer from "3d-game-engine-canvas/src/components/MeshRenderer";
import Importer from "3d-game-engine-canvas/src/tools/Importer";
import FileLoader from "3d-game-engine-canvas/src/tools/FileLoader";
import ObjLoader from "3d-game-engine-canvas/src/tools/ObjLoader";
import Color from "3d-game-engine-canvas/src/utilities/math/Color";
import { Hittable } from "../Components/Hitable";
import { Tie } from "../Components/Tie";
import Renderer from "3d-game-engine-canvas/src/classes/Renderer";

export default async function TieFighter(renderer: Renderer) {
    const wing = new ObjLoader(await FileLoader.load("./wing.obj")).parse(true);
    wing.doubleSided = true;
    const body = new ObjLoader(await FileLoader.load("./body.obj")).parse();
    body.doubleSided = true;
    const mat = new WireframeMaterial(Color.blue);
    const PI2 = Math.PI / 2;
    const tieComp = new Tie(false, renderer);
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
                    new MeshRenderer(wing, mat),
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
                    new MeshRenderer(body, mat),
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
                    new MeshRenderer(wing, mat),
                    new Hittable(tieComp),
                ],
            },
        ],
        components: [tieComp],
    });
}
