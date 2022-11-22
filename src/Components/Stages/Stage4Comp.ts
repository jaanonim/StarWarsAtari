import GameObject from "3d-game-engine-canvas/src/classes/GameObject";
import Renderer from "3d-game-engine-canvas/src/classes/Renderer";
import Color from "3d-game-engine-canvas/src/utilities/math/Color";
import { getRandomElement } from "3d-game-engine-canvas/src/utilities/math/Math";
import Vector2 from "3d-game-engine-canvas/src/utilities/math/Vector2";
import Vector3 from "3d-game-engine-canvas/src/utilities/math/Vector3";
import Data from "../../Classes/Data";
import FireballWord from "../../GameObjects/FireballWord";
import GameManager from "../GameManager";
import Stage from "./Stage";
export default class Stage4Comp extends Stage {
    private cooldown: number = 0;
    public fireCooldown: number = 700;
    private camGameObject!: GameObject;

    private readonly POS = [
        new Vector2(1, 0),
        new Vector2(0, 0),
        new Vector2(-1, 0),
        new Vector2(1, 1.75),
        new Vector2(0, 1.75),
        new Vector2(-1, 1.75),
        new Vector2(1, 3.5),
        new Vector2(0, 3.5),
        new Vector2(-1, 3.5),
    ];

    async start() {
        this.camGameObject = this.gameObject.getScene().find("camera");
        GameManager.getInstance().hint.setHint({
            text: "SHOOT FIREBALLS",
            color: Color.white,
        });
    }

    async update() {
        if (GameManager.getInstance().isLocked()) return;

        const fireballZ = this.camGameObject.transform.position.z + 6;
        const dedZ = Data.lengthOfTrench * 4 - 1;
        const maxZ = Data.lengthOfTrench * 4 - 12; // 12 - end save zone
        if (this.camGameObject.transform.position.z > dedZ) {
            GameManager.getInstance().hit();
            this.camGameObject.transform.position = Vector3.zero.copy();
            return;
        }
        if (this.camGameObject.transform.position.z > maxZ) return;

        if (this.cooldown > this.fireCooldown) {
            this.cooldown = 0;
            let pos;
            if (Math.random() > 0.2) {
                pos = getRandomElement(this.POS);
                this.gameObject
                    .getScene()
                    .addChildren(
                        await FireballWord(new Vector3(pos.x, pos.y, fireballZ))
                    );
            }
            if (Math.random() > 0.5) {
                pos = getRandomElement(this.POS);
                if (pos !== pos)
                    this.gameObject
                        .getScene()
                        .addChildren(
                            await FireballWord(
                                new Vector3(pos.x, pos.y, fireballZ)
                            )
                        );
            }
        }
        this.cooldown += Renderer.deltaTime;
    }

    onTargetDestroy() {
        GameManager.getInstance().points.addSilent(25000);
        GameManager.getInstance().setWin();
    }

    onWallBunkerDestroy() {
        GameManager.getInstance().points.add(100);
    }

    async onUnload() {
        this.gameObject.destroy();
    }
}
