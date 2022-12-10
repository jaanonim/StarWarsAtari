import Component from "3d-game-engine-canvas/src/classes/Components/Component";
import Renderer from "3d-game-engine-canvas/src/classes/Renderer";
import Camera from "3d-game-engine-canvas/src/components/Camera";
import SphereCollider from "3d-game-engine-canvas/src/components/colliders/SphereCollider";
import Box2D from "3d-game-engine-canvas/src/utilities/math/Box2D";
import Vector3 from "3d-game-engine-canvas/src/utilities/math/Vector3";
import Quaternion from "3d-game-engine-canvas/src/utilities/math/Quaternion";
import Data from "../Classes/Data";
import SoundsManager from "../Classes/SoundsManager";
import WaveSystem from "../Classes/WaveSystem";
import FireballScreen from "../GameObjects/FireballScreen";
import { DeathScreenComp } from "./DeathScreenComp";
import HintComp from "./HintComp";
import { PointsComp } from "./PointsComp";
import { ShieldComp } from "./ShieldComp";
import WaveInfoComp from "./WaveInfoComp";
import Settings from "../Settings";

export default class GameManager extends Component {
    private static instance: GameManager;
    public renderer!: Renderer;
    public isIndestructible: boolean = false;
    private collider!: SphereCollider;
    public shield!: ShieldComp;
    public points!: PointsComp;
    public hint!: HintComp;
    public waveInfo!: WaveInfoComp;
    private deathScreen!: DeathScreenComp;
    private flash!: DeathScreenComp;
    private _lock: boolean;
    private hiddenCursor: boolean = false;

    private constructor() {
        super();
        this._lock = false;

        this.unlock();
    }

    public static getInstance(): GameManager {
        if (!GameManager.instance) {
            GameManager.instance = new GameManager();
        }

        return GameManager.instance;
    }

    async start() {
        await super.start();
        const col =
            this.gameObject.getComponent<SphereCollider>(SphereCollider);
        if (!col) throw Error();
        this.collider = col;
        await WaveSystem.getInstance().loadMenu();
    }

    setRenderer(r: Renderer) {
        this.renderer = r;
    }

    hit() {
        SoundsManager.getInstance()
            .getSound("sound/shieldDmg.mp3")
            .then((c) => c.play());
        if (this.isIndestructible) return;
        this.isIndestructible = true;
        setTimeout(() => {
            this.isIndestructible = false;
        }, 1500);
        this.flash.show();
        setTimeout(() => {
            this.flash.hide();
        }, 50);
        if (this.shield.shield <= 0) {
            this.lock();
            this.deathScreen.show();
            this.shield.ded();
        } else {
            this.shield.takeDamage();
        }
    }

    onStartNewGame() {
        this.shield.reset();
        this.points.reset();
    }

    pause() {
        this.lock();
        SoundsManager.getInstance().pause();
        Settings.getInstance().pause();
    }

    unpause() {
        this.unlock();
        SoundsManager.getInstance().unpause();
        Settings.getInstance().unpause();
    }

    switchPause() {
        if (this.isLocked()) {
            this.unpause();
        } else {
            this.pause();
        }
    }

    lock() {
        this._lock = true;
    }

    unlock() {
        this._lock = false;
    }

    isLocked() {
        return this._lock;
    }

    hideCursor() {
        this.hiddenCursor = true;
    }

    showCursor() {
        this.hiddenCursor = false;
    }

    isHiddenCursor() {
        return this.hiddenCursor;
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
        if (!this.flash) {
            try {
                this.flash = this.gameObject
                    .getScene()
                    .find("screen")
                    .find("Flash")
                    .getComponentError<DeathScreenComp>(DeathScreenComp);
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

    async resetBeforeLoad() {
        this.transform.position = Vector3.zero;
        this.transform.rotation = Quaternion.euler(Vector3.zero);
        try {
            this.destroyAllFireballs();
            this.hint.resetHint();
            this.waveInfo.resetInfo();
        } catch (e) {}
    }

    setWin() {
        WaveSystem.getInstance().loadNextStage();
    }
}
