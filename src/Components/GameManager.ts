import Component from "3d-game-engine-canvas/src/classes/Components/Component";
import GameObject from "3d-game-engine-canvas/src/classes/GameObject";
import Renderer from "3d-game-engine-canvas/src/classes/Renderer";
import Camera from "3d-game-engine-canvas/src/components/Camera";
import SphereCollider from "3d-game-engine-canvas/src/components/colliders/SphereCollider";
import Box from "3d-game-engine-canvas/src/utilities/math/Box";
import Box2D from "3d-game-engine-canvas/src/utilities/math/Box2D";
import Vector3 from "3d-game-engine-canvas/src/utilities/math/Vector3";
import Quaternion from "3d-game-engine-canvas/src/utilities/Quaternion";
import Data from "../Classes/Data";
import Input from "../Classes/Input";
import FireballScreen from "../GameObjects/FireballScreen";
import Stage1 from "../GameObjects/Stages/Stage1";
import Stage2 from "../GameObjects/Stages/Stage2";
import Stage3 from "../GameObjects/Stages/Stage3";
import Stage5 from "../GameObjects/Stages/Stage5";
import { DeathScreenComp } from "./DeathScreenComp";
import HintComp from "./HintComp";
import { PlayerController, PlayerControllerMode } from "./PlayerController";
import { PointsComp } from "./PointsComp";
import { ShieldComp } from "./ShieldComp";
import Stage from "./Stages/Stage";
import WaveInfoComp from "./WaveInfoComp";

export interface StageInfo {
    func: (...args: any) => Promise<GameObject>;
    controls: PlayerControllerMode;
    maxPos: Box;
}
export default class GameManager extends Component {
    private static instance: GameManager;
    public renderer!: Renderer;
    public stages: Array<StageInfo>;
    public currentStage!: GameObject;
    public currentStageId: number;
    public isIndestructible: boolean = false;
    private collider!: SphereCollider;
    private shield!: ShieldComp;
    public points!: PointsComp;
    public hint!: HintComp;
    public waveInfo!: WaveInfoComp;
    private deathScreen!: DeathScreenComp;
    private _lock: boolean;

    private constructor() {
        super();
        this._lock = false;
        this.currentStageId = 0;
        this.stages = [
            {
                func: Stage1,
                controls: PlayerControllerMode.ROTATION,
                maxPos: new Box(Vector3.zero, Vector3.zero),
            },
            {
                func: Stage2,
                controls: PlayerControllerMode.POSITION,
                maxPos: new Box(
                    new Vector3(-20, -1, 0),
                    new Vector3(20, 0.5, 100)
                ),
            },
            {
                func: Stage3,
                controls: PlayerControllerMode.POSITION,
                maxPos: new Box(
                    new Vector3(-20, -3, 0),
                    new Vector3(20, 0.5, 100)
                ),
            },
            {
                func: Stage5,
                controls: PlayerControllerMode.POSITION,
                maxPos: new Box(
                    new Vector3(-1.1, 0, -100),
                    new Vector3(1.1, 3.5, 160)
                ),
            },
        ];
        this.unlock();
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

        this.currentStageId = 1;
        this.loadStage();
    }

    setRenderer(r: Renderer) {
        this.renderer = r;
    }

    hit() {
        if (this.isIndestructible) return;
        this.isIndestructible = true;
        setTimeout(() => {
            this.isIndestructible = false;
        }, 1500);
        this.shield.takeDamage();
        if (this.shield.shield <= 0) {
            this.lock();
            this.deathScreen.show();
        }
    }

    lock() {
        this._lock = true;
        Input.lock();
    }

    unlock() {
        this._lock = false;
        Input.unlock();
    }

    isLocked() {
        return this._lock;
    }

    async fireScreenFireball(v: Vector3) {
        const cam = this.gameObject.getComponent<Camera>(Camera);
        if (!cam) throw Error("No camera");
        const screen = this.gameObject.getScene().find("screen");

        const c = screen.getSizedComponent();
        if (!c) throw Error();
        const margin = c.size.divide(10);
        const box = new Box2D(margin, c.size.subtract(margin));

        const pos = cam
            .worldToScreenPoint(v, this.renderer)
            .multiply(Data.scale);
        if (box.contains(pos)) {
            const fb = await FireballScreen(
                v.subtract(this.transform.globalPosition).squareLength()
            );
            fb.transform.position = pos.toVector3();
            screen.addChildren(fb);
            return true;
        }
        return false;
    }

    async update() {
        if (!this.shield) {
            try {
                this.shield = this.gameObject
                    .getScene()
                    .find("screen")
                    .find("Shield")
                    .getComponentError<ShieldComp>(ShieldComp);
            } catch (e) {}
        }
        if (!this.points) {
            try {
                this.points = this.gameObject
                    .getScene()
                    .find("screen")
                    .find("Points")
                    .getComponentError<PointsComp>(PointsComp);
            } catch (e) {}
        }
        if (!this.deathScreen) {
            try {
                this.deathScreen = this.gameObject
                    .getScene()
                    .find("screen")
                    .find("DeathScreen")
                    .getComponentError<DeathScreenComp>(DeathScreenComp);
            } catch (e) {}
        }
        if (!this.waveInfo) {
            try {
                this.waveInfo = this.gameObject
                    .getScene()
                    .find("screen")
                    .find("WaveInfo")
                    .getComponentError<WaveInfoComp>(WaveInfoComp);
            } catch (e) {}
        }
        if (!this.hint) {
            try {
                this.hint = this.gameObject
                    .getScene()
                    .find("screen")
                    .find("Hint")
                    .getComponentError<HintComp>(HintComp);
            } catch (e) {}
        }

        const cols = this.collider.getCollisions();
        if (cols.length > 0) {
            cols.forEach((c) => {
                if (c.gameObject.name === "FireballWord")
                    c.gameObject.destroy();
                else c.destroy();
            });
            this.hit();
        }
    }

    destroyAllFireballs() {
        const cam = this.gameObject.getComponent<Camera>(Camera);
        if (!cam) throw Error("No camera");
        const screen = this.gameObject.getScene().find("screen");
        screen.findMany("FireballScreen").forEach((f) => {
            f.destroy();
        });
    }

    async loadNextStage() {
        Input.lock();
        await this.resetBeforeLoad();
        const c = this.currentStage.getComponent<Stage>(Stage);
        if (!c) throw Error();
        await c.onUnload();
        this.currentStageId++;
        this.loadStage();
        Input.unlock();
    }

    async resetBeforeLoad() {
        this.transform.position = Vector3.zero;
        this.transform.rotation = Quaternion.euler(Vector3.zero);
        this.destroyAllFireballs();
        this.hint.resetHint();
        this.waveInfo.resetInfo();
    }

    async loadStage() {
        const stage = this.stages[this.currentStageId];
        const pc =
            this.gameObject.getComponent<PlayerController>(PlayerController);
        if (!pc) throw Error();
        pc.mode = stage.controls;
        pc.maxPos = stage.maxPos;

        this.currentStage = this.gameObject
            .getScene()
            .addChildren(await stage.func());
    }

    setWin() {}
}
