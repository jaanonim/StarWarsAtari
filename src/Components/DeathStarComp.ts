import Component from "3d-game-engine-canvas/src/classes/Components/Component";
import GameObject from "3d-game-engine-canvas/src/classes/GameObject";
import BasicMaterial from "3d-game-engine-canvas/src/classes/Materials/BasicMaterial";
import Renderer from "3d-game-engine-canvas/src/classes/Renderer";
import SpriteRenderer from "3d-game-engine-canvas/src/components/SpriteRenderer";
import FileLoader from "3d-game-engine-canvas/src/tools/FileLoader";
import TextureLoader from "3d-game-engine-canvas/src/tools/TextureLoader";
import Color from "3d-game-engine-canvas/src/utilities/math/Color";
import Vector3 from "3d-game-engine-canvas/src/utilities/math/Vector3";

export class DeathStarComp extends Component {
    private camGameObject!: GameObject;
    private isBigger = false;
    private isCalled = false;
    public onAnimEnds: (() => void) | null = null;

    async start() {
        this.camGameObject = this.gameObject.getScene().find("camera");
    }

    async update(): Promise<void> {
        if (!this.camGameObject) return;

        this.transform.rotation = this.camGameObject.transform.rotation;
        if (this.onAnimEnds !== null) {
            const move = this.transform.position.subtract(
                this.camGameObject.transform.apply(new Vector3(0, 0, 1.5))
            );

            if (move.squareLength() < 100 && !this.isBigger) {
                this.isBigger = true;
                const tex = new TextureLoader(
                    await FileLoader.loadImg("img/deathStar.png")
                ).parse();
                tex.bilinearFiltering = false;
                this.gameObject.getComponentError<SpriteRenderer>(
                    SpriteRenderer
                ).material = new BasicMaterial(Color.white, tex);
            }
            if (move.squareLength() < 0.1) {
                if (!this.isCalled) {
                    this.isCalled = true;
                    this.onAnimEnds();
                }
                return;
            }

            this.transform.position = this.transform.position.add(
                move.normalize().multiply(Renderer.deltaTime * -0.005)
            );
        }
    }
}
