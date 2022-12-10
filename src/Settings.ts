import SoundsManager from "./Classes/SoundsManager";

export default class Settings {
    muteBtn: HTMLElement;
    static instance: Settings;
    pauseDiv: HTMLElement;

    static getInstance(): Settings {
        if (!Settings.instance) Settings.instance = new Settings();
        return Settings.instance;
    }

    private constructor() {
        const muteBtn = document.getElementById("mute");
        if (!muteBtn) throw new Error();
        this.muteBtn = muteBtn;

        this.setMute(parseInt(localStorage.getItem("Mute") || "0"));
        muteBtn.addEventListener("click", () => {
            if (muteBtn.innerText === "Mute") {
                this.setMute(0);
            } else {
                this.setMute(1);
            }
        });

        const pauseDiv = document.getElementById("pause");
        if (!pauseDiv) throw new Error();
        this.pauseDiv = pauseDiv;
    }

    setMute(n: number) {
        if (!n) {
            this.muteBtn.innerText = "Unmute";
            localStorage.setItem("Mute", "0");
            SoundsManager.getInstance().setVolume(0);
        } else {
            this.muteBtn.innerText = "Mute";
            localStorage.setItem("Mute", "1");
            SoundsManager.getInstance().setVolume(1);
        }
    }

    pause() {
        this.pauseDiv.style.display = "flex";
    }

    unpause() {
        this.pauseDiv.style.display = "none";
    }
}
