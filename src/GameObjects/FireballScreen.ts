import {
    PositionType,
    SizeType,
} from "3d-game-engine-canvas/src/classes/Components/SizedComponent";
import Image from "3d-game-engine-canvas/src/components/Image";
import UiElement from "3d-game-engine-canvas/src/components/UiElement";
import FileLoader from "3d-game-engine-canvas/src/tools/FileLoader";
import Importer from "3d-game-engine-canvas/src/tools/Importer";
import TextureLoader from "3d-game-engine-canvas/src/tools/TextureLoader";
import Vector2 from "3d-game-engine-canvas/src/utilities/math/Vector2";
import { FireballScreenComp } from "../Components/FireballScreenComp";

export default async function FireballScreen() {
    const tex = new TextureLoader(
        await FileLoader.loadImg("./fireball.png")
    ).parse();
    return Importer.object({
        name: "FireballScreen",
        components: [
            new UiElement(
                new Vector2(10, 10),
                undefined,
                SizeType.PIXEL,
                PositionType.TOP_LEFT
            ),
            new FireballScreenComp(),
            new Image(tex),
        ],
    });
}
