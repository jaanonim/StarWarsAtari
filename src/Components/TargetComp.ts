import Component from "3d-game-engine-canvas/src/classes/Components/Component";
import WaveSystem from "../Classes/WaveSystem";
import { HittableInterface } from "./Hittable";
import Stage4Comp from "./Stages/Playable/Stage4Comp";
import Stage5Comp from "./Stages/Playable/Stage5Comp";

export class TargetComp extends Component implements HittableInterface {
    async onDestroy() {
        this.hit = () => {};
    }

    hit() {
        const c =
            WaveSystem.getInstance().currentStage.getComponent<Stage5Comp>(
                Stage5Comp
            ) ||
            WaveSystem.getInstance().currentStage.getComponent<Stage4Comp>(
                Stage4Comp
            );
        if (!c) throw Error();
        c.onTargetDestroy();
        this.destroy();
    }
}
