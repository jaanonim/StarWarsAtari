import UiComponent from "3d-game-engine-canvas/src/classes/Components/UiComponent";
import GameObject from "3d-game-engine-canvas/src/classes/GameObject";
import Image from "3d-game-engine-canvas/src/components/Image";
import Text from "3d-game-engine-canvas/src/components/Text";
import Color from "3d-game-engine-canvas/src/utilities/math/Color";
import Data from "../Classes/Data";
import ShieldText from "./ShieldText";

export class ShieldComp extends UiComponent {
    leftImgs: Array<Image>;
    rightImgs: Array<Image>;
    text: Text;
    shieldText: ShieldText;

    public defaultColor: Color = Data.UI.accentColor;
    public animColor: Color = Data.UI.mainColor;

    private _shield: number;
    public get shield(): number {
        return this._shield;
    }
    public set shield(value: number) {
        this._shield = value;
        this.leftImgs.forEach((c, i) => {
            if (this._shield - 1 < i) c.isActive = false;
            else c.isActive = true;
        });
        this.rightImgs.forEach((c, i) => {
            if (this._shield - 1 < i) c.isActive = false;
            else c.isActive = true;
        });
        this.text.text = "" + value;
    }

    constructor(
        leftObjs: Array<GameObject>,
        rightObjs: Array<GameObject>,
        text: Text,
        shieldText: ShieldText
    ) {
        super();
        this._shield = 0;
        this.text = text;
        this.shieldText = shieldText;
        this.leftImgs = leftObjs.map((o) => {
            const c = o.getComponent<Image>(Image);
            if (!c) throw Error();
            return c;
        });
        this.rightImgs = rightObjs.map((o) => {
            const c = o.getComponent<Image>(Image);
            if (!c) throw Error();
            return c;
        });
        this.shield = Data.player.startShield;
    }

    async start() {
        super.start();
        this.resetColor();
        this.text.options.color = this.defaultColor;
    }

    takeDamage() {
        if (this.shield <= 1) {
            const b = this.shieldText.defaultColor;
            this.shieldText.defaultColor = this.shieldText.animColor;
            this.shieldText.animColor = b;
            this.shieldText.text = "SHIELD GONE";
        } else this.shieldText.text = "SHIELD";

        this.damageAnim();
        this.shield--;
    }

    ded() {
        this.damageAnim();
    }

    damageAnim() {
        setTimeout(() => {
            this.damageAnimFrame(Math.min(this._shield, 6), true);
        }, 200);
    }

    damageAnimFrame(n: number, anim: boolean) {
        if (anim && n <= 2) {
            this.shieldText.startAnim();
            anim = false;
        }
        if (n < 1) {
            this.resetColor();
            this.text.options.color = this.animColor;
            setTimeout(() => {
                this.text.options.color = this.defaultColor;
            }, 200);
            return;
        }
        this.setColor(n);
        setTimeout(() => {
            this.damageAnimFrame(n - 1, anim);
        }, 200);
    }

    setColor(n: number) {
        this.leftImgs.forEach((c, i) => {
            if (n - 1 < i) c.color = this.defaultColor;
            else c.color = this.animColor;
        });
        this.rightImgs.forEach((c, i) => {
            if (n < i) c.color = this.defaultColor;
            else c.color = this.animColor;
        });
    }

    resetColor() {
        this.leftImgs.forEach((c) => {
            c.color = this.defaultColor;
        });
        this.rightImgs.forEach((c) => {
            c.color = this.defaultColor;
        });
    }
}
