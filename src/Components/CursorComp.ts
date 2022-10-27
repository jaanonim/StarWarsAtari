import Component from "3d-game-engine-canvas/src/classes/Components/Component";
import Input from "../Classes/Input";
import Vector3 from "3d-game-engine-canvas/src/utilities/math/Vector3";
import Box2D from "3d-game-engine-canvas/src/utilities/math/Box2D";
import Transform from "3d-game-engine-canvas/src/utilities/Transform";
import Renderer from "3d-game-engine-canvas/src/classes/Renderer";

export class CursorComp extends Component {
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
        if (
            this.transform.position.equals(this.last) &&
            !Input.hasButtonPressed()
        ) {
            this.timer += Renderer.deltaTime;
        } else {
            this.last = this.transform.position;
            this.timer = 0;
        }
    }
}
