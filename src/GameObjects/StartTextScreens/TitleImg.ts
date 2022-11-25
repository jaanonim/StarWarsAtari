import { PositionType } from "3d-game-engine-canvas/src/classes/Components/SizedComponent";
import Image from "3d-game-engine-canvas/src/components/Image";
import UiElement from "3d-game-engine-canvas/src/components/UiElement";
import FileLoader from "3d-game-engine-canvas/src/tools/FileLoader";
import Importer from "3d-game-engine-canvas/src/tools/Importer";
import TextureLoader from "3d-game-engine-canvas/src/tools/TextureLoader";
import Vector2 from "3d-game-engine-canvas/src/utilities/math/Vector2";

async function TitleImg() {
    const tex = new TextureLoader(
        await FileLoader.loadImg("img/title.png")
    ).parse();

    const ratio = 90 / 731;
    const width = 200;

    return Importer.object({
        name: "img",
        transform: {
            position: [0, 30, 0],
        },
        components: [
            new UiElement({
                size: new Vector2(width, ratio * width),
                anchor: new Vector2(0.5, 0),
                positionType: PositionType.TOP_CENTER,
                smoothing: false,
            }),
            new Image(tex),
        ],
    });
}
export default TitleImg;
