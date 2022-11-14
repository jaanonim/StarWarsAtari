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
import Shield from "./GameObjects/Shield";
import Points from "./GameObjects/Points";
import WaveInfo from "./GameObjects/WaveInfo";
import Hint from "./GameObjects/Hint";
import DeathScreen from "./GameObjects/DeathScreen";
import Ground from "./GameObjects/Ground";

async function loadFont() {
    const myFont = new FontFace("pixeled", "url(font/Pixeled.ttf)");
    const font = await myFont.load();
    (document.fonts as any).add(font);
}

export async function main() {
    await loadFont();
    const canvas = document.getElementById("root") as HTMLCanvasElement;
    const renderer = new Renderer(canvas, 0.25, 2, false);
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
                components: [new UiScreen(renderer, 0.25, 1, false)],
                children: [
                    await Cursor(),
                    await Ship(),
                    await Laser(camera, renderer),
                    await Shield(),
                    await Points(),
                    await WaveInfo(),
                    await Hint(),
                    await DeathScreen(),
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
