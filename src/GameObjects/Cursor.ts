import Importer from "3d-game-engine-canvas/src/tools/Importer";
import FileLoader from "3d-game-engine-canvas/src/tools/FileLoader";
import TextureLoader from "3d-game-engine-canvas/src/tools/TextureLoader";
import UiElement from "3d-game-engine-canvas/src/components/UiElement";
import Image from "3d-game-engine-canvas/src/components/Image";
import Text from "3d-game-engine-canvas/src/components/Text";
import { PositionType } from "3d-game-engine-canvas/src/classes/Components/SizedComponent";
import Color from "3d-game-engine-canvas/src/utilities/math/Color";
import Component from "3d-game-engine-canvas/src/classes/Components/Component";
import Input from "../classes/Input";
import Vector3 from "3d-game-engine-canvas/src/utilities/math/Vector3";
import Box2D from "3d-game-engine-canvas/src/utilities/math/Box2D";
import Vector2 from "3d-game-engine-canvas/src/utilities/math/Vector2";
import Transform from "3d-game-engine-canvas/src/utilities/Transform";
import Renderer from "3d-game-engine-canvas/src/classes/Renderer";

class CursorComp extends Component {
    box!: Box2D;
    last: Vector3 = Vector3.zero;
    timer: number = 0;

    async start() {
        const p = this.gameObject.transform.parent;
        if (!(p instanceof Transform)) throw Error();
        const c = p.gameObject.getSizedComponent();
        if (!c) throw Error();
        const margin = c.size.divide(10);

        this.box = new Box2D(margin, c.size.subtract(margin));
        this.last = this.transform.position;
        this.timer = 0;
    }

    async update() {
        const pos = this.box.clamp(Input.getPos().roundToInt());
        this.transform.position = new Vector3(pos.x, pos.y, 0);
        if (this.timer > 3000) {
            this.timer = 0;
            Input.center();
        }
        if (this.transform.position.equals(this.last)) {
            this.timer += Renderer.deltaTime;
        } else {
            this.last = this.transform.position;
            this.timer = 0;
        }
    }
}

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
