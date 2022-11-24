import GameObject from "3d-game-engine-canvas/src/classes/GameObject";
import GameManager from "../Components/GameManager";
import { PlayerController } from "../Components/PlayerController";
import StageComp from "../Components/Stages/StageComp";
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
    private _inMenu: boolean = true;
    public get inMenu(): boolean {
        return this._inMenu;
    }
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
        if (this.currentStage) {
            const c = this.currentStage.getComponent<StageComp>(StageComp);
            if (c) await c.onUnload();
        }
        this.currentStageIndex++;
        if (this._inMenu) {
            if (WaveInfo.menu.length <= this.currentStageIndex)
                this.currentStageIndex = 0;
        } else {
            if (
                WaveInfo.waves[this.currentWaveIndex].stages.length <=
                this.currentStageIndex
            ) {
                this.nextWave();
            }
        }
        await this.loadStage();
        Input.unlock();
    }

    async loadStage() {
        let stageInfo, stage;
        if (this._inMenu) {
            stageInfo = { data: {} };
            stage = WaveInfo.menu[this.currentStageIndex];
        } else {
            stageInfo =
                WaveInfo.waves[this.currentWaveIndex].stages[
                    this.currentStageIndex
                ];
            stage = WaveInfo.stages[stageInfo.id];
        }

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

    async loadMenu() {
        this.currentStageIndex = -1;
        this._inMenu = true;
        this.loadNextStage();
    }

    async loadTo(wave: number) {
        this.currentStageIndex = -1;
        this.currentWaveIndex = wave;
        this._inMenu = false;
        GameManager.getInstance().onStartNewGame();
        this.loadNextStage();
    }
}
