import Component from "3d-game-engine-canvas/src/classes/Components/Component";
import Input from "../Classes/Input";
import Vector3 from "3d-game-engine-canvas/src/utilities/math/Vector3";
import Box2D from "3d-game-engine-canvas/src/utilities/math/Box2D";
import Transform from "3d-game-engine-canvas/src/utilities/Transform";
import Renderer from "3d-game-engine-canvas/src/classes/Renderer";
import GameObject from "3d-game-engine-canvas/src/classes/GameObject";
import UiElement from "3d-game-engine-canvas/src/components/UiElement";
import Image from "3d-game-engine-canvas/src/components/Image";
import Color from "3d-game-engine-canvas/src/utilities/math/Color";
import WaveSystem from "../Classes/WaveSystem";
import GameManager from "./GameManager";

export class CursorComp extends Component {
    box!: Box2D;
    last: Vector3 = Vector3.zero;
    timer: number = 0;
    screen!: GameObject;
    img!: Image;

    async start() {
        await super.start();
        const p = this.gameObject.transform.parent;
        if (!(p instanceof Transform)) throw Error();
        this.screen = p.gameObject;
        const c = p.gameObject.getSizedComponent();
        if (!c) throw Error();
        const margin = c.size.divide(10).roundToInt();

        this.box = new Box2D(margin, c.size.subtract(margin));
        this.last = this.transform.position;
        this.timer = 0;
        this.img = this.gameObject.getComponentError<Image>(Image);
    }

    async update() {
        const pos = this.box.clamp(Input.getScaledPos().roundToInt());
        this.transform.position = new Vector3(pos.x, pos.y, 0);

        const o = this.screen.find("DifficultySelectScreen");

        this.img.color = Color.white;
        if (o) {
            const BUTTONS = [
                { n: "__easy", v: 0, points: 0 },
                { n: "__medium", v: 2, points: 40000 },
                { n: "__hard", v: 4, points: 800000 },
            ];
            await Promise.all(
                BUTTONS.map(({ n, v, points }) => {
                    const c = o.find(n).getComponent<UiElement>(UiElement);
                    if (c && c.contains(pos)) {
                        this.img.color = Color.blue;
                        if (Input.getFire()) {
                            GameManager.getInstance().points.addSilent(points);
                            return WaveSystem.getInstance().loadTo(v);
                        }
                    }
                    return null;
                })
            );
        }

        if (this.timer > 3000) {
            this.timer = 0;
            Input.center();
        }
        if (
            this.transform.position.equals(this.last) &&
            !Input.hasButtonPressed()
        ) {
            this.timer += Renderer.deltaTime;
        } else {
            this.last = this.transform.position;
            this.timer = 0;
        }
    }
}
