import Component from "3d-game-engine-canvas/src/classes/Components/Component";
import GameObject from "3d-game-engine-canvas/src/classes/GameObject";
import Renderer from "3d-game-engine-canvas/src/classes/Renderer";
import Camera from "3d-game-engine-canvas/src/components/Camera";
import MeshRenderer from "3d-game-engine-canvas/src/components/MeshRenderer";
import Vector3 from "3d-game-engine-canvas/src/utilities/math/Vector3";
import Quaternion from "3d-game-engine-canvas/src/utilities/Quaternion";
import GameManager from "./GameManager";
import { HittableInterface } from "./Hittable";
import Stage1Comp from "./Stages/Stage1Comp";

export class Tie extends Component implements HittableInterface {
    private camGameObject!: GameObject;
    private target: Vector3 | null = null;
    private isVader: boolean;
    private cooldown: number = 0;
    private ms!: MeshRenderer;

    public fireCooldown: number = 3000;

    constructor(isVader: boolean) {
        super();
        this.isVader = isVader;
    }

    async start() {
        this.camGameObject = this.gameObject.getScene().find("camera");
        const ms = this.gameObject
            .find("body")
            .getComponent<MeshRenderer>(MeshRenderer);
        if (!ms) throw Error();
        this.ms = ms;
    }

    async update(): Promise<void> {
        this.transform.rotation = this.camGameObject.transform.rotation;
        if (this.target === null) {
            this.target = Quaternion.euler(
                Vector3.random
                    .subtract(Vector3.one.multiply(0.5))
                    .multiply(Math.PI * 2)
            )
                .normalize()
                .multiply(Vector3.forward.multiply(20));
        } else {
            if (
                this.target.subtract(this.transform.position).squareLength() < 1
            )
                this.target = null;
            else {
                this.transform.position = this.transform.position.add(
                    this.target
                        .subtract(this.transform.position)
                        .normalize()
                        .multiply(Renderer.deltaTime * 0.01)
                );
            }
        }

        const cam = this.camGameObject.getComponent<Camera>(Camera);
        if (!cam) throw Error("No camera");
        if (this.ms.isOnCamera(cam)) {
            if (this.cooldown > this.fireCooldown) {
                GameManager.getInstance().fireScreenFireball(
                    this.transform.globalPosition
                );
                this.cooldown = 0;
            }
            this.cooldown += Renderer.deltaTime;
        } else this.cooldown = 2000;
    }

    hit(): void {
        if (!this.isVader) this.gameObject.destroy();
        const c =
            GameManager.getInstance().currentStage.getComponent<Stage1Comp>(
                Stage1Comp
            );
        if (!c) throw Error();
        c.onTieDestroy(this.isVader);
    }
}
