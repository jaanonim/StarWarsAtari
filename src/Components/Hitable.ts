import Component from "3d-game-engine-canvas/src/classes/Components/Component";

export interface HittableInterface {
    destroy(): void;
}

export class Hittable extends Component {
    obj: HittableInterface;
    constructor(obj: HittableInterface) {
        super();
        this.obj = obj;
    }

    destroy() {
        this.obj.destroy();
    }
}
