import UiComponent from "3d-game-engine-canvas/src/classes/Components/UiComponent";
import Renderer from "3d-game-engine-canvas/src/classes/Renderer";
import Text from "3d-game-engine-canvas/src/components/Text";
import GameManager from "./GameManager";

export class StartTextScreen3Comp extends UiComponent {
    private readonly TEXTS = [
        "1. YOUR X-WING IS EQUIPPED WITH AN\n INVISIBLE DEFLECTOR SHIELD THAT WILL\nPROTECT YOU FOR 8 COLLISIONS.\n\n",
        "2. DEFLECTOR STRENGTH IS LOST WHEN A\nFIREBALL IMPACTS YOUR SHIELD OR WHEN\nYOU STRIKE A LASER TOWER OR TRENCH CATWALK.\n\n",
        "3. AIM YOUR LASER WITH CURSOR TO\nEXPLODE EMPIRE TIE FIGHTERS, LASER\nTOWER TOPS AND TRENCH TURRETS.\n\n",
        "4. SHOOT FIREBALLS BEFORE THEY IMPACT\nYOUR SHIELD.\n\n",
        "5. THE REBEL FORCE IS DEPENDING ON YOU\nTO STOP THE EMPIRE BY BLOWING UP THE\nDEATH STAR.",
    ];

    private timer: number = 0;
    private delay: number = 2000;
    private index: number = 0;

    constructor(private text: Text) {
        super();
    }

    async start(): Promise<void> {
        await super.start();
        this.index = 0;
        this.timer = 0;
    }

    async next() {
        if (this.index >= this.TEXTS.length) return;
        this.text.text += this.TEXTS[this.index];
        this.index++;
    }

    async update() {
        if (GameManager.getInstance().isLocked()) return;
        if (this.timer > this.delay) {
            this.timer = 0;
            this.next();
        }
        this.timer += Renderer.deltaTime;
    }
}
