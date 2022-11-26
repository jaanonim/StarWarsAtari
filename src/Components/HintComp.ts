import UiComponent from "3d-game-engine-canvas/src/classes/Components/UiComponent";
import Renderer from "3d-game-engine-canvas/src/classes/Renderer";
import Text from "3d-game-engine-canvas/src/components/Text";
import Color from "3d-game-engine-canvas/src/utilities/math/Color";
import GameManager from "./GameManager";

export interface HintData {
    text: string;
    color: Color;
}

export default class HintComp extends UiComponent {
    private text: Text;
    public texts: Array<HintData>;
    private timer: number;
    private time: number = 0;
    private index: number = 0;

    constructor(text: Text) {
        super();
        this.text = text;
        this.texts = [];
        this.timer = 0;
    }

    async start(): Promise<void> {
        await super.start();
        this.resetHint();
    }

    async update() {
        if (GameManager.getInstance().isLocked()) return;

        if (this.texts.length <= 0) {
            this.timer = 0;
        } else {
            if (this.timer > this.time) {
                this.timer = 0;
                this.index++;
                if (this.texts.length <= this.index) this.index = 0;
                this.setHint(this.texts[this.index]);
            }
            this.timer += Renderer.deltaTime;
        }
    }

    setHint(data: HintData) {
        this.text.text = data.text;
        this.text.options.color = data.color;
    }

    setHints(texts: Array<HintData>, time: number) {
        this.texts = texts;
        this.timer = 0;
        this.index = 0;
        this.time = time;
        this.setHint(this.texts[0]);
    }

    resetHint() {
        this.setHint({ text: "", color: Color.white });
        this.timer = 0;
        this.time = 0;
        this.texts = [];
    }
}
