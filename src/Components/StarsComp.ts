import Component from "3d-game-engine-canvas/src/classes/Components/Component";
import Renderer from "3d-game-engine-canvas/src/classes/Renderer";
import Vector3 from "3d-game-engine-canvas/src/utilities/math/Vector3";

import Star from "../GameObjects/Star";
export class StarsComp extends Component {
    private timer: number = 0;

    async update() {
        if (this.timer > 200) {
            for (let _ = 0; _ < 3; _++)
                if (Math.random() > 0.5) {
                    const pos = Vector3.random
                        .subtract(Vector3.one.divide(2))
                        .normalize();
                    pos.z = 0;
                    const star = await Star(pos);
                    this.gameObject.addChildren(star);
                }
            this.timer = 0;
        } else this.timer += Renderer.deltaTime;
    }
}
