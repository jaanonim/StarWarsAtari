import UiElement from "3d-game-engine-canvas/src/components/UiElement";
import Importer from "3d-game-engine-canvas/src/tools/Importer";
import Image from "3d-game-engine-canvas/src/components/Image";
import {
    PositionType,
    SizeType,
} from "3d-game-engine-canvas/src/classes/Components/SizedComponent";
import TextureLoader from "3d-game-engine-canvas/src/tools/TextureLoader";
import FileLoader from "3d-game-engine-canvas/src/tools/FileLoader";
import Vector2 from "3d-game-engine-canvas/src/utilities/math/Vector2";
import Text from "3d-game-engine-canvas/src/components/Text";
import Color from "3d-game-engine-canvas/src/utilities/math/Color";
import DifficultySelectScreenComp from "../Components/DifficultySelectScreenComp";

export default async function DifficultySelectScreen() {
    const tex = new TextureLoader(
        await FileLoader.loadImg("img/select.png")
    ).parse();

    const ratio = 748 / 946;
    const width = 250;
    const countDownText = new Text("03", {
        font: "pixeled",
        fontSize: 7,
        color: Color.fromHex("986d00"),
    });

    return await Importer.object({
        name: "DifficultySelectScreen",
        children: [
            {
                name: "img",
                children: [
                    {
                        name: "text",
                        transform: {
                            position: [-7, 41, 0],
                        },
                        components: [
                            new UiElement({
                                positionType: PositionType.TOP_CENTER,
                                smoothing: false,
                            }),
                            countDownText,
                        ],
                    },
                ],
                components: [
                    new UiElement({
                        size: new Vector2(width, width * ratio),
                        positionType: PositionType.CENTER_CENTER,
                        smoothing: false,
                    }),
                    new Image(tex),
                ],
            },
            {
                name: "__easy",
                transform: {
                    position: [80, -15, 0],
                },
                components: [
                    new UiElement({
                        size: new Vector2(50, 50),
                        positionType: PositionType.CENTER_LEFT,
                        smoothing: false,
                    }),
                ],
            },
            {
                name: "__hard",
                transform: {
                    position: [-80, -15, 0],
                },
                components: [
                    new UiElement({
                        size: new Vector2(50, 50),
                        positionType: PositionType.CENTER_RIGHT,
                        smoothing: false,
                    }),
                ],
            },
            {
                name: "__medium",
                transform: {
                    position: [-7, 50, 0],
                },
                components: [
                    new UiElement({
                        size: new Vector2(50, 50),
                        positionType: PositionType.CENTER_CENTER,
                        smoothing: false,
                    }),
                ],
            },
        ],
        components: [
            new UiElement({
                sizeType: SizeType.PERCENTAGE,
                positionType: PositionType.CENTER_CENTER,
                smoothing: false,
            }),
            new DifficultySelectScreenComp(countDownText),
        ],
    });
}
