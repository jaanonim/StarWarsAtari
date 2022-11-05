import {
    PositionType,
    SizeType,
} from "3d-game-engine-canvas/src/classes/Components/SizedComponent";
import Image from "3d-game-engine-canvas/src/components/Image";
import UiElement from "3d-game-engine-canvas/src/components/UiElement";
import FileLoader from "3d-game-engine-canvas/src/tools/FileLoader";
import Importer from "3d-game-engine-canvas/src/tools/Importer";
import TextureLoader from "3d-game-engine-canvas/src/tools/TextureLoader";
import { clamp, map } from "3d-game-engine-canvas/src/utilities/math/Math";
import Vector2 from "3d-game-engine-canvas/src/utilities/math/Vector2";
import { FireballScreenComp } from "../Components/FireballScreenComp";

export default async function FireballScreen(start: number) {
    const tex = new TextureLoader(
        await FileLoader.loadImg("img/fireball.png")
    ).parse();

    const v = map(clamp(start, 0, 100), 0, 100, 1, 2);

    return Importer.object({
        name: "FireballScreen",
        components: [
            new UiElement(
                new Vector2(20, 20).multiply(v),
                undefined,
                SizeType.PIXEL,
                PositionType.TOP_LEFT
            ),
            new FireballScreenComp(),
            new Image(tex),
        ],
    });
}
