import GameObject from "3d-game-engine-canvas/src/classes/GameObject";
import Renderer from "3d-game-engine-canvas/src/classes/Renderer";
import SoundsManager from "../../Classes/SoundsManager";
import WaveSystem from "../../Classes/WaveSystem";
import DeathStar from "../../GameObjects/DeathStar";
import FinishText from "../../GameObjects/FinishText";
import Stars from "../../GameObjects/Stars";
import { DeathStarComp } from "../DeathStarComp";
import { ExplosionComp } from "../ExplosionComp";
import FinishTextComp from "../FinishTextComp";
import GameManager from "../GameManager";
import StageComp from "./StageComp";

export default class FinishComp extends StageComp {
    player!: GameObject;
    screen!: GameObject;
    timer: number = 0;

    private deathStar!: GameObject;
    private stars!: GameObject;
    private finishText!: GameObject;

    constructor() {
        super();
    }

    async start() {
        this.player = this.gameObject.getScene().find("camera");
        this.screen = this.gameObject.getScene().find("screen");

        this.stars = await Stars(true);
        await this.player.addChildren(this.stars);
        this.deathStar = await DeathStar(true);
        await this.screen.addChildren(this.deathStar);
        this.finishText = await FinishText();
        await this.screen.addChildren(this.finishText);

        this.deathStarAnim();
    }

    deathStarAnim() {
        const comp =
            this.deathStar.getComponentError<DeathStarComp>(DeathStarComp);
        setTimeout(() => {
            comp.onAnimEnds = () => {
                this.screen.removeChildren(this.deathStar);
                this.explodeAnim();
            };
        }, 500);
    }

    explodeAnim() {
        SoundsManager.getInstance()
            .getSound("sound/end.mp3")
            .then((c) => c.play());
        const comp = this.screen
            .find("Explosion")
            .getComponentError<ExplosionComp>(ExplosionComp);
        comp.onAnimEnds = () => {
            this.textAnim();
        };
    }

    textAnim() {
        const shieldComp = GameManager.getInstance().shield;

        const comp =
            this.finishText.getComponentError<FinishTextComp>(FinishTextComp);
        comp.values = [
            "DEATHSTAR DESTROYED",
            "BONUS FOR REMAINING SHIELDS",
            `5000 X ${shieldComp.shield}`,
            "ADD 1 TO DEFLECTOR SHIELD",
        ];
        setTimeout(() => {
            comp.onAnimEnds = () => {
                setTimeout(() => {
                    WaveSystem.getInstance().loadNextStage();
                }, comp.cooldown);
            };
        }, 500);

        setTimeout(() => {
            GameManager.getInstance().points.add(shieldComp.shield * 5000);
        }, comp.cooldown * 2 + 500);
        setTimeout(() => {
            shieldComp.shield += 1;
        }, comp.cooldown * 3 + 500);
    }

    async update() {
        if (GameManager.getInstance().isLocked()) return;
        this.timer += Renderer.deltaTime;
    }

    async onUnload() {
        this.player.removeChildren(this.stars);
        this.screen.removeChildren(this.deathStar);
        this.screen.removeChildren(this.finishText);
        await this.gameObject.destroy();
    }
}
