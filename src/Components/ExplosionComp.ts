import UiComponent from "3d-game-engine-canvas/src/classes/Components/UiComponent";
import Renderer from "3d-game-engine-canvas/src/classes/Renderer";
import Color from "3d-game-engine-canvas/src/utilities/math/Color";
import { getRandomElement } from "3d-game-engine-canvas/src/utilities/math/Math";
import GameManager from "./GameManager";

export class ExplosionComp extends UiComponent {
    private timer: number = 0;
    private color: Color = Color.white;
    public onAnimEnds: (() => void) | null = null;

    constructor() {
        super();
    }

    uiRender() {
        if (GameManager.getInstance().isLocked() || this.onAnimEnds === null)
            return;
        const width = this.uiElement.canvas.width;
        const height = this.uiElement.canvas.height;
        const timer = Math.round(this.timer);
        const distanceBetween = 7;
        const startSize = 7;
        const maxCount = 15;
        this.uiElement.canvas.ctx.clearRect(0, 0, width, height);
        if (timer % 2 == 0) {
            const COLORS = [
                Color.white,
                Color.white,
                Color.white,
                Color.blue,
                Color.green,
                Color.yellow,
                Color.cyan,
                Color.red,
                Color.magenta,
            ];
            this.color = getRandomElement(COLORS);
        }

        for (let i = 0; i < Math.min(timer / distanceBetween, maxCount); i++) {
            const radius = timer - i * distanceBetween + startSize;
            if (radius > 170) continue;
            this.uiElement.canvas.ctx.strokeStyle = this.color.getHex();
            this.uiElement.canvas.ctx.beginPath();
            this.uiElement.canvas.ctx.arc(
                width / 2,
                height / 2,
                radius,
                0,
                2 * Math.PI
            );
            this.uiElement.canvas.ctx.stroke();
        }
        console.log(this.timer);
        if (this.timer > 300) {
            this.timer = 0;
            this.onAnimEnds();
            this.onAnimEnds = null;
        }

        this.timer += Renderer.deltaTime / 30;
    }
}
