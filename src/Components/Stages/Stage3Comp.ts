import GameObject from "3d-game-engine-canvas/src/classes/GameObject";
import Data from "../../Classes/Data";
import WaveSystem from "../../Classes/WaveSystem";
import Ground from "../../GameObjects/Ground";
import GameManager from "../GameManager";
import Stage from "./Stage";
export default class Stage3Comp extends Stage {
    private player!: GameObject;
    private ground!: GameObject;
    public numberOfTowers: number = Data.stage3.numberOfTowers;

    onTowerDestroy() {
        GameManager.getInstance().points.add(200);
        this.numberOfTowers--;
        GameManager.getInstance().waveInfo.setInfo(
            "TOWERS",
            "" + this.numberOfTowers
        );
    }

    async start() {
        this.player = this.gameObject.getScene().find("camera");
        GameManager.getInstance().waveInfo.setInfo(
            "TOWERS",
            "" + this.numberOfTowers
        );

        this.ground = await Ground();
        this.player.addChildren(this.ground);
    }

    async update() {
        if (
            this.player.transform.position.z >=
            Data.stage3.length + Data.stage3.margin
        )
            WaveSystem.getInstance().loadNextStage();
    }

    async onUnload() {
        this.player.removeChildren(this.ground);
        this.gameObject.destroy();
    }
}
