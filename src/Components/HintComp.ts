import UiComponent from "3d-game-engine-canvas/src/classes/Components/UiComponent";
import Text from "3d-game-engine-canvas/src/components/Text";
import Color from "3d-game-engine-canvas/src/utilities/math/Color";

export default class HintComp extends UiComponent {
    private text: Text;

    constructor(text: Text) {
        super();
        this.text = text;
    }

    setHint(text: string, color: Color) {
        this.text.text = text;
        this.text.options.color = color;
    }
}
