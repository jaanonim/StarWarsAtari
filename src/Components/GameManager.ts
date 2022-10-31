import Component from "3d-game-engine-canvas/src/classes/Components/Component";
import GameObject from "3d-game-engine-canvas/src/classes/GameObject";
import Renderer from "3d-game-engine-canvas/src/classes/Renderer";
import Stage1 from "../GameObjects/Stages/Stage1";

export default class GameManager extends Component {
    private static instance: GameManager;
    public renderer!: Renderer;
    public stages: Array<(...args: any) => Promise<GameObject>>;
    public currentStage!: GameObject;

    private constructor() {
        super();
        this.stages = [Stage1];
    }

    public static getInstance(): GameManager {
        if (!GameManager.instance) {
            GameManager.instance = new GameManager();
        }

        return GameManager.instance;
    }

    async start() {
        this.currentStage = this.gameObject
            .getScene()
            .addChildren(await this.stages[0]());
    }

    setRenderer(r: Renderer) {
        this.renderer = r;
    }

    hit() {
        this.warn("ajc");
    }
}
