import Component from "3d-game-engine-canvas/src/classes/Components/Component";

export class DeathScreenComp extends Component {
    public content: Component;

    constructor(content: Component) {
        super();
        this.content = content;
    }

    async start() {
        this.hide();
    }

    show() {
        this.content.isActive = true;
    }

    hide() {
        this.content.isActive = false;
    }
}
