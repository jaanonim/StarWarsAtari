import Importer from "3d-game-engine-canvas/src/tools/Importer";
import Renderer from "3d-game-engine-canvas/src/classes/Renderer";
import Camera from "3d-game-engine-canvas/src/components/Camera";
import UiScreen from "3d-game-engine-canvas/src/components/UiScreen";
import FPSCounter from "3d-game-engine-canvas/src/tools/FPSCounter";
import Input from "./Classes/Input";
import Cursor from "./GameObjects/Cursor";
import Ship from "./GameObjects/Ship";
import Laser from "./GameObjects/Laser";
import { PlayerController } from "./Components/PlayerController";
import GameManager from "./Components/GameManager";
import SphereCollider from "3d-game-engine-canvas/src/components/colliders/SphereCollider";

export async function main() {
    const canvas = document.getElementById("root") as HTMLCanvasElement;
    const renderer = new Renderer(canvas, 0.25, false);
    const camera = new Camera(renderer, 90, 0.5, 20, true);
    renderer.setCamera(camera, 0);
    GameManager.getInstance().setRenderer(renderer);

    Importer.scene({
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
