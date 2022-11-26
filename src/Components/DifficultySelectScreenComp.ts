import Component from "3d-game-engine-canvas/src/classes/Components/Component";
import Renderer from "3d-game-engine-canvas/src/classes/Renderer";
import Text from "3d-game-engine-canvas/src/components/Text";
import WaveSystem from "../Classes/WaveSystem";
import GameManager from "./GameManager";

export default class DifficultySelectScreenComp extends Component {
    private text: Text;
    private timer: number = 0;
    private get _timer() {
        return Math.floor(this.timer / 1000);
    }

    constructor(text: Text) {
        super();
        this.text = text;
    }

    async start(): Promise<void> {
        await super.start();
        this.timer = 9999;
        this.text.text = "0" + this._timer;
    }

    async update(): Promise<void> {
        if (GameManager.getInstance().isLocked()) return;

        if (this.timer <= 0) {
            await WaveSystem.getInstance().loadTo(2);
        } else {
            this.text.text = "0" + this._timer;
        }
        this.timer -= Renderer.deltaTime;
    }
}
