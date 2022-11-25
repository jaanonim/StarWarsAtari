import Component from "3d-game-engine-canvas/src/classes/Components/Component";
import GameObject from "3d-game-engine-canvas/src/classes/GameObject";
import Renderer from "3d-game-engine-canvas/src/classes/Renderer";
import Data from "../Classes/Data";
import Input from "../Classes/Input";
import WaveSystem from "../Classes/WaveSystem";
import StartTextScreen1 from "../GameObjects/StartTextScreens/StartTextScreen1";
import StartTextScreen2 from "../GameObjects/StartTextScreens/StartTextScreen2";
import StartTextScreen3 from "../GameObjects/StartTextScreens/StartTextScreen3";
import StartTextScreen4 from "../GameObjects/StartTextScreens/StartTextScreen4";
import StartTextScreen5 from "../GameObjects/StartTextScreens/StartTextScreen5";
import GameManager from "./GameManager";

export default class StartTextScreenComp extends Component {
    private timer: number = 0;
    private screenTime: number = Data.screenTime;
    private currentScreen!: GameObject;
    private readonly SCREENS = [
        StartTextScreen1,
        StartTextScreen2,
        StartTextScreen3,
        StartTextScreen4,
        StartTextScreen5,
    ];
    private index: number = 0;

    constructor() {
        super();
    }

    async start(): Promise<void> {
        super.start();
        this.timer = 0;
        this.index = 0;
        setTimeout(async () => {
            this.currentScreen = await this.SCREENS[this.index]();
            this.gameObject.addChildren(this.currentScreen);
        });
    }

    async update(): Promise<void> {
        if (GameManager.getInstance().isLocked()) return;
        if (Input.getFire()) WaveSystem.getInstance().loadNextStage();

        if (this.timer > this.screenTime) {
            this.timer = 0;
            this.loadNextScreen();
        }
        this.timer += Renderer.deltaTime;
    }

    async loadNextScreen() {
        this.gameObject.removeChildren(this.currentScreen);
        this.index++;
        if (this.index >= this.SCREENS.length) this.index = 0;
        this.currentScreen = await this.SCREENS[this.index]();
        this.gameObject.addChildren(this.currentScreen);
    }
}
