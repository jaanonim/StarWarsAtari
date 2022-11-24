import GameObject from "3d-game-engine-canvas/src/classes/GameObject";
import WaveSystem from "../../../Classes/WaveSystem";
import Ground from "../../../GameObjects/Ground";
import GameManager from "../../GameManager";
import StageComp from "../StageComp";
export default class Stage2Comp extends StageComp {
    private player!: GameObject;
    private ground!: GameObject;

    onBunkerDestroy() {
        GameManager.getInstance().points.add(200);
    }

    async start() {
        this.player = this.gameObject.getScene().find("camera");
        this.ground = await Ground();
        this.player.addChildren(this.ground);
    }

    async update() {
        if (
            this.player.transform.position.z >=
            WaveSystem.getInstance().stageData.length +
                WaveSystem.getInstance().stageData.margin
        )
            WaveSystem.getInstance().loadNextStage();
    }

    async onUnload() {
        this.player.removeChildren(this.ground);
        this.gameObject.destroy();
    }
}
