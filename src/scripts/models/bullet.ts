import Phaser from 'phaser';

export class Bullet extends Phaser.Physics.Arcade.Sprite {

    autodisable: Phaser.Time.TimerEvent;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'bullet'); // Replace 'bulletTexture' with your bullet's sprite asset key
        scene.add.existing(this);
        scene.physics.world.enable(this); // Enable physics for the bullet
        
    }

    public fire(player) : void {
        let EdirObj = this.getDirFromAngle(player.angle);
        this.setScale(1.2,1.2);
        this.setBounce(0, 0);
        this.body.checkCollision.none = false;
        this.body.reset(player.x+ EdirObj.tx *110, player.y + EdirObj.ty *110 );

        this.setActive(true);
        this.setVisible(true);
        this.body.enable = true;
        this.angle = player.angle;

        this.setVelocity(EdirObj.tx * 3000, EdirObj.ty * 3000);

        this.autodisable = this.scene.time.addEvent({
            delay: 800, // ms
            callback: this.disable,
            callbackScope: this,
            loop: false,
        });
    }

    private getDirFromAngle(angle) : any {
        let rads = (angle * Math.PI) / 180;
        let tx = Math.cos(rads);
        let ty = Math.sin(rads);
        return { tx, ty };
    }

    disable(){
        if (this.autodisable) this.scene.time.removeEvent(this.autodisable);
        this.visible = false;
        this.active = false;
        this.body.enable = false;
    }

}