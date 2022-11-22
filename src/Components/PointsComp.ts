import UiComponent from "3d-game-engine-canvas/src/classes/Components/UiComponent";
import Renderer from "3d-game-engine-canvas/src/classes/Renderer";
import Text from "3d-game-engine-canvas/src/components/Text";
import GameManager from "./GameManager";

export class PointsComp extends UiComponent {
    private text: Text;
    private lastText: Text;

    private timer: number = 0;
    public delay: number = 1000;

    private _points: number = 0;
    private set points(value: number) {
        this._points = value;
        this.text.text = "" + this.points;
    }
    public get points(): number {
        return this._points;
    }

    constructor(text: Text, lastText: Text) {
        super();
        this.lastText = lastText;
        this.text = text;
        this.reset();
    }

    reset() {
        this.points = 0;
        this.resetLast();
    }

    add(p: number) {
        this.points += p;
        this.lastText.text = "" + p;
        this.timer = this.delay;
    }

    addSilent(p: number) {
        this.points += p;
    }

    private resetLast() {
        this.lastText.text = "";
    }

    async update() {
        if (GameManager.getInstance().isLocked()) return;
        if (this.timer <= 0) {
            this.resetLast();
        } else {
            this.timer -= Renderer.deltaTime;
        }
    }
}
