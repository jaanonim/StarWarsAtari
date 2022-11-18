import GameObject from "3d-game-engine-canvas/src/classes/GameObject";
import GameManager from "../Components/GameManager";
import { PlayerController } from "../Components/PlayerController";
import Stage from "../Components/Stages/Stage";
import Data from "./Data";
import Input from "./Input";
import WaveInfo from "./WaveInfo";

export default class WaveSystem {
    private static instance: WaveSystem;

    private constructor() {
        this.currentStageIndex = Data.start.stage;
        this.currentWaveIndex = Data.start.wave;
    }

    static getInstance(): WaveSystem {
        if (!WaveSystem.instance) WaveSystem.instance = new WaveSystem();
        return WaveSystem.instance;
    }

    public currentStage!: GameObject;
    public currentStageIndex: number = 0;
    private _stageData: any;
    public get stageData(): any {
        return this._stageData;
    }

    public currentWaveIndex = 0;
    public get currentWaveName() {
        return this.currentWaveIndex + 1;
    }

    public nextWave() {
        if (WaveInfo.waves.length - 1 > this.currentWaveIndex) {
            this.currentWaveIndex++;
        }
        this.currentStageIndex = 0;
    }

    async loadNextStage() {
        Input.lock();
        await GameManager.getInstance().resetBeforeLoad();
        const c = this.currentStage.getComponent<Stage>(Stage);
        if (!c) throw Error();
        await c.onUnload();
        this.currentStageIndex++;
        if (
            WaveInfo.waves[this.currentWaveIndex].stages.length <=
            this.currentStageIndex
        ) {
            this.nextWave();
        }
        this.loadStage();
        Input.unlock();
    }

    async loadStage() {
        const stageInfo =
            WaveInfo.waves[this.currentWaveIndex].stages[
                this.currentStageIndex
            ];
        const stage = WaveInfo.stages[stageInfo.id];
        this._stageData = { ...stage.data, ...stageInfo.data };
        const pc =
            GameManager.getInstance().gameObject.getComponent<PlayerController>(
                PlayerController
            );
        if (!pc) throw Error();
        pc.mode = stage.controls;
        pc.maxPos = stage.maxPos;

        this.currentStage = GameManager.getInstance()
            .gameObject.getScene()
            .addChildren(await stage.func());
    }
}
