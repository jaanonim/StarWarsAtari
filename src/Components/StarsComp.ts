import Component from "3d-game-engine-canvas/src/classes/Components/Component";
import Renderer from "3d-game-engine-canvas/src/classes/Renderer";
import Color from "3d-game-engine-canvas/src/utilities/math/Color";
import Vector3 from "3d-game-engine-canvas/src/utilities/math/Vector3";

import Star from "../GameObjects/Star";
export class StarsComp extends Component {
    private timer: number = 0;
    private revers: boolean;
    private cooldown: number;
    private count: number;
    private chance: number;

    constructor(
        revers: boolean,
        cooldown: number = 200,
        count: number = 3,
        chance: number = 0.5
    ) {
        super();
        this.revers = revers;
        this.cooldown = cooldown;
        this.count = count;
        this.chance = chance;
    }

    async update() {
        if (this.timer > this.cooldown) {
            for (let _ = 0; _ < this.count; _++)
                if (Math.random() < this.chance) {
                    let pos = Vector3.random.subtract(Vector3.one.divide(2));
                    pos.z = 0;
                    pos = pos.normalize();
                    const star = await Star(pos, pos, Color.white, this.revers);
                    this.gameObject.addChildren(star);
                }
            this.timer = 0;
        } else this.timer += Renderer.deltaTime;
    }
}
