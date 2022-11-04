import Component from "3d-game-engine-canvas/src/classes/Components/Component";
import GameManager from "./GameManager";
import { HittableInterface } from "./Hittable";
import Stage5Comp from "./Stages/Stage5Comp";

export class TargetComp extends Component implements HittableInterface {
    async onDestroy() {
        this.hit = () => {};
    }

    hit() {
        const c =
            GameManager.getInstance().currentStage.getComponent<Stage5Comp>(
                Stage5Comp
            );
        if (!c) throw Error();
        c.onTargetDestroy();
        this.destroy();
    }
}
