export default class Setup {
    constructor(
        private main: (canvas: HTMLCanvasElement) => void,
        private canvas: HTMLCanvasElement,
        private audioCxt: AudioContext
    ) {}

    private async loadFont() {
        const myFont = new FontFace("pixeled", "url(font/Pixeled.ttf)");
        const font = await myFont.load();
        (document.fonts as any).add(font);
    }

    async run() {
        await this.loadFont();

        const ctx = this.canvas.getContext("2d");
        if (!ctx) throw new Error("No context");

        ctx.fillStyle = "#fff";
        ctx.textAlign = "center";
        ctx.font = "30px pixeled";
        ctx.fillText(
            "Press any button to start game".toLocaleUpperCase(),
            this.canvas.width / 2,
            this.canvas.height / 2
        );

        this.setCallbacks();
    }

    private async setCallbacks() {
        this.canvas.onclick = () => this.start();
        window.onkeyup = (e) => {
            if (
                e.altKey ||
                e.ctrlKey ||
                e.shiftKey ||
                e.metaKey ||
                e.key === "ScrollLock" ||
                e.key === "CapsLock" ||
                e.key === "NumLock"
            )
                return;
            this.start();
        };
    }

    private async start() {
        this.canvas.onclick = () => {};
        window.onkeyup = () => {};
        try {
            if (this.audioCxt.state === "suspended")
                await this.audioCxt.resume();
            this.main(this.canvas);
        } catch (e) {
            this.setCallbacks();
        }
    }
}
