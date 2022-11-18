import Component from "3d-game-engine-canvas/src/classes/Components/Component";
import WaveSystem from "../Classes/WaveSystem";
import { HittableInterface } from "./Hittable";
import Stage4Comp from "./Stages/Stage4Comp";
import Stage5Comp from "./Stages/Stage5Comp";

export class WallBunkerComp extends Component implements HittableInterface {
    hit() {
        const c =
            WaveSystem.getInstance().currentStage.getComponent<Stage5Comp>(
                Stage5Comp
            ) ||
            WaveSystem.getInstance().currentStage.getComponent<Stage4Comp>(
                Stage4Comp
            );
        if (!c) throw Error();
        c.onWallBunkerDestroy();
        this.gameObject.destroy();
    }
}
