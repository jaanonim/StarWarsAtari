import Component from "3d-game-engine-canvas/src/classes/Components/Component";
import GameObject from "3d-game-engine-canvas/src/classes/GameObject";
import Material from "3d-game-engine-canvas/src/classes/Materials/Material";
import Renderer from "3d-game-engine-canvas/src/classes/Renderer";
import Camera from "3d-game-engine-canvas/src/components/Camera";
import MeshRenderer from "3d-game-engine-canvas/src/components/MeshRenderer";
import Color from "3d-game-engine-canvas/src/utilities/math/Color";
import Vector3 from "3d-game-engine-canvas/src/utilities/math/Vector3";
import Quaternion from "3d-game-engine-canvas/src/utilities/Quaternion";
import WaveSystem from "../Classes/WaveSystem";
import GameManager from "./GameManager";
import { HittableInterface } from "./Hittable";
import { RandomMovementComp } from "./RandomMovementComp";
import Stage1Comp from "./Stages/Stage1Comp";

export default class TieComp extends Component implements HittableInterface {
    private camGameObject!: GameObject;
    private target: Vector3 | null = null;
    private isVader: boolean;
    private cooldown: number = 0;
    private ms!: MeshRenderer;
    private stage!: Stage1Comp;

    public fireCooldown: number;

    public normalColor = Color.blue;
    public dmgColor = Color.white;
    public isDamage = false;
    public animDuration = 200;

    private elements: Array<RandomMovementComp>;

    constructor(isVader: boolean, elements: Array<RandomMovementComp>) {
        super();
        this.isVader = isVader;
        this.elements = elements;
        this.fireCooldown = WaveSystem.getInstance().stageData.fireCooldown;
    }

    async start() {
        this.camGameObject = this.gameObject.getScene().find("camera");

        const ms = this.gameObject
            .find("body")
            .getComponent<MeshRenderer>(MeshRenderer);
        if (!ms) throw Error();
        this.ms = ms;

        this.stage =
            WaveSystem.getInstance().currentStage.getComponentError<Stage1Comp>(
                Stage1Comp
            );
    }

    async update(): Promise<void> {
        if (GameManager.getInstance().isLocked()) return;
        if (!this.camGameObject) return;

        if (this.stage.inTransition) {
            const cam = this.camGameObject.getComponent<Camera>(Camera);
            if (!cam) throw Error("No camera");
            if (!this.ms.isOnCamera(cam)) this.gameObject.destroy();
        }

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
                this.target.subtract(this.transform.position).squareLength() <
                    1 &&
                !this.isDamage
            )
                this.target = null;
            else {
                if (this.stage.inTransition) {
                    this.target = this.transform.position.add(Vector3.forward);
                }
                this.transform.position = this.transform.position.add(
                    this.target
                        .subtract(this.transform.position)
                        .normalize()
                        .multiply(Renderer.deltaTime * 0.01)
                );
            }
        }
        if (!this.isDamage && !this.stage.inTransition) {
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
            } else this.cooldown = this.fireCooldown - 1000;
        }
    }

    hit(): void {
        if (this.isDamage || this.stage.inTransition) return;
        this.isDamage = true;
        if (!this.isVader) {
            this.elements.forEach((e) => (e.isEnabled = true));
            setTimeout(() => this.gameObject.destroy(), 1000);
        } else {
            const children = this.gameObject.getChildren();
            const mats: Array<Material> = [];
            for (let i = 0; i < children.length; i++) {
                const comp =
                    children[i].getComponent<MeshRenderer>(MeshRenderer);
                if (comp) {
                    mats.push(comp.material);
                    comp.material.color = this.dmgColor;
                }
            }
            setTimeout(() => {
                mats.forEach((m) => (m.color = this.normalColor));
                this.isDamage = false;
            }, this.animDuration);
        }

        this.stage.onTieDestroy(this.isVader);
    }
}
