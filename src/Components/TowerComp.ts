import Component from "3d-game-engine-canvas/src/classes/Components/Component";
import GameObject from "3d-game-engine-canvas/src/classes/GameObject";
import Renderer from "3d-game-engine-canvas/src/classes/Renderer";
import Camera from "3d-game-engine-canvas/src/components/Camera";
import MeshRenderer from "3d-game-engine-canvas/src/components/MeshRenderer";
import GameManager from "./GameManager";
import { HittableInterface } from "./Hittable";
import Stage3Comp from "./Stages/Stage3Comp";

export class TowerComp extends Component implements HittableInterface {
    private camGameObject!: GameObject;
    private cooldown: number = 0;
    private ms!: MeshRenderer;
    private hasShoot: boolean = false;

    public fireCooldown: number = 1000;
    public maxDistance: number = 255;
    public minDistance: number = 25;

    async start() {
        this.camGameObject = this.gameObject.getScene().find("camera");
        const ms = this.gameObject.getComponent<MeshRenderer>(MeshRenderer);
        if (!ms) throw Error();
        this.ms = ms;
        this.hasShoot = false;
        this.cooldown = this.fireCooldown + 1;
    }

    async update() {
        if (!this.hasShoot) {
            const dist = this.transform.position
                .subtract(this.camGameObject.transform.position)
                .squareLength();
            if (dist > this.minDistance && dist < this.maxDistance) {
                const cam = this.camGameObject.getComponent<Camera>(Camera);
                if (!cam) throw Error("No camera");
                if (this.ms.isOnCamera(cam)) {
                    if (this.cooldown > this.fireCooldown) {
                        if (Math.random() > 0.75)
                            this.hasShoot =
                                await GameManager.getInstance().fireScreenFireball(
                                    this.transform.globalPosition
                                );
                        this.cooldown = 0;
                    }
                    this.cooldown += Renderer.deltaTime;
                }
            }
        }
    }

    hit() {
        const c =
            GameManager.getInstance().currentStage.getComponent<Stage3Comp>(
                Stage3Comp
            );
        if (!c) throw Error();
        c.onTowerDestroy();
        this.gameObject.destroy();
    }
}
