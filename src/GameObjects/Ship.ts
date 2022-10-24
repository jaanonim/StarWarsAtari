import {
    PositionType,
    SizeType,
} from "3d-game-engine-canvas/src/classes/Components/SizedComponent";
import UiElement from "3d-game-engine-canvas/src/components/UiElement";
import FileLoader from "3d-game-engine-canvas/src/tools/FileLoader";
import Importer from "3d-game-engine-canvas/src/tools/Importer";
import TextureLoader from "3d-game-engine-canvas/src/tools/TextureLoader";
import Vector2 from "3d-game-engine-canvas/src/utilities/math/Vector2";
import Image from "3d-game-engine-canvas/src/components/Image";
import Component from "3d-game-engine-canvas/src/classes/Components/Component";
import Box2D from "3d-game-engine-canvas/src/utilities/math/Box2D";
import Transform from "3d-game-engine-canvas/src/utilities/Transform";
import Input from "../classes/Input";
import { map } from "3d-game-engine-canvas/src/utilities/math/Math";
import Vector3 from "3d-game-engine-canvas/src/utilities/math/Vector3";

class ShipComp extends Component {
    box!: Box2D;

    async start() {
        const p = this.gameObject.transform.parent;
        if (!(p instanceof Transform)) throw Error();
        const c = p.gameObject.getSizedComponent();
        if (!c) throw Error();
        const margin = c.size.divide(10);

        this.box = new Box2D(margin, c.size.subtract(margin));
    }

    async update() {
        const pos = this.box.clamp(Input.getPos().roundToInt());
        const x = map(pos.x, this.box.a.x, this.box.b.x, -30, 30);
        const y = map(pos.y, this.box.a.y, this.box.b.y, -30, 30);
        this.transform.position = new Vector3(x, y, 0);
    }
}

export default async function Ship() {
    const tex = new TextureLoader(
        await FileLoader.loadImg("./arm.png")
    ).parse();
    const tex2 = new TextureLoader(
        await FileLoader.loadImg("./arm2.png")
    ).parse();
    const tex3 = new TextureLoader(
        await FileLoader.loadImg("./ship.png")
    ).parse();

    return Importer.object({
        name: "ship",
        children: [
            {
                name: "arm",
                transform: {
                    position: [170, -150, 0],
                },
                components: [
                    new UiElement(
                        new Vector2(150, 150),
                        Math.PI,
                        undefined,
                        PositionType.CENTER_LEFT
                    ),
                    new Image(tex2),
                ],
            },
            {
                name: "arm",
                transform: {
                    position: [170, 200, 0],
                },
                components: [
                    new UiElement(
                        new Vector2(150, 150),
                        Math.PI,
                        undefined,
                        PositionType.CENTER_LEFT
                    ),
                    new Image(tex),
                ],
            },
            {
                name: "arm",
                transform: {
                    position: [-170, -150, 0],
                },
                components: [
                    new UiElement(
                        new Vector2(150, 150),
                        0,
                        undefined,
                        PositionType.CENTER_RIGHT
                    ),
                    new Image(tex),
                ],
            },
            {
                name: "arm",
                transform: {
                    position: [-170, 200, 0],
                },
                components: [
                    new UiElement(
                        new Vector2(150, 150),
                        0,
                        undefined,
                        PositionType.CENTER_RIGHT
                    ),
                    new Image(tex2),
                ],
            },
            {
                name: "ship",
                transform: {
                    position: [0, -140, 0],
                },
                components: [
                    new UiElement(
                        new Vector2(250, 170),
                        0,
                        undefined,
                        PositionType.BOTTOM_CENTER
                    ),
                    new Image(tex3),
                ],
            },
        ],
        components: [
            new UiElement(
                new Vector2(120, 120),
                undefined,
                SizeType.PERCENTAGE,
                PositionType.CENTER_CENTER
            ),
            new ShipComp(),
        ],
    });
}
