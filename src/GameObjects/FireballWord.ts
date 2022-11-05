import SphereCollider from "3d-game-engine-canvas/src/components/colliders/SphereCollider";
import SpriteRenderer from "3d-game-engine-canvas/src/components/SpriteRenderer";
import FileLoader from "3d-game-engine-canvas/src/tools/FileLoader";
import Importer from "3d-game-engine-canvas/src/tools/Importer";
import Rotate from "3d-game-engine-canvas/src/tools/Rotate";
import TextureLoader from "3d-game-engine-canvas/src/tools/TextureLoader";
import Color from "3d-game-engine-canvas/src/utilities/math/Color";
import Vector3 from "3d-game-engine-canvas/src/utilities/math/Vector3";
import { FireballWordComp } from "../Components/FireballWordComp";
import { Hittable } from "../Components/Hittable";

export default async function FireballWord(position: Vector3) {
    const tex = new TextureLoader(
        await FileLoader.loadImg("img/fireball.png")
    ).parse();
    const comp = new FireballWordComp();

    return Importer.object({
        name: "FireballWord",
        transform: {
            position: position,
            rotation: [0, 0, 0],
            scale: [0.3, 0.3, 0.3],
        },
        components: [
            new SpriteRenderer(tex, new Color(255, 255, 255, 255)),
            new Rotate(new Vector3(0, 0, -0.007)),
            new SphereCollider(0.2, Vector3.zero),
            new Hittable(comp),
            comp,
        ],
    });
}
