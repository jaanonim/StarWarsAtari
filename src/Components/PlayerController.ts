import Component from "3d-game-engine-canvas/src/classes/Components/Component";
import Renderer from "3d-game-engine-canvas/src/classes/Renderer";
import Box from "3d-game-engine-canvas/src/utilities/math/Box";
import { sigmoid } from "3d-game-engine-canvas/src/utilities/math/Math";
import Vector2 from "3d-game-engine-canvas/src/utilities/math/Vector2";
import Vector3 from "3d-game-engine-canvas/src/utilities/math/Vector3";
import Quaternion from "3d-game-engine-canvas/src/utilities/math/Quaternion";
import Data from "../Classes/Data";
import Input from "../Classes/Input";
import GameManager from "./GameManager";

export enum PlayerControllerMode {
    POSITION,
    ROTATION,
    RESET_ROTATION,
}

export class PlayerController extends Component {
    movementSpeed: number = Data.player.movementSpeed;
    controlsSmoothens: number = 100;
    controlRotationSpeed: number = 0.0002;
    controlMovementSpeed: number = 0.5;

    maxPos: Box = new Box(new Vector3(-20, -3, 0), new Vector3(20, 1, 100));
    onResetEnds: (() => void) | null = null;

    mode: PlayerControllerMode = PlayerControllerMode.POSITION;

    async update() {
        if (GameManager.getInstance().isLocked()) return;
        if (this.mode === PlayerControllerMode.RESET_ROTATION) {
            const target = Quaternion.euler(Vector3.zero);
            if (this.onResetEnds === null) return;
            if (this.transform.rotation.angleTo(target) < 0.009) {
                this.onResetEnds();
                this.onResetEnds = null;
            } else
                this.transform.rotation = this.transform.rotation.slerp(
                    target,
                    0.1
                );
            return;
        }

        let move = Input.getPos().subtract(Input.getCenter());
        move = new Vector2(
            sigmoid(move.x / this.controlsSmoothens),
            sigmoid(move.y / this.controlsSmoothens)
        );
        move = move.multiply(Renderer.deltaTime * this.controlRotationSpeed);
        if (this.mode === PlayerControllerMode.ROTATION) {
            this.transform.rotation = this.transform.rotation.multiply(
                Quaternion.euler(new Vector3(move.y, move.x, 0))
            ) as Quaternion;
        } else {
            const pos = this.transform.position
                .add(
                    new Vector3(move.x, -move.y, 0).multiply(
                        Renderer.deltaTime * this.controlMovementSpeed
                    )
                )
                .add(
                    this.transform.rotation.multiply(
                        Vector3.forward.multiply(
                            Renderer.deltaTime * this.movementSpeed
                        )
                    ) as Vector3
                );

            this.transform.position = this.maxPos.clamp(pos);
        }
    }
}
