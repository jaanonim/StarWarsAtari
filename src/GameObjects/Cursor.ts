import Importer from "3d-game-engine-canvas/src/tools/Importer";
import FileLoader from "3d-game-engine-canvas/src/tools/FileLoader";
import TextureLoader from "3d-game-engine-canvas/src/tools/TextureLoader";
import UiElement from "3d-game-engine-canvas/src/components/UiElement";
import Image from "3d-game-engine-canvas/src/components/Image";
import Text from "3d-game-engine-canvas/src/components/Text";
import { PositionType } from "3d-game-engine-canvas/src/classes/Components/SizedComponent";
import Color from "3d-game-engine-canvas/src/utilities/math/Color";
import Vector2 from "3d-game-engine-canvas/src/utilities/math/Vector2";
import { CursorComp } from "../Components/CursorComp";

export default async function Cursor() {
    const tex = new TextureLoader(
        await FileLoader.loadImg("./cursor.png")
    ).parse();
    return Importer.object({
        name: "Cursor",
        transform: {
            position: [0, 0, 0],
        },
        components: [
            new UiElement(
                new Vector2(50, 20),
                undefined,
                undefined,
                PositionType.TOP_LEFT
            ),
            new Text("a", {
                fontSize: 30,
                color: Color.red,
            }),
            new Image(tex),
            new CursorComp(),
        ],
    });
}
