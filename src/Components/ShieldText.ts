import UiComponent from "3d-game-engine-canvas/src/classes/Components/UiComponent";
import Color from "3d-game-engine-canvas/src/utilities/math/Color";
import Data from "../Classes/Data";

export default class ShieldText extends UiComponent {
    private _text: string = "SHIELD";
    public get text(): string {
        return this._text;
    }
    public set text(value: string) {
        this._text = value;
        this.colors = Array(this.text.length).fill(this.defaultColor);
    }
    public fontSize = 10;
    public font = "pixeled";

    public defaultColor: Color = Data.UI.mainColor;
    public animColor: Color = Data.UI.accentColor;

    public colors: Array<Color> = Array(this.text.length).fill(
        this.defaultColor
    );

    constructor() {
        super();
    }

    reset() {
        this.text = "SHIELD";
        this.defaultColor = Data.UI.mainColor;
        this.animColor = Data.UI.accentColor;
        this.colors = Array(this.text.length).fill(this.defaultColor);
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
        x += 6;
        for (let i = 0; i < this.text.length; i++) {
            const char = this.text.charAt(i);
            ctx.fillStyle = this.colors[i].getStringRGBA();
            ctx.fillText(char, x, y);
            if (char === "S") x += 1;
            if (char === "I") x -= 1;
            x += 10;
        }
    }
}
