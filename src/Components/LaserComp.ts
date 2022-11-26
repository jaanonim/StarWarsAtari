import Vector2 from "3d-game-engine-canvas/src/utilities/math/Vector2";
import Box2D from "3d-game-engine-canvas/src/utilities/math/Box2D";
import Transform from "3d-game-engine-canvas/src/utilities/Transform";
import Input from "../Classes/Input";
import { map } from "3d-game-engine-canvas/src/utilities/math/Math";
import UiComponent from "3d-game-engine-canvas/src/classes/Components/UiComponent";
import Renderer from "3d-game-engine-canvas/src/classes/Renderer";
import ScreenRaycast from "3d-game-engine-canvas/src/tools/Raycasts/ScreenRaycast";
import Camera from "3d-game-engine-canvas/src/components/Camera";
import Hittable from "./Hittable";
import UiElement from "3d-game-engine-canvas/src/components/UiElement";
import GameManager from "./GameManager";
import Data from "../Classes/Data";
import WaveSystem from "../Classes/WaveSystem";
import SoundsManager from "../Classes/SoundsManager";

export class LaserComp extends UiComponent {
    box!: Box2D;
    cooldown: number = 0;
    shoot: Vector2 | null = null;
    side: boolean = false;
    raycast!: ScreenRaycast;
    camera: Camera;
    renderer: Renderer;

    constructor(camera: Camera, renderer: Renderer) {
        super();
        this.camera = camera;
        this.renderer = renderer;
    }

    async start() {
        await super.start();
        this.raycast = new ScreenRaycast(this.camera, this.renderer);
        const p = this.gameObject.transform.parent;
        if (!(p instanceof Transform)) throw Error();
        const c = p.gameObject.getSizedComponent();
        if (!c) throw Error();
        const margin = c.size.divide(10);

        this.box = new Box2D(margin, c.size.subtract(margin));
    }

    async update() {
        if (this.cooldown < 400) this.cooldown += Renderer.deltaTime;
    }

    uiRender(): void {
        super.uiRender();
        const pos = this.box.clamp(Input.getScaledPos().roundToInt());
        const x = Math.round(
            map(pos.x, this.box.a.x, this.box.b.x, -Data.moveX, Data.moveX)
        );
        const y = Math.round(
            map(pos.y, this.box.a.y, this.box.b.y, -Data.moveY, Data.moveY)
        );

        const ctx = this.uiElement.canvas.ctx;
        ctx.strokeStyle = "red";
        ctx.lineWidth = 1;

        if (this.shoot != null) {
            if (this.cooldown > 100) {
                this.shoot = null;
            } else {
                ctx.beginPath();

                if (this.side) {
                    ctx.moveTo(x + 20, y + 64);
                    ctx.lineTo(this.shoot.x, this.shoot.y);
                    ctx.moveTo(x + 20, y + 181);
                    ctx.lineTo(this.shoot.x, this.shoot.y);
                } else {
                    ctx.moveTo(x + 316, y + 64);
                    ctx.lineTo(this.shoot.x, this.shoot.y);
                    ctx.moveTo(x + 316, y + 181);
                    ctx.lineTo(this.shoot.x, this.shoot.y);
                }
                ctx.stroke();
            }
        }
        if (this.cooldown >= 400 && Input.getFire()) {
            this.side = !this.side;
            this.shoot = pos;
            this.cooldown = 0;
            this.fire();
        }
    }

    fire() {
        if (
            GameManager.getInstance().isLocked() ||
            WaveSystem.getInstance().inMenu
        )
            return;
        if (this.shoot === null) throw new Error("shoot is null");
        const screen = this.gameObject.getScene().find("screen");
        const fireballs = screen.findMany("FireballScreen");

        let found = false;
        fireballs.forEach((f) => {
            const c = f.getComponent<UiElement>(UiElement);

            if (!c || this.shoot === null) throw Error();

            if (c.contains(this.shoot) && !found) {
                found = true;
                SoundsManager.getInstance()
                    .getSound("sound/fireballDmg.mp3")
                    .then((s) => s.play());
                GameManager.getInstance().points.add(33);
                f.destroy();
            }
        });
        if (found) return;

        const col = this.raycast.getCollisions(
            this.shoot.multiply(1 / Data.scale),
            20
        );
        if (col.length > 0) {
            for (let i = 0; i < col.length; i++) {
                const h =
                    col[i].meshRenderer.gameObject.getComponent<Hittable>(
                        Hittable
                    );
                if (h) {
                    found = true;
                    h.hit();
                    break;
                }
            }
        }
        if (!found) {
            SoundsManager.getInstance()
                .getSound("sound/laser.mp3")
                .then((s) => s.play());
        }
    }
}
