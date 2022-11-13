import GameObject from "3d-game-engine-canvas/src/classes/GameObject";
import Renderer from "3d-game-engine-canvas/src/classes/Renderer";
import Vector3 from "3d-game-engine-canvas/src/utilities/math/Vector3";
import Data from "../../Classes/Data";
import TieFighter from "../../GameObjects/TieFighter";
import GameManager from "../GameManager";
import Stage from "./Stage";

export default class Stage1Comp extends Stage {
    player!: GameObject;
    tieCount: number = 5;
    timer: number = 0;

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
        this.timer = 0;
    }

    async update() {
        if (GameManager.getInstance().isLocked()) return;
        if (this.timer >= Data.stage1.time) {
            this.timer = 0;
            GameManager.getInstance().loadNextStage();
        } else this.timer += Renderer.deltaTime;
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

    async onUnload() {
        this.gameObject.destroy();
    }
}
