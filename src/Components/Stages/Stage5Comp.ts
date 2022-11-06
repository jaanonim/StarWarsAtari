import Component from "3d-game-engine-canvas/src/classes/Components/Component";
import GameObject from "3d-game-engine-canvas/src/classes/GameObject";
import Renderer from "3d-game-engine-canvas/src/classes/Renderer";
import { getRandomElement } from "3d-game-engine-canvas/src/utilities/math/Math";
import Vector2 from "3d-game-engine-canvas/src/utilities/math/Vector2";
import Vector3 from "3d-game-engine-canvas/src/utilities/math/Vector3";
import FireballWord from "../../GameObjects/FireballWord";
import GameManager from "../GameManager";
export default class Stage5Comp extends Component {
    private cooldown: number = 0;
    public fireCooldown: number = 700;
    private camGameObject!: GameObject;

    async start() {
        this.camGameObject = this.gameObject.getScene().find("camera");
    }

    async update() {
        const POS = [
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
        const z = this.camGameObject.transform.position.z + 6;
        const maxZ = 40 * 2 - 12; // 12 - end save zone; 40 - length
        if (this.camGameObject.transform.position.z > maxZ) return;

        if (this.cooldown > this.fireCooldown) {
            this.cooldown = 0;
            let pos;
            if (Math.random() > 0.5) {
                pos = getRandomElement(POS);
                this.gameObject
                    .getScene()
                    .addChildren(
                        await FireballWord(new Vector3(pos.x, pos.y, z))
                    );
            }
            if (Math.random() > 0.5) {
                pos = getRandomElement(POS);
                if (pos !== pos)
                    this.gameObject
                        .getScene()
                        .addChildren(
                            await FireballWord(new Vector3(pos.x, pos.y, z))
                        );
            }
        }
        this.cooldown += Renderer.deltaTime;
    }

    onTargetDestroy() {
        GameManager.getInstance().points.addSilent(25000);
        this.warn("Jej! you won!");
    }

    onWallBunkerDestroy() {
        GameManager.getInstance().points.add(100);
    }
}
