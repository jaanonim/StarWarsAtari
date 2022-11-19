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
    public revers: boolean;
    public onAnimEnds: (() => void) | null = null;
    private readonly targetPos = new Vector3(0, 0, 1.5);
    private readonly startPos = new Vector3(0, 0, 19.8);
    public speed: number = 0.005;

    constructor(revers: boolean = false) {
        super();
        this.revers = revers;
    }

    async start() {
        this.camGameObject = this.gameObject.getScene().find("camera");
        if (this.revers) {
            this.transform.position = this.targetPos;
            this.changeTexture(true);
        } else {
            this.transform.position = this.startPos;
            this.changeTexture(false);
        }
    }

    async update(): Promise<void> {
        if (!this.camGameObject) return;

        this.transform.rotation = this.camGameObject.transform.rotation;

        if (this.onAnimEnds !== null) {
            if (this.revers) {
                const move = this.transform.position.subtract(
                    this.camGameObject.transform.apply(this.startPos)
                );

                if (move.squareLength() < 100 && this.isBigger) {
                    this.changeTexture(false);
                }
                if (move.squareLength() < 0.1) {
                    if (!this.isCalled) {
                        this.isCalled = true;
                        this.onAnimEnds();
                    }
                    return;
                }

                this.transform.position = this.transform.position.add(
                    move.normalize().multiply(Renderer.deltaTime * -this.speed)
                );
            } else {
                const move = this.transform.position.subtract(
                    this.camGameObject.transform.apply(this.targetPos)
                );

                if (move.squareLength() < 100 && !this.isBigger) {
                    this.changeTexture(true);
                }
                if (move.squareLength() < 0.1) {
                    if (!this.isCalled) {
                        this.isCalled = true;
                        this.onAnimEnds();
                    }
                    return;
                }

                this.transform.position = this.transform.position.add(
                    move.normalize().multiply(Renderer.deltaTime * -this.speed)
                );
            }
        }
    }

    async changeTexture(toBigger: boolean) {
        this.isBigger = toBigger;
        const tex = new TextureLoader(
            await FileLoader.loadImg(
                toBigger ? "img/deathStar.png" : "img/smallDeathStar.png"
            )
        ).parse();
        tex.bilinearFiltering = false;
        this.gameObject.getComponentError<SpriteRenderer>(
            SpriteRenderer
        ).material = new BasicMaterial(Color.white, tex);
    }
}
