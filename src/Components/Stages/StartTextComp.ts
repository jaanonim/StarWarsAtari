import GameObject from "3d-game-engine-canvas/src/classes/GameObject";
import SoundsManager from "../../Classes/SoundsManager";
import StartTextScreen from "../../GameObjects/StartTextScreen";
import GameManager from "../GameManager";
import StageComp from "./StageComp";

export default class StartTextComp extends StageComp {
    screen!: GameObject;
    startTextScreen!: GameObject;
    music!: HTMLAudioElement;
    timer = 500;

    async start() {
        this.screen = this.gameObject.getScene().find("screen");
        this.startTextScreen = await StartTextScreen();
        await this.screen.addChildren(this.startTextScreen);
        GameManager.getInstance().hideCursor();
        this.music = await SoundsManager.getInstance().getSound(
            "sound/music.mp3",
            true
        );
        await this.music.play();
    }

    async onUnload() {
        await this.music.pause();
        GameManager.getInstance().showCursor();
        this.screen.removeChildren(this.startTextScreen);
        await this.gameObject.destroy();
    }
}
