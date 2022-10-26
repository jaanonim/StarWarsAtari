import Vector2 from "3d-game-engine-canvas/src/utilities/math/Vector2";
import Box2D from "3d-game-engine-canvas/src/utilities/math/Box2D";
import Transform from "3d-game-engine-canvas/src/utilities/Transform";
import Input from "../classes/Input";
import { map } from "3d-game-engine-canvas/src/utilities/math/Math";
import UiComponent from "3d-game-engine-canvas/src/classes/Components/UiComponent";
import Renderer from "3d-game-engine-canvas/src/classes/Renderer";
import ScreenRaycast from "3d-game-engine-canvas/src/tools/Raycasts/ScreenRaycast";
import Camera from "3d-game-engine-canvas/src/components/Camera";
import { Hittable } from "./Hitable";

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
        super.start();
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
        const pos = this.box.clamp(Input.getPos().roundToInt());

        const x = map(pos.x, this.box.a.x, this.box.b.x, -30, 30);
        const y = map(pos.y, this.box.a.y, this.box.b.y, -30, 30);

        const ctx = this.uiElement.canvas.ctx;
        ctx.strokeStyle = "red";
        ctx.lineWidth = 3;

        if (this.shoot != null) {
            if (this.cooldown > 100) {
                this.shoot = null;
            } else {
                ctx.beginPath();

                if (this.side) {
                    ctx.moveTo(x + 90, y + 305);
                    ctx.lineTo(this.shoot.x, this.shoot.y);
                    ctx.moveTo(x + 90, y + 640);
                    ctx.lineTo(this.shoot.x, this.shoot.y);
                } else {
                    ctx.moveTo(x + 1250, y + 305);
                    ctx.lineTo(this.shoot.x, this.shoot.y);
                    ctx.moveTo(x + 1250, y + 640);
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
        if (this.shoot === null) throw new Error("shoot is null");
        const col = this.raycast.getCollisions(this.shoot);
        if (col.length > 0) {
            col[0].meshRenderer.gameObject
                .getComponent<Hittable>(Hittable)
                ?.destroy();
        }
    }
}
