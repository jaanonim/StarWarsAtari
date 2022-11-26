import PreLoader from "./Classes/PreLoader";
import SoundsManager from "./Classes/SoundsManager";

export default class Setup {
    constructor(
        private main: (canvas: HTMLCanvasElement) => void,
        private canvas: HTMLCanvasElement
    ) {}

    private async loadFont() {
        const myFont = new FontFace("pixeled", "url(font/Pixeled.ttf)");
        const font = await myFont.load();
        (document.fonts as any).add(font);
    }

    async run() {
        await this.loadFont();
        //this.main(this.canvas); //TODO: remove debug
        this.drawText("Press any button to start game");
        this.setCallbacks();
    }

    drawText(text: string) {
        const ctx = this.canvas.getContext("2d");
        if (!ctx) throw new Error("No context");
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.fillStyle = "#fff";
        ctx.textAlign = "center";
        ctx.font = "30px pixeled";
        ctx.fillText(
            text.toLocaleUpperCase(),
            this.canvas.width / 2,
            this.canvas.height / 2
        );
    }

    private async setCallbacks() {
        this.canvas.onclick = () => this.start();
        window.onkeyup = (e) => {
            if (
                [
                    "ScrollLock",
                    "CapsLock",
                    "NumLock",
                    "Shift",
                    "Alt",
                    "Control",
                    "AltGraph",
                    "ContextMenu",
                    "Meta",
                ].some((i) => i === e.key)
            )
                return;
            this.start();
        };
    }

    private async start() {
        this.canvas.onclick = () => {};
        window.onkeyup = () => {};
        if (await SoundsManager.getInstance().init()) {
            this.drawText("Loading...");
            console.time();
            await PreLoader.preLoad();
            console.timeEnd();

            this.main(this.canvas);
        } else {
            this.setCallbacks();
        }
    }
}
