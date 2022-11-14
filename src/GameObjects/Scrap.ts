import WireframeMaterial from "3d-game-engine-canvas/src/classes/Materials/WireframeMaterial";
import MeshRenderer from "3d-game-engine-canvas/src/components/MeshRenderer";
import Importer from "3d-game-engine-canvas/src/tools/Importer";
import FileLoader from "3d-game-engine-canvas/src/tools/FileLoader";
import ObjLoader from "3d-game-engine-canvas/src/tools/ObjLoader";
import Color from "3d-game-engine-canvas/src/utilities/math/Color";
import { RandomMovementComp } from "../Components/RandomMovementComp";
import Vector3 from "3d-game-engine-canvas/src/utilities/math/Vector3";

export default async function Scrap(color: Color, scale = Vector3.one) {
    const plane = new ObjLoader(await FileLoader.load("model/plane.obj")).parse(
        true
    );
    const mat = new WireframeMaterial(color);
    return Importer.object({
        name: "Scrap",
        transform: { scale: scale },
        children: [
            {
                name: "1",
                transform: {
                    position: [0, 0, -0.5],
                    rotation: [Math.PI, 0, 0],
                },
                components: [
                    new MeshRenderer(plane, mat),
                    new RandomMovementComp(true),
                ],
            },
            {
                name: "2",
                transform: {
                    position: [-0.43301270189222, 0, -0.25],
                    rotation: [Math.PI, Math.PI / 3, 0],
                },
                components: [
                    new MeshRenderer(plane, mat),
                    new RandomMovementComp(true),
                ],
            },
            {
                name: "3",
                transform: {
                    position: [0.43301270189222, 0, -0.25],
                    rotation: [Math.PI, -Math.PI / 3, 0],
                },
                components: [
                    new MeshRenderer(plane, mat),
                    new RandomMovementComp(true),
                ],
            },
        ],
    });
}
