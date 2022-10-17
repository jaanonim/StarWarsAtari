import Importer from "3d-game-engine-canvas/src/tools/Importer";
import ScreenRaycast from "3d-game-engine-canvas/src/tools/Raycasts/ScreenRaycast";
import MeshRenderer from "3d-game-engine-canvas/src/components/MeshRenderer";
import WireframeMaterial from "3d-game-engine-canvas/src/classes/Materials/WireframeMaterial";
import Color from "3d-game-engine-canvas/src/utilities/math/Color";
import DefaultMeshes from "3d-game-engine-canvas/src/tools/DefaultMeshes";
import Renderer from "3d-game-engine-canvas/src/classes/Renderer";
import Camera from "3d-game-engine-canvas/src/components/Camera";
import FPSCounter from "3d-game-engine-canvas/src/tools/FPSCounter";
import Input from "./classes/Input";
import TieFighter from "./GameObjects/TieFighter";
import Component from "3d-game-engine-canvas/src/classes/Components/Component";
import Vector3 from "3d-game-engine-canvas/src/utilities/math/Vector3";
import Quaternion from "3d-game-engine-canvas/src/utilities/Quaternion";
import VaderFighter from "./GameObjects/VaderFighter";

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

    const obj = Importer.object({
        name: "o",
        transform: {
            position: [9, 6, 10],
            rotation: [1, 1, 1],
            scale: [1, 1, 1],
        },
        components: [
            new MeshRenderer(
                await DefaultMeshes.cube,
                new WireframeMaterial(Color.white)
            ),
        ],
    });
    Importer.scene({
        name: "scene",
        children: [
            obj,
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
                name: "o",
                transform: {
                    position: [9, 6, 10],
                    rotation: [1, 1, 0],
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
                transform: {
                    position: [0, 0, 0],
                    rotation: [0, 0, 0],
                },
                components: [camera],
            },
        ],
    });
    Input.init(canvas);
    // const o = camera.gameObject.getScene().addChildren(new GameObject("ok"));
    // o.addComponent(
    //     new MeshRenderer(
    //         await DefaultMeshes.cube,
    //         new WireframeMaterial(Color.white)
    //     )
    // );
    // console.log(o);

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
            // o.transform.position = Quaternion.euler(v).multiply(
            //     Vector3.forward
            // ) as Vector3;
            // o.transform.position = new Vector3(
            //     o.transform.position.x,
            //     o.transform.position.y,
            //     10
            // );

            renderer.drawer.ctx.fillStyle = "red";
            renderer.drawer.ctx.strokeStyle = "red";
            renderer.drawer.ctx.beginPath();
            renderer.drawer.ctx.arc(pos.x, pos.y, 5, 0, 2 * Math.PI);
            if (Input.getFire()) {
                renderer.drawer.ctx.fill();
            }
            renderer.drawer.ctx.closePath();
            renderer.drawer.ctx.stroke();
        }
    );
}

main();
