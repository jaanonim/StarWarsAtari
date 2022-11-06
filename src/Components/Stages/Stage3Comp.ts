import Component from "3d-game-engine-canvas/src/classes/Components/Component";
import GameManager from "../GameManager";
export default class Stage3Comp extends Component {
    onTowerDestroy() {
        GameManager.getInstance().points.add(200);
    }
}
