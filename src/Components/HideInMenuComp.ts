import UiComponent from "3d-game-engine-canvas/src/classes/Components/UiComponent";
import VirtualCanvas from "3d-game-engine-canvas/src/utilities/VirtualCanvas";
import WaveSystem from "../Classes/WaveSystem";

export default class HideInMenuComp extends UiComponent {
    original!: (canvas: VirtualCanvas) => void;

    async start() {
        super.start();
        this.original = this.uiElement.uiRender;
    }

    async update() {
        if (WaveSystem.getInstance().inMenu) {
            this.uiElement.uiRender = () => {};
        } else {
            this.uiElement.uiRender = this.original;
        }
    }
    uiRender() {}
}
