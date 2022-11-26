import GameObject from "3d-game-engine-canvas/src/classes/GameObject";
import Color from "3d-game-engine-canvas/src/utilities/math/Color";
import WaveSystem from "../../../Classes/WaveSystem";
import Ground from "../../../GameObjects/Ground";
import GameManager from "../../GameManager";
import StageComp from "../StageComp";
export default class Stage3Comp extends StageComp {
    private player!: GameObject;
    private ground!: GameObject;
    public numberOfTowers: number;
    private pointsForTower: number = 0;
    private readonly incrementPoints: number = 200;

    constructor() {
        super();
        this.numberOfTowers = WaveSystem.getInstance().stageData.numberOfTowers;
    }

    onTowerDestroy() {
        GameManager.getInstance().points.add(this.pointsForTower);
        this.pointsForTower += this.incrementPoints;
        this.numberOfTowers--;
        if (this.numberOfTowers <= 0) {
            GameManager.getInstance().hint.resetHint();
            GameManager.getInstance().points.add(50000);
        }
        GameManager.getInstance().waveInfo.setInfo(
            "TOWERS",
            "" + this.numberOfTowers
        );
        GameManager.getInstance().hint.setHint({
            text: `${this.pointsForTower} POINTS NEXT TOWER`,
            color: Color.red,
        });
        GameManager.getInstance().hint.texts[1].text = `${this.pointsForTower} POINTS NEXT TOWER`;
    }

    async start() {
        this.pointsForTower = 200;
        this.player = this.gameObject.getScene().find("camera");
        GameManager.getInstance().waveInfo.setInfo(
            "TOWERS",
            "" + this.numberOfTowers
        );

        this.ground = await Ground();
        await this.player.addChildren(this.ground);
        GameManager.getInstance().hint.setHints(
            [
                { text: "50000 FOR SHOOTING ALL TOWERS", color: Color.red },
                {
                    text: `${this.pointsForTower} POINTS NEXT TOWER`,
                    color: Color.red,
                },
            ],
            3000
        );
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
