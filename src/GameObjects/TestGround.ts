import BasicMaterial from "3d-game-engine-canvas/src/classes/Materials/BasicMaterial";
import MeshRenderer from "3d-game-engine-canvas/src/components/MeshRenderer";
import Importer from "3d-game-engine-canvas/src/tools/Importer";
import DefaultMeshes from "3d-game-engine-canvas/src/tools/DefaultMeshes";
import Color from "3d-game-engine-canvas/src/utilities/math/Color";
import Vector3 from "3d-game-engine-canvas/src/utilities/math/Vector3";
import Vector2 from "3d-game-engine-canvas/src/utilities/math/Vector2";
import Light, { LightType } from "3d-game-engine-canvas/src/components/Light";

export default async function TestGround(
    pos: Vector3,
    scale: Vector3,
    size: Vector2
) {
    const plane = DefaultMeshes.plane;
    //plane.doubleSided = true;
    const mat = new BasicMaterial(new Color(100, 100, 100));
    const mat2 = new BasicMaterial(new Color(50, 50, 50));
    const PI2 = Math.PI / 2;
    size = size.roundToInt();

    const positions = [];
    for (let x = 0; x < size.x; x += 2) {
        for (let y = 0; y < size.y; y += 2) {
            positions.push(new Vector3(x, 0, y));
        }
    }

    return Importer.object({
        name: "TestGround",
        transform: {
            position: pos,
            scale: scale,
        },
        children: positions.map((p, i) => ({
            name: "tile",
            transform: {
                position: p,
                rotation: [PI2, 0, 0],
            },
            components: [new MeshRenderer(plane, i % 2 ? mat : mat2)],
        })),

        components: [new Light(LightType.AMBIENT, 0.2, Color.white)],
    });
}
