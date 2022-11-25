import UiComponent from "3d-game-engine-canvas/src/classes/Components/UiComponent";
import Renderer from "3d-game-engine-canvas/src/classes/Renderer";
import Vector3 from "3d-game-engine-canvas/src/utilities/math/Vector3";
import GameManager from "./GameManager";

export class StartTextScreen4Comp extends UiComponent {
    private speed: number = 0.05;
    private targetPos: Vector3 = new Vector3(0, 0, 0);

    async start(): Promise<void> {
        super.start();
    }

    async update() {
        if (GameManager.getInstance().isLocked()) return;
        const dist = this.transform.position.subtract(this.targetPos).invert();
        if (dist.squareLength() > 1) {
            this.transform.position = this.transform.position.add(
                dist
                    .clamp(Vector3.one.invert(), Vector3.zero)
                    .multiply(Renderer.deltaTime * this.speed)
            );
        }
    }
}
