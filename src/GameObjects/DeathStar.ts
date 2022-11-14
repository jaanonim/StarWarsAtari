import SpriteRenderer from "3d-game-engine-canvas/src/components/SpriteRenderer";
import FileLoader from "3d-game-engine-canvas/src/tools/FileLoader";
import Importer from "3d-game-engine-canvas/src/tools/Importer";
import TextureLoader from "3d-game-engine-canvas/src/tools/TextureLoader";
import Color from "3d-game-engine-canvas/src/utilities/math/Color";
import { DeathStarComp } from "../Components/DeathStarComp";

export default async function DeathStar() {
    const tex = new TextureLoader(
        await FileLoader.loadImg("img/smallDeathStar.png")
    ).parse();
    tex.bilinearFiltering = false;

    return Importer.object({
        name: "DeathStar",
        transform: { position: [0, 0, 19.8] },
        components: [
            new SpriteRenderer(tex, new Color(255, 255, 255, 255)),
            new DeathStarComp(),
        ],
    });
}
