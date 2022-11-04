import Component from "3d-game-engine-canvas/src/classes/Components/Component";
export default class Stage5Comp extends Component {
    onTargetDestroy() {
        this.warn("Jej! you won!");
    }

    onWallBunkerDestroy() {
        this.log("wall bunker broke :-)");
    }
}
