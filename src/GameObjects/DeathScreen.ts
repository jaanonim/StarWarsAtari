import { PositionType } from "3d-game-engine-canvas/src/classes/Components/SizedComponent";
import Image from "3d-game-engine-canvas/src/components/Image";
import UiElement from "3d-game-engine-canvas/src/components/UiElement";
import FileLoader from "3d-game-engine-canvas/src/tools/FileLoader";
import Importer from "3d-game-engine-canvas/src/tools/Importer";
import TextureLoader from "3d-game-engine-canvas/src/tools/TextureLoader";
import Vector2 from "3d-game-engine-canvas/src/utilities/math/Vector2";
import { DeathScreenComp } from "../Components/DeathScreenComp";

export default async function DeathScreen() {
    const tex = new TextureLoader(
        await FileLoader.loadImg("img/gameOver.png")
    ).parse();
    const c = new Image(tex);

    const ratio = 224 / 1127;
    const width = 300;

    return Importer.object({
        name: "DeathScreen",
        components: [
            new UiElement({
                size: new Vector2(width, width * ratio),
                positionType: PositionType.CENTER_CENTER,
                smoothing: false,
            }),
            c,
            new DeathScreenComp(c),
        ],
    });
}
