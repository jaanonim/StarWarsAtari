import Component from "3d-game-engine-canvas/src/classes/Components/Component";
import Box2D from "3d-game-engine-canvas/src/utilities/math/Box2D";
import Transform from "3d-game-engine-canvas/src/utilities/Transform";
import Input from "../Classes/Input";
import { map } from "3d-game-engine-canvas/src/utilities/math/Math";
import Vector3 from "3d-game-engine-canvas/src/utilities/math/Vector3";
import Data from "../Classes/Data";

export class ShipComp extends Component {
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
        const pos = this.box.clamp(Input.getScaledPos().roundToInt());
        const x = map(
            pos.x,
            this.box.a.x,
            this.box.b.x,
            -Data.moveX,
            Data.moveX
        );
        const y = map(
            pos.y,
            this.box.a.y,
            this.box.b.y,
            -Data.moveY,
            Data.moveY
        );
        this.transform.position = new Vector3(x, y, 0).roundXYToInt();
    }
}
