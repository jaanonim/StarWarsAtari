import Component from "3d-game-engine-canvas/src/classes/Components/Component";
import GameObject from "3d-game-engine-canvas/src/classes/GameObject";
import Renderer from "3d-game-engine-canvas/src/classes/Renderer";
import Camera from "3d-game-engine-canvas/src/components/Camera";
import MeshRenderer from "3d-game-engine-canvas/src/components/MeshRenderer";
import Color from "3d-game-engine-canvas/src/utilities/math/Color";
import WaveSystem from "../Classes/WaveSystem";
import Scrap from "../GameObjects/Scrap";
import GameManager from "./GameManager";
import { HittableInterface } from "./Hittable";
import Stage3Comp from "./Stages/Stage3Comp";

export class TowerComp extends Component implements HittableInterface {
    private camGameObject!: GameObject;
    private cooldown: number = 0;
    private ms!: MeshRenderer;
    private hasShoot: boolean = false;
    private isDestroyed = false;

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
        if (GameManager.getInstance().isLocked() || this.isDestroyed) return;

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
        if (this.isDestroyed) return;

        const c =
            WaveSystem.getInstance().currentStage.getComponent<Stage3Comp>(
                Stage3Comp
            );
        if (!c) throw Error();
        c.onTowerDestroy();

        const f = async () => {
            this.isDestroyed = true;
            this.gameObject.getComponentError<MeshRenderer>(
                MeshRenderer
            ).isActive = false;
            this.gameObject.addChildren(await Scrap(Color.yellow));
            setTimeout(() => {
                this.gameObject.destroy();
            }, 1000);
        };
        f();
    }
}
