import Component from "3d-game-engine-canvas/src/classes/Components/Component";
import GameObject from "3d-game-engine-canvas/src/classes/GameObject";
import Renderer from "3d-game-engine-canvas/src/classes/Renderer";
import Vector3 from "3d-game-engine-canvas/src/utilities/math/Vector3";
import Quaternion from "3d-game-engine-canvas/src/utilities/Quaternion";
import GameManager from "./GameManager";
import { HittableInterface } from "./Hittable";

export class FireballWordComp extends Component implements HittableInterface {
    v: number;
    private camGameObject!: GameObject;

    async start() {
        this.camGameObject = this.gameObject.getScene().find("camera");
    }

    constructor() {
        super();
        this.v = 0;
    }

    async update() {
        if (GameManager.getInstance().isLocked()) return;

        this.gameObject.transform.rotation = Quaternion.euler(
            new Vector3(0, 0, -0.007).multiply(this.v)
        );
        this.v += Renderer.deltaTime;
        if (
            this.camGameObject.transform.position.z >
            this.gameObject.transform.position.z + 1
        ) {
            this.gameObject.destroy();
        }
    }

    hit() {
        GameManager.getInstance().points.add(33);
        this.gameObject.destroy();
    }
}
