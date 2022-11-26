import Component from "3d-game-engine-canvas/src/classes/Components/Component";
import Renderer from "3d-game-engine-canvas/src/classes/Renderer";
import Color from "3d-game-engine-canvas/src/utilities/math/Color";
import { getRandomElement } from "3d-game-engine-canvas/src/utilities/math/Math";
import Vector3 from "3d-game-engine-canvas/src/utilities/math/Vector3";
import Data from "../Classes/Data";
import Star from "../GameObjects/Star";
import GameManager from "./GameManager";

const COLOR_SUB = 70;
export default class StartTextBackgroundComp extends Component {
    private timer: number = 0;
    private readonly COLORS = [
        Color.white,
        Color.cyan,
        Color.yellow,
        Color.green,
    ].map((c) => c.subtract(new Color(COLOR_SUB, COLOR_SUB, COLOR_SUB, 0)));

    async update() {
        if (GameManager.getInstance().isLocked()) return;

        if (this.timer > 100) {
            for (let _ = 0; _ < 10; _++)
                if (Math.random() > 0.5) {
                    const pos = new Vector3(
                        -20,
                        Math.random() * Data.startTextBackgroundRange -
                            Data.startTextBackgroundRange / 2,
                        0
                    );
                    pos.z = 0;
                    const star = await Star(
                        pos,
                        new Vector3(
                            getRandomElement([1, 2, 2, 3, 3, 3, 3, 3]),
                            0,
                            0
                        ),
                        getRandomElement(this.COLORS),
                        false
                    );
                    await this.gameObject.addChildren(star);
                }
            this.timer = 0;
        } else this.timer += Renderer.deltaTime;
    }
}
