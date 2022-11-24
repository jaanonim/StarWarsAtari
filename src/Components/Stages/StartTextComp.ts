import GameObject from "3d-game-engine-canvas/src/classes/GameObject";
import StartTextScreen from "../../GameObjects/StartTextScreen";
import GameManager from "../GameManager";
import StageComp from "./StageComp";

export default class StartTextComp extends StageComp {
    screen!: GameObject;
    startTextScreen!: GameObject;

    async start() {
        this.screen = this.gameObject.getScene().find("screen");
        this.startTextScreen = await StartTextScreen();
        this.screen.addChildren(this.startTextScreen, true);
        GameManager.getInstance().hideCursor();
    }

    async onUnload() {
        GameManager.getInstance().showCursor();
        this.screen.removeChildren(this.startTextScreen);
        await this.gameObject.destroy();
    }
}
