import UiComponent from "3d-game-engine-canvas/src/classes/Components/UiComponent";
import Text from "3d-game-engine-canvas/src/components/Text";

export default class WaveInfoComp extends UiComponent {
    private info1Text: Text;
    private info2Text: Text;
    private waveText: Text;

    private _waveNumber: number = 0;
    public get waveNumber(): number {
        return this._waveNumber;
    }

    constructor(waveText: Text, info1Text: Text, info2Text: Text) {
        super();
        this.waveText = waveText;
        this.info1Text = info1Text;
        this.info2Text = info2Text;
    }

    setWave(n: number) {
        this._waveNumber = n;
        this.waveText.text = `${this._waveNumber}  WAVE`;
    }

    setInfo(line1: string, line2: string) {
        this.info1Text.text = line1;
        this.info2Text.text = line2;
    }
}
