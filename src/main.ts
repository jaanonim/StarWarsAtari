import Importer from "3d-game-engine-canvas/src/tools/Importer";
import ScreenRaycast from "3d-game-engine-canvas/src/tools/Raycasts/ScreenRaycast";
import MeshRenderer from "3d-game-engine-canvas/src/components/MeshRenderer";
import WireframeMaterial from "3d-game-engine-canvas/src/classes/Materials/WireframeMaterial";
import Color from "3d-game-engine-canvas/src/utilities/math/Color";
import Renderer from "3d-game-engine-canvas/src/classes/Renderer";
import Camera from "3d-game-engine-canvas/src/components/Camera";
import UiScreen from "3d-game-engine-canvas/src/components/UiScreen";
import FPSCounter from "3d-game-engine-canvas/src/tools/FPSCounter";
import Input from "./classes/Input";
import TieFighter from "./GameObjects/TieFighter";
import Component from "3d-game-engine-canvas/src/classes/Components/Component";
import Vector3 from "3d-game-engine-canvas/src/utilities/math/Vector3";
import Quaternion from "3d-game-engine-canvas/src/utilities/Quaternion";
import VaderFighter from "./GameObjects/VaderFighter";
import Cursor from "./GameObjects/Cursor";
import Ship from "./GameObjects/Ship";
import Laser from "./GameObjects/Laser";

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
    const camera = new Camera(renderer, 90, 1, 100);
    renderer.setCamera(camera, 0);

    Importer.scene({
        name: "scene",
        children: [
            {
                name: "o",
                transform: {
                    position: [5, 0, 10],
                    scale: [1, 1, 1],
                },
                children: [await TieFighter()],
                components: [new Rotate(new Vector3(0, 1, 0))],
            },

            {
                name: "o",
                transform: {
                    position: [-5, 0, 10],
                    scale: [1, 1, 1],
                },
                children: [await VaderFighter()],
                components: [new Rotate(new Vector3(0, 0.3, 0))],
            },
            {
                name: "camera",
                transform: {
                    position: [0, 0, 0],
                    rotation: [0, 0, 0],
                },
                components: [camera],
            },
            {
                name: "screen",
                components: [new UiScreen(renderer, 1)],
                children: [await Cursor(), await Ship(), await Laser()],
            },
        ],
    });
    Input.init(canvas);

    const fps = new FPSCounter(document.getElementById("fps") as HTMLElement);
    await renderer.startGameLoop(
        () => {
            Input.update();
            fps.update();
        },
        () => {
            const pos = Input.getPos().roundToInt();

            camera.gameObject
                .getScene()
                .getAllComponents<MeshRenderer>(MeshRenderer)
                .forEach(
                    (c) => (c.material = new WireframeMaterial(Color.white))
                );
            new ScreenRaycast(camera, renderer)
                .getCollisions(pos)
                .forEach(
                    (e) =>
                        (e.meshRenderer.material = new WireframeMaterial(
                            Color.red
                        ))
                );
        }
    );
}

main();
