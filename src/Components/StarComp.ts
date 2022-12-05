import Component from "3d-game-engine-canvas/src/classes/Components/Component";
import Renderer from "3d-game-engine-canvas/src/classes/Renderer";
import Camera from "3d-game-engine-canvas/src/components/Camera";
import MeshRenderer from "3d-game-engine-canvas/src/components/MeshRenderer";
import Vector3 from "3d-game-engine-canvas/src/utilities/math/Vector3";
import GameManager from "./GameManager";

export class StarComp extends Component {
    private dir: Vector3;
    public speed: number = 0.01;

    private ms!: MeshRenderer;
    private cam!: Camera;
    private revers: boolean;

    constructor(v: Vector3, revers: boolean) {
        super();
        this.dir = v;
        this.revers = revers;
    }

    async start(): Promise<void> {
        let cam;
        try {
            cam = this.gameObject
                .getScene()
                .find("camera")
                .getComponent<Camera>(Camera);
        } catch (e) {}
        if (!cam) {
            this.gameObject.destroy();
            return;
        }
        this.cam = cam;
        this.ms = this.gameObject.getComponentError<MeshRenderer>(MeshRenderer);
        if (this.revers)
            while (this.ms.isOnCamera(this.cam)) {
                this.transform.position = this.transform.position.add(
                    this.dir.multiply(Renderer.deltaTime * this.speed * 10)
                );
            }
    }

    async update() {
        if (GameManager.getInstance().isLocked()) return;
        if (this.revers) {
            this.transform.position = this.transform.position.add(
                this.dir.invert().multiply(Renderer.deltaTime * this.speed)
            );

            const v = this.transform.position;
            v.z = 0;
            if (Vector3.zero.subtract(v).squareLength() < 2) {
                this.gameObject.destroy();
            }
        } else {
            this.transform.position = this.transform.position.add(
                this.dir.multiply(Renderer.deltaTime * this.speed)
            );

            if (!this.ms.isOnCamera(this.cam)) {
                this.gameObject.destroy();
            }
        }
    }
}
