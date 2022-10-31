import Component from "3d-game-engine-canvas/src/classes/Components/Component";

export interface HittableInterface {
    hit(): void;
}

export class Hittable extends Component {
    obj: HittableInterface;
    constructor(obj: HittableInterface) {
        super();
        this.obj = obj;
    }

    hit() {
        this.obj.hit();
    }
}
