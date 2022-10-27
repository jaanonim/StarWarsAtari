import Component from "3d-game-engine-canvas/src/classes/Components/Component";
import Renderer from "3d-game-engine-canvas/src/classes/Renderer";
import { sigmoid } from "3d-game-engine-canvas/src/utilities/math/Math";
import Vector2 from "3d-game-engine-canvas/src/utilities/math/Vector2";
import Vector3 from "3d-game-engine-canvas/src/utilities/math/Vector3";
import Quaternion from "3d-game-engine-canvas/src/utilities/Quaternion";
import Input from "../Classes/Input";

export enum Mode {
    POSITION,
    ROTATION,
}

export class PlayerController extends Component {
    movementSpeed: number = 0.002;
    controlsSmoothens: number = 100;
    controlRotationSpeed: number = 0.0002;
    controlMovementSpeed: number = 0.5;

    private mode: Mode = Mode.ROTATION;

    async start() {}

    async update() {
        this.transform.position = this.transform.position.add(
            this.transform.rotation.multiply(
                Vector3.forward.multiply(
                    Renderer.deltaTime * this.movementSpeed
                )
            ) as Vector3
        );
        let move = Input.getPos().subtract(Input.getCenter());
        move = new Vector2(
            sigmoid(move.x / this.controlsSmoothens),
            sigmoid(move.y / this.controlsSmoothens)
        );
        move = move.multiply(Renderer.deltaTime * this.controlRotationSpeed);
        if (this.mode === Mode.ROTATION) {
            this.transform.rotation = this.transform.rotation.multiply(
                Quaternion.euler(new Vector3(move.y, move.x, 0))
            ) as Quaternion;
        } else {
            this.transform.position = this.transform.position.add(
                new Vector3(move.x, -move.y, 0).multiply(
                    Renderer.deltaTime * this.controlMovementSpeed
                )
            );
        }
    }
}
