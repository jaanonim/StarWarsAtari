import Component from "3d-game-engine-canvas/src/classes/Components/Component";
import { HittableInterface } from "./Hittable";

export class FireballWordComp extends Component implements HittableInterface {
    hit() {
        this.gameObject.destroy();
    }
}
