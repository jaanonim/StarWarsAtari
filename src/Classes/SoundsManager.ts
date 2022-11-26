import FileLoader from "3d-game-engine-canvas/src/tools/FileLoader";

export default class SoundsManager {
    private static instance: SoundsManager;

    private constructor() {
        this.audioContext = new AudioContext();
    }

    static getInstance(): SoundsManager {
        if (!SoundsManager.instance)
            SoundsManager.instance = new SoundsManager();
        return SoundsManager.instance;
    }

    private audioContext: AudioContext;

    async init() {
        try {
            if (this.audioContext.state === "suspended")
                await this.audioContext.resume();
        } catch (_error) {
            return false;
        }
        return true;
    }

    async pause() {
        await this.audioContext.suspend();
    }

    async unpause() {
        await this.audioContext.resume();
    }

    async getSound(url: string, loop = false) {
        const audio = await FileLoader.loadAudio(url);
        audio.loop = loop;
        this.audioContext
            .createMediaElementSource(audio)
            .connect(this.audioContext.destination);
        return audio;
    }
}
