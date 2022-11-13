import GameObject from "3d-game-engine-canvas/src/classes/GameObject";
import Data from "../../Classes/Data";
import GameManager from "../GameManager";
import Stage from "./Stage";
export default class Stage3Comp extends Stage {
    private camGameObject!: GameObject;

    onTowerDestroy() {
        GameManager.getInstance().points.add(200);
    }

    async start() {
        this.camGameObject = this.gameObject.getScene().find("camera");
    }

    async update() {
        if (
            this.camGameObject.transform.position.z >=
            Data.stage3.length + Data.stage3.margin
        )
            GameManager.getInstance().loadNextStage();
    }

    async onUnload() {
        this.gameObject.destroy();
    }
}
