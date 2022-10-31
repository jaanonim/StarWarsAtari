import Component from "3d-game-engine-canvas/src/classes/Components/Component";
import GameObject from "3d-game-engine-canvas/src/classes/GameObject";
import Renderer from "3d-game-engine-canvas/src/classes/Renderer";
import Vector3 from "3d-game-engine-canvas/src/utilities/math/Vector3";
import TieFighter from "../GameObjects/TieFighter";

export default class GameManager extends Component {
    private static instance: GameManager;
    private renderer!: Renderer;

    private constructor() {
        super();
    }

    public static getInstance(): GameManager {
        if (!GameManager.instance) {
            GameManager.instance = new GameManager();
        }

        return GameManager.instance;
    }

    setRenderer(r: Renderer) {
        this.renderer = r;
    }

    player!: GameObject;
    tieCount: number = 5;

    onTieDestroy(isVader: boolean) {
        if (isVader) {
            this.log("Vader");
        } else {
            this.log("New tie");
            this.spawnTie();
        }
    }

    async start(): Promise<void> {
        this.player = this.gameObject.getScene().find("camera");
        for (let _ = 0; _ < this.tieCount; _++) {
            this.spawnTie();
        }
    }

    async spawnTie() {
        const tie = await TieFighter(this.renderer);
        tie.transform.position = this.player.transform.position.add(
            this.player.transform.rotation.multiply(
                Vector3.backward.multiply(5)
            )
        );
        this.gameObject.getScene().addChildren(tie);
    }

    hit() {
        this.warn("ajc");
    }

    async update() {}
}
