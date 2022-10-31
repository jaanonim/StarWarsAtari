import Importer from "3d-game-engine-canvas/src/tools/Importer";
import Renderer from "3d-game-engine-canvas/src/classes/Renderer";
import Camera from "3d-game-engine-canvas/src/components/Camera";
import UiScreen from "3d-game-engine-canvas/src/components/UiScreen";
import FPSCounter from "3d-game-engine-canvas/src/tools/FPSCounter";
import Input from "./Classes/Input";
import Component from "3d-game-engine-canvas/src/classes/Components/Component";
import Vector3 from "3d-game-engine-canvas/src/utilities/math/Vector3";
import Quaternion from "3d-game-engine-canvas/src/utilities/Quaternion";
import Cursor from "./GameObjects/Cursor";
import Ship from "./GameObjects/Ship";
import Laser from "./GameObjects/Laser";
import { PlayerController } from "./Components/PlayerController";
import GameManager from "./Components/GameManager";
import SphereCollider from "3d-game-engine-canvas/src/components/colliders/SphereCollider";

class Rotate extends Component {
    v: number;
    rotation: Vector3;

    constructor(rotation: Vector3) {
        super();
        this.v = 0;
        this.rotation = rotation;
    }

    async update() {
        this.gameObject.transform.rotation = Quaternion.euler(
            this.rotation.multiply(this.v)
        );
        this.v += 0.1;
    }
}

export async function main() {
    const canvas = document.getElementById("root") as HTMLCanvasElement;
    const renderer = new Renderer(canvas, 0.25, false);
    const camera = new Camera(renderer, 90, 1, 100, true);
    renderer.setCamera(camera, 0);
    GameManager.getInstance().setRenderer(renderer);

    const scene = Importer.scene({
        name: "scene",
        children: [
            {
                name: "camera",
                transform: {
                    position: [0, 0, 0],
                    rotation: [0, 0, 0],
                },
                components: [
                    camera,
                    new PlayerController(),
                    GameManager.getInstance(),
                    new SphereCollider(),
                ],
            },
            // await TestGround(
            //     new Vector3(-100, -4, -100),
            //     new Vector3(20, 20, 20),
            //     new Vector2(10, 10)
            // ),
            {
                name: "screen",
                components: [new UiScreen(renderer, 1)],
                children: [
                    await Cursor(),
                    await Ship(),
                    await Laser(camera, renderer),
                ],
            },
        ],
    });
    Input.init(canvas);

    const fps = new FPSCounter(document.getElementById("fps") as HTMLElement);
    await renderer.startGameLoop(() => {
        Input.update();
        fps.update();
    });
}

main();
