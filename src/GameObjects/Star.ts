import SpriteRenderer from "3d-game-engine-canvas/src/components/SpriteRenderer";
import FileLoader from "3d-game-engine-canvas/src/tools/FileLoader";
import Importer from "3d-game-engine-canvas/src/tools/Importer";
import TextureLoader from "3d-game-engine-canvas/src/tools/TextureLoader";
import Color from "3d-game-engine-canvas/src/utilities/math/Color";
import Vector3 from "3d-game-engine-canvas/src/utilities/math/Vector3";
import Texture from "3d-game-engine-canvas/src/utilities/Texture";
import { StarComp } from "../Components/StarComp";

let tex: Texture;

export default async function Star(
    pos: Vector3,
    dir: Vector3,
    color: Color,
    revers: boolean
) {
    if (!tex) {
        tex = new TextureLoader(
            await FileLoader.loadImg("img/nothing.png")
        ).parse();
    }

    return await Importer.object({
        name: "star",
        transform: { position: pos, scale: [0.1, 0.1, 0.1] },
        components: [new SpriteRenderer(tex, color), new StarComp(dir, revers)],
    });
}
