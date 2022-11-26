import UiComponent from "3d-game-engine-canvas/src/classes/Components/UiComponent";
import Text from "3d-game-engine-canvas/src/components/Text";
import WaveSystem from "../Classes/WaveSystem";

export default class WaveInfoComp extends UiComponent {
    private info1Text: Text;
    private info2Text: Text;
    private waveText: Text;

    constructor(waveText: Text, info1Text: Text, info2Text: Text) {
        super();
        this.waveText = waveText;
        this.info1Text = info1Text;
        this.info2Text = info2Text;
    }

    async start(): Promise<void> {
        await super.start();
        this.resetInfo();
    }

    setInfo(line1: string, line2: string) {
        this.info1Text.text = line1;
        this.info2Text.text = line2;
    }

    resetInfo() {
        this.setInfo("", "");
    }

    async update() {
        this.waveText.text = `${
            WaveSystem.getInstance().currentWaveName
        }  WAVE`;
    }
}
