import Component from "3d-game-engine-canvas/src/classes/Components/Component";
import Renderer from "3d-game-engine-canvas/src/classes/Renderer";
import Camera from "3d-game-engine-canvas/src/components/Camera";
import MeshRenderer from "3d-game-engine-canvas/src/components/MeshRenderer";
import Vector3 from "3d-game-engine-canvas/src/utilities/math/Vector3";

export class StarComp extends Component {
    private dir: Vector3;
    public speed: number = 0.01;

    private ms!: MeshRenderer;
    private cam!: Camera;

    constructor(v: Vector3) {
        super();
        this.dir = v;
    }

    async start(): Promise<void> {
        this.cam = this.gameObject
            .getScene()
            .find("camera")
            .getComponentError<Camera>(Camera);
        this.ms = this.gameObject.getComponentError<MeshRenderer>(MeshRenderer);
    }

    async update() {
        this.transform.position = this.transform.position.add(
            this.dir.multiply(Renderer.deltaTime * this.speed)
        );

        if (!this.ms.isOnCamera(this.cam)) {
            this.gameObject.destroy();
        }
    }
}
