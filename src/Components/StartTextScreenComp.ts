import Component from "3d-game-engine-canvas/src/classes/Components/Component";
import Renderer from "3d-game-engine-canvas/src/classes/Renderer";
import Input from "../Classes/Input";
import WaveSystem from "../Classes/WaveSystem";
import GameManager from "./GameManager";

export default class StartTextScreenComp extends Component {
    private timer: number = 0;

    constructor() {
        super();
    }

    async start(): Promise<void> {
        super.start();
        this.timer = 0;
    }

    async update(): Promise<void> {
        if (GameManager.getInstance().isLocked()) return;
        if (this.timer) {
        }
        if (Input.getFire()) WaveSystem.getInstance().loadNextStage();
        this.timer += Renderer.deltaTime;
    }
}
