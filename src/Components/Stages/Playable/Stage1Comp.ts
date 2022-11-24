import GameObject from "3d-game-engine-canvas/src/classes/GameObject";
import Renderer from "3d-game-engine-canvas/src/classes/Renderer";
import Color from "3d-game-engine-canvas/src/utilities/math/Color";
import Vector3 from "3d-game-engine-canvas/src/utilities/math/Vector3";
import Data from "../../../Classes/Data";
import WaveSystem from "../../../Classes/WaveSystem";
import DeathStar from "../../../GameObjects/DeathStar";
import Stars from "../../../GameObjects/Stars";
import TieFighter from "../../../GameObjects/TieFighter";
import { DeathStarComp } from "../../DeathStarComp";
import GameManager from "../../GameManager";
import StageComp from "../StageComp";

export default class Stage1Comp extends StageComp {
    player!: GameObject;
    screen!: GameObject;
    tieCount: number;
    timer: number = 0;

    private stars!: GameObject;
    private deathStar!: GameObject;
    public inTransition = false;

    constructor() {
        super();
        this.tieCount = WaveSystem.getInstance().stageData.tieCount;
    }

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
        this.screen = this.gameObject.getScene().find("screen");

        for (let _ = 0; _ < this.tieCount; _++) {
            this.spawnTie();
        }
        this.timer = 0;

        this.stars = await Stars();
        this.player.addChildren(this.stars);
        this.deathStar = await DeathStar();
        this.screen.addChildren(this.deathStar);
        GameManager.getInstance().hint.setHints(
            [
                { text: "SHOOT FIREBALLS", color: Color.green },
                { text: "SHOOT TIE FIGHTERS", color: Color.magenta },
            ],
            3000
        );
    }

    async update() {
        if (GameManager.getInstance().isLocked()) return;
        if (this.timer >= Data.stage1.time * 1000) {
            this.timer = 0;
            GameManager.getInstance().destroyAllFireballs();
            this.inTransition = true;
            this.deathStar.getComponentError<DeathStarComp>(
                DeathStarComp
            ).onAnimEnds = () => {
                setTimeout(() => {
                    WaveSystem.getInstance().loadNextStage();
                }, 500);
            };
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
        this.player.removeChildren(this.stars);
        this.screen.removeChildren(this.deathStar);
        await this.gameObject.destroy();
    }
}
