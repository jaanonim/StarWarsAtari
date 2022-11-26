import {
    PositionType,
    SizeType,
} from "3d-game-engine-canvas/src/classes/Components/SizedComponent";
import Image from "3d-game-engine-canvas/src/components/Image";
import UiElement from "3d-game-engine-canvas/src/components/UiElement";
import FileLoader from "3d-game-engine-canvas/src/tools/FileLoader";
import Importer from "3d-game-engine-canvas/src/tools/Importer";
import TextureLoader from "3d-game-engine-canvas/src/tools/TextureLoader";
import Color from "3d-game-engine-canvas/src/utilities/math/Color";
import { DeathScreenComp } from "../Components/DeathScreenComp";

export default async function Flash() {
    const tex = new TextureLoader(
        await FileLoader.loadImg("img/nothing.png")
    ).parse();

    const c = new Image(tex, Color.white);

    return await Importer.object({
        name: "Flash",
        components: [
            new UiElement({
                sizeType: SizeType.PERCENTAGE,
                positionType: PositionType.CENTER_CENTER,
                smoothing: false,
            }),
            c,
            new DeathScreenComp(c, false),
        ],
    });
}
