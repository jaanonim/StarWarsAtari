import Component from "3d-game-engine-canvas/src/classes/Components/Component";
import GameManager from "./GameManager";
import { HittableInterface } from "./Hittable";
import Stage3Comp from "./Stages/Stage3Comp";

export class TowerComp extends Component implements HittableInterface {
    constructor() {
        super();
    }

    hit() {
        const c =
            GameManager.getInstance().currentStage.getComponent<Stage3Comp>(
                Stage3Comp
            );
        if (!c) throw Error();
        c.onTowerDestroy();
        this.gameObject.destroy();
    }
}
