import FileLoader from "3d-game-engine-canvas/src/tools/FileLoader";
import ObjLoader from "3d-game-engine-canvas/src/tools/ObjLoader";

export default class PreLoader {
    static readonly IMAGES = [
        "arm.png",
        "deathStar_opacity.png",
        "fireball.png",
        "nothing.png",
        "shield/1.png",
        "shield/2.png",
        "shield/3.png",
        "shield/4.png",
        "shield/5.png",
        "shield/6.png",
        "smallDeathStar_opacity.png",
        "title.png",
        "cursor.png",
        "deathStar.png",
        "gameOver.png",
        "select.png",
        "ship.png",
        "smallDeathStar.png",
    ];
    static readonly OBJECTS = [
        "body.obj",
        "bunker.obj",
        "cube.obj",
        "plane.obj",
        "tower.obj",
        "wing2.obj",
        "wing.obj",
    ];
    static readonly SOUNDS = [
        "fireballDmg.mp3",
        "laser.mp3",
        "music.mp3",
        "shieldDmg.mp3",
        "tieDmg.mp3",
    ];

    static readonly imagesUrl = "img/";
    static readonly objectsUrl = "model/";
    static readonly soundsUrl = "sound/";

    static async preLoad() {
        await PreLoader.preLoadImages();
        await PreLoader.preLoadObjects();
        await PreLoader.preLoadSounds();
    }

    private static async preLoadImages() {
        await Promise.all(
            PreLoader.IMAGES.map((url) =>
                FileLoader.loadImg(this.imagesUrl + url, true)
            )
        );
    }

    private static async preLoadSounds() {
        await Promise.all(
            PreLoader.SOUNDS.map((url) =>
                FileLoader.loadAudio(this.soundsUrl + url, true)
            )
        );
    }

    private static async preLoadObjects() {
        const rawObjs = await Promise.all(
            PreLoader.OBJECTS.map((url) =>
                FileLoader.load(this.objectsUrl + url, true)
            )
        );
        rawObjs.map((o) => new ObjLoader(o, true).parse(true));
        rawObjs.map((o) => new ObjLoader(o, true).parse(false));
    }
}
