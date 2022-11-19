import UiComponent from "3d-game-engine-canvas/src/classes/Components/UiComponent";
import Renderer from "3d-game-engine-canvas/src/classes/Renderer";
import Text from "3d-game-engine-canvas/src/components/Text";

export default class FinishTextComp extends UiComponent {
    private texts: Array<Text>;
    public values: Array<string> = [];
    private index = 0;
    public onAnimEnds: (() => void) | null = null;
    public cooldown = 3000;
    private timer: number = 0;
    private isCalled = false;

    constructor(texts: Array<Text>) {
        super();
        this.texts = texts;
    }

    async start(): Promise<void> {
        super.start();
        this.timer = this.cooldown;
    }

    async update(): Promise<void> {
        if (this.onAnimEnds !== null && !this.isCalled) {
            if (this.cooldown < this.timer) {
                this.texts[this.index].text = this.values[this.index];
                this.index++;
                if (this.index >= this.texts.length) {
                    this.onAnimEnds();
                    this.isCalled = true;
                }
                this.timer = 0;
            }
            this.timer += Renderer.deltaTime;
        }
    }
}
