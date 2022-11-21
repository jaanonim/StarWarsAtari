import Component from "3d-game-engine-canvas/src/classes/Components/Component";
import Renderer from "3d-game-engine-canvas/src/classes/Renderer";
import Color from "3d-game-engine-canvas/src/utilities/math/Color";
import Vector3 from "3d-game-engine-canvas/src/utilities/math/Vector3";
import Data from "../Classes/Data";
import Star from "../GameObjects/Star";

export default class GroundComp extends Component {
    private timer: number = 0;

    async update() {
        if (this.timer > 200) {
            for (let _ = 0; _ < 3; _++)
                if (Math.random() > 0.5) {
                    const pos = new Vector3(
                        Math.random() * Data.groundRange - Data.groundRange / 2,
                        -5,
                        0
                    );
                    pos.z = 0;
                    const star = await Star(
                        pos,
                        pos.subtract(new Vector3(0, 2, 0)).normalize(),
                        Color.blue,
                        false
                    );
                    this.gameObject.addChildren(star);
                }
            this.timer = 0;
        } else this.timer += Renderer.deltaTime;
    }
}
