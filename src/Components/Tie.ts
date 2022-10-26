import Component from "3d-game-engine-canvas/src/classes/Components/Component";
import { HittableInterface } from "./Hitable";

export class Tie extends Component implements HittableInterface {
    destroy(): void {
        this.gameObject.destroy();
    }
}
