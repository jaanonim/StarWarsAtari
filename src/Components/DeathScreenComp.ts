import Component from "3d-game-engine-canvas/src/classes/Components/Component";
import Input from "../Classes/Input";
import WaveSystem from "../Classes/WaveSystem";
import GameManager from "./GameManager";

export class DeathScreenComp extends Component {
    public content: Component;
    public wasReleased = false;

    constructor(content: Component, private isDeathScreen: boolean = true) {
        super();
        this.content = content;
    }

    async start() {
        this.hide();
    }

    async update(): Promise<void> {
        if (!Input.getFire() && this.content.isActive && this.isDeathScreen) {
            this.wasReleased = true;
        } else if (
            this.wasReleased &&
            Input.getFire() &&
            this.content.isActive &&
            this.isDeathScreen
        ) {
            await WaveSystem.getInstance().loadMenu();
            GameManager.getInstance().unlock();
            this.hide();
        }
    }

    show() {
        this.content.isActive = true;
    }

    hide() {
        this.content.isActive = false;
    }
}
