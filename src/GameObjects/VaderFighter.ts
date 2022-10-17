import WireframeMaterial from "3d-game-engine-canvas/src/classes/Materials/WireframeMaterial";
import MeshRenderer from "3d-game-engine-canvas/src/components/MeshRenderer";
import Importer from "3d-game-engine-canvas/src/tools/Importer";
import FileLoader from "3d-game-engine-canvas/src/tools/FileLoader";
import ObjLoader from "3d-game-engine-canvas/src/tools/ObjLoader";
import Color from "3d-game-engine-canvas/src/utilities/math/Color";

export default async function VaderFighter() {
    const wing = new ObjLoader(await FileLoader.load("./wing2.obj")).parse(
        true
    );
    wing.doubleSided = true;
    const body = new ObjLoader(await FileLoader.load("./body.obj")).parse();
    body.doubleSided = true;
    const mat = new WireframeMaterial(Color.blue);
    return Importer.object({
        name: "VaderFighter",
        children: [
            {
                name: "wing2",
                transform: {
                    position: [1, 0, 0],
                    rotation: [0, 0, Math.PI],

                    scale: [1, 1, 0.7],
                },
                components: [new MeshRenderer(wing, mat)],
            },
            {
                name: "body",
                transform: {
                    position: [0, 0, 0],
                    scale: [1, 0.5, 0.5],
                },
                components: [new MeshRenderer(body, mat)],
            },
            {
                name: "wing2",
                transform: {
                    position: [-1, 0, 0],
                    rotation: [0, 0, 0],
                    scale: [1, 1, 0.7],
                },
                components: [new MeshRenderer(wing, mat)],
            },
        ],
    });
}
