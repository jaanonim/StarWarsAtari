import Component from "3d-game-engine-canvas/src/classes/Components/Component";
import GameObject from "3d-game-engine-canvas/src/classes/GameObject";
import Vector3 from "3d-game-engine-canvas/src/utilities/math/Vector3";
import TieFighter from "../../GameObjects/TieFighter";
import GameManager from "../GameManager";

export default class Stage1Comp extends Component {
    player!: GameObject;
    tieCount: number = 5;

    onTieDestroy(isVader: boolean) {
        if (isVader) {
            GameManager.getInstance().points.add(2000);
        } else {
            GameManager.getInstance().points.add(1000);
            this.spawnTie();
        }
    }

    async start() {
        this.player = this.gameObject.getScene().find("camera");
        for (let _ = 0; _ < this.tieCount; _++) {
            this.spawnTie();
        }
    }

    async spawnTie() {
        const tie = await TieFighter();
        tie.transform.position = this.player.transform.position.add(
            this.player.transform.rotation.multiply(
                Vector3.backward.multiply(5)
            )
        );
        this.gameObject.addChildren(tie);
    }
}
