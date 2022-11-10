import UiComponent from "3d-game-engine-canvas/src/classes/Components/UiComponent";
import Renderer from "3d-game-engine-canvas/src/classes/Renderer";
import Vector2 from "3d-game-engine-canvas/src/utilities/math/Vector2";
import GameManager from "./GameManager";

export class FireballScreenComp extends UiComponent {
    public rotationSpeed: number = 0.1;
    public speed: number = 0.05;
    public maxSize: number = 200;

    async update() {
        if (GameManager.getInstance().isLocked()) return;

        if (this.uiElement.size.x > this.maxSize) {
            GameManager.getInstance().hit();
            this.gameObject.destroy();
        }
        this.uiElement.rotation += this.rotationSpeed * Renderer.deltaTime;
        this.uiElement.size = this.uiElement.size.add(
            Vector2.one.multiply(Renderer.deltaTime * this.speed)
        );
    }
}
