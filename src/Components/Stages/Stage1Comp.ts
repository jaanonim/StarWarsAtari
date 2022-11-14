import GameObject from "3d-game-engine-canvas/src/classes/GameObject";
import Renderer from "3d-game-engine-canvas/src/classes/Renderer";
import Vector3 from "3d-game-engine-canvas/src/utilities/math/Vector3";
import Data from "../../Classes/Data";
import Input from "../../Classes/Input";
import DeathStar from "../../GameObjects/DeathStar";
import Stars from "../../GameObjects/Stars";
import TieFighter from "../../GameObjects/TieFighter";
import { DeathStarComp } from "../DeathStarComp";
import GameManager from "../GameManager";
import Stage from "./Stage";

export default class Stage1Comp extends Stage {
    player!: GameObject;
    screen!: GameObject;
    tieCount: number = 5;
    timer: number = 0;

    private stars!: GameObject;
    private deathStar!: GameObject;
    public inTransition = false;

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
    }

    async update() {
        if (GameManager.getInstance().isLocked()) return;
        if (this.timer >= Data.stage1.time) {
            this.timer = 0;
            Input.lock();
            GameManager.getInstance().destroyAllFireballs();
            this.inTransition = true;
            this.deathStar.getComponentError<DeathStarComp>(
                DeathStarComp
            ).onAnimEnds = () => {
                setTimeout(() => {
                    GameManager.getInstance().loadNextStage();
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
