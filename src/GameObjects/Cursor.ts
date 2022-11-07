import Importer from "3d-game-engine-canvas/src/tools/Importer";
import FileLoader from "3d-game-engine-canvas/src/tools/FileLoader";
import TextureLoader from "3d-game-engine-canvas/src/tools/TextureLoader";
import UiElement from "3d-game-engine-canvas/src/components/UiElement";
import Image from "3d-game-engine-canvas/src/components/Image";
import Vector2 from "3d-game-engine-canvas/src/utilities/math/Vector2";
import { CursorComp } from "../Components/CursorComp";

export default async function Cursor() {
    const tex = new TextureLoader(
        await FileLoader.loadImg("img/cursor.png")
    ).parse();
    console.log(tex.canvas);
    return Importer.object({
        name: "Cursor",
        transform: {
            position: [0, 0, 0],
        },
        components: [
            new UiElement({
                size: new Vector2(12, 7),
                smoothing: false,
            }),
            new Image(tex),
            new CursorComp(),
        ],
    });
}
