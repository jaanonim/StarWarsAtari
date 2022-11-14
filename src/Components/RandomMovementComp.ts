import Component from "3d-game-engine-canvas/src/classes/Components/Component";
import Renderer from "3d-game-engine-canvas/src/classes/Renderer";
import Vector3 from "3d-game-engine-canvas/src/utilities/math/Vector3";
import Quaternion from "3d-game-engine-canvas/src/utilities/Quaternion";
export class RandomMovementComp extends Component {
    public speed = 0.002;
    public isEnabled = false;

    public direction = Vector3.random
        .subtract(Vector3.one.divide(2))
        .normalize();
    public rotation = Vector3.random
        .subtract(Vector3.one.divide(2))
        .normalize();

    async update() {
        if (this.isEnabled) {
            this.transform.rotation = Quaternion.euler(this.rotation);

            this.transform.position = this.transform.position.add(
                this.direction.multiply(Renderer.deltaTime * this.speed)
            );
        }
    }
}
