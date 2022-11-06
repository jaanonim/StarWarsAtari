import UiComponent from "3d-game-engine-canvas/src/classes/Components/UiComponent";
import Color from "3d-game-engine-canvas/src/utilities/math/Color";

export default class ShieldText extends UiComponent {
    public text: string = "SHIELD";
    public fontSize = 36;
    public font = "pixeled";

    public defaultColor: Color = Color.white;
    public animColor: Color = Color.red;
    public colors: Array<Color> = Array(this.text.length).fill(
        this.defaultColor
    );

    constructor() {
        super();
    }

    startAnim() {
        this.colors = Array(this.text.length).fill(this.animColor);
        this.animFrame(0);
    }

    animFrame(n: number) {
        setTimeout(() => {
            this.colors[n] = this.defaultColor;
            this.colors[this.colors.length - 1 - n] = this.defaultColor;
            if (n * 2 < this.colors.length) this.animFrame(n + 1);
        }, 200);
    }

    uiRender() {
        super.uiRender();
        const ctx = this.uiElement.canvas.ctx;
        ctx.font = `${this.fontSize}px ${this.font}`;
        ctx.textAlign = "center";
        const textSize = ctx.measureText(this.text).width;

        const y = this.uiElement.realSize.y / 2;
        let x = this.uiElement.realSize.x / 2 - textSize / 2;
        x += 20;
        for (let i = 0; i < this.text.length; i++) {
            const char = this.text.charAt(i);
            ctx.fillStyle = this.colors[i].getStringRGBA();
            ctx.fillText(char, x, y);
            if (char === "S") x += 4;
            if (char === "I") x -= 4;
            x += 36;
        }
    }
}
