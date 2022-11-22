import GameObject from "3d-game-engine-canvas/src/classes/GameObject";
import DifficultySelectScreen from "../../GameObjects/DifficultySelectScreen";
import Stage from "./Stage";

export default class DifficultySelectComp extends Stage {
    screen!: GameObject;
    difficultySelectScreen!: GameObject;

    async start() {
        this.screen = this.gameObject.getScene().find("screen");
        this.difficultySelectScreen = await DifficultySelectScreen();
        this.screen.addChildren(this.difficultySelectScreen, true);
    }

    async onUnload() {
        this.screen.removeChildren(this.difficultySelectScreen);
        await this.gameObject.destroy();
    }
}
