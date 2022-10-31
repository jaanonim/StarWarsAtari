import Component from "3d-game-engine-canvas/src/classes/Components/Component";
export default class Stage3Comp extends Component {
    onTowerDestroy() {
        this.log("Tower died");
    }
}
