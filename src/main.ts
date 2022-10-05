import Importer from "3d-game-engine-canvas/src/tools/Importer";
import MeshRenderer from "3d-game-engine-canvas/src/components/MeshRenderer";
import WireframeMaterial from "3d-game-engine-canvas/src/classes/Materials/WireframeMaterial";
import Color from "3d-game-engine-canvas/src/utilities/math/Color";
import DefaultMeshes from "3d-game-engine-canvas/src/tools/DefaultMeshes";
import Renderer from "3d-game-engine-canvas/src/classes/Renderer";
import Camera from "3d-game-engine-canvas/src/components/Camera";
import FPSCounter from "3d-game-engine-canvas/src/tools/FPSCounter";

export async function main() {
    const canvas = document.getElementById("root") as HTMLCanvasElement;
    const renderer = new Renderer(canvas);
    const camera = new Camera(renderer.canvasRatio, 90, 1, 100);
    renderer.setCamera(camera, 0);

    Importer.scene({
        name: "scene",
        children: [
            {
                name: "o",
                transform: {
                    position: [0, 0, 2],
                    rotation: [0, 1, 0],
                    scale: [1, 1, 1],
                },
                components: [
                    new MeshRenderer(
                        await DefaultMeshes.cube,
                        new WireframeMaterial(Color.white)
                    ),
                ],
            },
            {
                name: "camera",
                components: [camera],
            },
        ],
    });

    const fps = new FPSCounter(document.getElementById("fps") as HTMLElement);
    await renderer.startGameLoop(() => {
        fps.update();
    });
}

main();
