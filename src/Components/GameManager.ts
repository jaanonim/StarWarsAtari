import Component from "3d-game-engine-canvas/src/classes/Components/Component";
import GameObject from "3d-game-engine-canvas/src/classes/GameObject";
import Renderer from "3d-game-engine-canvas/src/classes/Renderer";
import SphereCollider from "3d-game-engine-canvas/src/components/colliders/SphereCollider";
import Stage1 from "../GameObjects/Stages/Stage1";
import Stage3 from "../GameObjects/Stages/Stage3";
import Stage5 from "../GameObjects/Stages/Stage5";
import { PlayerController, PlayerControllerMode } from "./PlayerController";

export default class GameManager extends Component {
    private static instance: GameManager;
    public renderer!: Renderer;
    public stages: Array<{
        func: (...args: any) => Promise<GameObject>;
        controls: PlayerControllerMode;
    }>;
    public currentStage!: GameObject;
    private collider!: SphereCollider;

    private constructor() {
        super();
        this.stages = [
            {
                func: Stage1,
                controls: PlayerControllerMode.ROTATION,
            },
            {
                func: Stage3,
                controls: PlayerControllerMode.POSITION,
            },
            {
                func: Stage5,
                controls: PlayerControllerMode.POSITION,
            },
        ];
    }

    public static getInstance(): GameManager {
        if (!GameManager.instance) {
            GameManager.instance = new GameManager();
        }

        return GameManager.instance;
    }

    async start() {
        super.start();

        const col =
            this.gameObject.getComponent<SphereCollider>(SphereCollider);
        if (!col) throw Error();
        this.collider = col;

        const stage = this.stages[1];

        const pc =
            this.gameObject.getComponent<PlayerController>(PlayerController);
        if (!pc) throw Error();
        pc.mode = stage.controls;
        this.currentStage = this.gameObject
            .getScene()
            .addChildren(await stage.func());
    }

    setRenderer(r: Renderer) {
        this.renderer = r;
    }

    hit() {
        this.warn("ajc");
    }

    async update() {
        const cols = this.collider.getCollisions();
        if (cols.length > 0) {
            cols.forEach((c) => c.destroy());
            this.hit();
        }
    }
}
