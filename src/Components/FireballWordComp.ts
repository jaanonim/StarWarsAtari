import Component from "3d-game-engine-canvas/src/classes/Components/Component";
import GameManager from "./GameManager";
import { HittableInterface } from "./Hittable";

export class FireballWordComp extends Component implements HittableInterface {
    hit() {
        GameManager.getInstance().points.add(33);
        this.gameObject.destroy();
    }
}
