import SpriteRenderer from "3d-game-engine-canvas/src/components/SpriteRenderer";
import FileLoader from "3d-game-engine-canvas/src/tools/FileLoader";
import Importer from "3d-game-engine-canvas/src/tools/Importer";
import TextureLoader from "3d-game-engine-canvas/src/tools/TextureLoader";
import Color from "3d-game-engine-canvas/src/utilities/math/Color";
import Vector3 from "3d-game-engine-canvas/src/utilities/math/Vector3";
import { StarComp } from "../Components/StarComp";
export default async function Star(pos: Vector3, dir: Vector3, color: Color) {
    const tex = new TextureLoader(
        await FileLoader.loadImg("img/nothing.png")
    ).parse();

    return Importer.object({
        name: "star",
        transform: { position: pos, scale: [0.1, 0.1, 0.1] },
        components: [new SpriteRenderer(tex, color), new StarComp(dir)],
    });
}
