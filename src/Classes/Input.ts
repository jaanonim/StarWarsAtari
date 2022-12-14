import Vector2 from "3d-game-engine-canvas/src/utilities/math/Vector2";
import Box2D from "3d-game-engine-canvas/src/utilities/math/Box2D";
import Renderer from "3d-game-engine-canvas/src/classes/Renderer";
import { map } from "3d-game-engine-canvas/src/utilities/math/Math";
import Data from "./Data";
import GameManager from "../Components/GameManager";

export default class Input {
    private static html: HTMLCanvasElement;
    private static isFire: boolean;
    private static _lock: boolean;
    private static _isFire: boolean;
    private static pos: Vector2;
    private static move: Vector2;
    private static keys: { [key: string]: boolean } = {};
    private static keysLast: { [key: string]: boolean } = {};
    private static cursorBox: Box2D;
    private static gamePad: Gamepad | null;
    private static needToReleaseFire = false;
    private constructor() {}

    public static sensitivity: number = 1;
    public static dedZone: number = 0.1;

    public static init(html: HTMLCanvasElement) {
        if (Input.html) return;
        Input.html = html;

        const size = new Vector2(Input.html.width, Input.html.height);
        Input.cursorBox = new Box2D(Vector2.zero, size);
        Input.html.addEventListener("mousemove", Input.updateMouse.bind(this));
        Input.html.addEventListener("mouseup", Input.updateMouse.bind(this));
        Input.html.addEventListener("mousedown", Input.updateMouse.bind(this));
        window.addEventListener("keydown", Input.updateKeyboardDown.bind(this));
        window.addEventListener("keyup", Input.updateKeyboardUp.bind(this));
        window.addEventListener(
            "gamepadconnected",
            Input.connectGamePad.bind(this)
        );
        window.addEventListener(
            "gamepaddisconnected",
            Input.disconnectGamePad.bind(this)
        );
        Input.pos = Input.getCenter();
        Input.isFire = false;
        Input._lock = false;
        //Input.lock();
    }

    public static center() {
        Input.pos = Input.getCenter();
    }

    private static transformMousePosition(position: Vector2): Vector2 {
        const bounding = this.html.getBoundingClientRect();
        return new Vector2(
            map(
                position.x - bounding.left,
                0,
                bounding.width,
                0,
                this.html.width
            ),
            map(
                position.y - bounding.top,
                0,
                bounding.height,
                0,
                this.html.height
            )
        );
    }

    public static updateMouse(e: MouseEvent) {
        if (Input._lock) return;
        Input.pos = this.transformMousePosition(
            new Vector2(e.clientX, e.clientY)
        );

        if (this.needToReleaseFire) {
            if ((e.buttons & 1) !== 1) this.needToReleaseFire = false;
            Input._isFire = false;
        } else Input._isFire = (e.buttons & 1) === 1;
    }

    public static updateKeyboardDown(e: KeyboardEvent) {
        Input.keys[e.key] = true;
        e.preventDefault();
    }

    public static updateKeyboardUp(e: KeyboardEvent) {
        Input.keys[e.key] = false;
    }

    public static connectGamePad(e: GamepadEvent) {
        Input.gamePad = e.gamepad;
    }

    public static disconnectGamePad(_e: GamepadEvent) {
        Input.gamePad = null;
    }

    public static getFire(): Boolean {
        return Input.isFire;
    }

    public static getPos(): Vector2 {
        return Input.pos;
    }

    public static getScaledPos(): Vector2 {
        return Input.pos.multiply(Data.scale);
    }

    public static getCenter(): Vector2 {
        const size = new Vector2(Input.html.width, Input.html.height);
        return size.multiply(1 / 2);
    }

    public static hasButtonPressed(): boolean {
        return Object.keys(Input.keys).some((k) => Input.keys[k]);
    }

    public static lock() {
        Input._lock = true;
        this.needToReleaseFire = Input._isFire;
        Input.center();
    }

    public static unlock() {
        Input._lock = false;
    }

    public static update() {
        if (Input._lock) return;
        Input.move = Vector2.zero;
        Input.isFire = Input._isFire;

        if (Input.keys["w"] === true || Input.keys["ArrowUp"] === true) {
            Input.move = Input.move.add(Vector2.down);
        }
        if (Input.keys["s"] === true || Input.keys["ArrowDown"] === true) {
            Input.move = Input.move.add(Vector2.up);
        }
        if (Input.keys["a"] === true || Input.keys["ArrowLeft"] === true) {
            Input.move = Input.move.add(Vector2.left);
        }
        if (Input.keys["d"] === true || Input.keys["ArrowRight"] === true) {
            Input.move = Input.move.add(Vector2.right);
        }
        if (Input.keys[" "] === true) {
            Input.isFire = true;
        }
        if (Input.keysLast["p"] && !Input.keys["p"]) {
            GameManager.getInstance().switchPause();
        }
        Input.keysLast = JSON.parse(JSON.stringify(Input.keys));

        Input.gamePad = navigator.getGamepads()[0];
        if (Input.gamePad) {
            const m = new Vector2(Input.gamePad.axes[0], Input.gamePad.axes[1]);
            if (m.squareLength() > Input.dedZone) {
                Input.move = Input.move.add(m);
            }

            Input.isFire =
                Input.gamePad.buttons[0].pressed ||
                Input.gamePad.buttons[7].pressed ||
                Input.isFire;
        }

        Input.pos = Input.pos.add(
            Input.move
                .normalize()
                .multiply(Input.sensitivity)
                .multiply(Renderer.deltaTime)
        );
        Input.pos = Input.cursorBox.clamp(Input.pos);
    }
}
