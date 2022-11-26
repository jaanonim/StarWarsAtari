import UiComponent from "3d-game-engine-canvas/src/classes/Components/UiComponent";
import VirtualCanvas from "3d-game-engine-canvas/src/utilities/VirtualCanvas";
import GameManager from "./GameManager";

export default class HideOnCursorHiddenComp extends UiComponent {
    original!: (canvas: VirtualCanvas) => void;

    async start() {
        await super.start();
        this.original = this.uiElement.uiRender;
    }

    async update() {
        if (GameManager.getInstance().isHiddenCursor()) {
            this.uiElement.uiRender = () => {};
        } else {
            this.uiElement.uiRender = this.original;
        }
    }
    uiRender() {}
}
