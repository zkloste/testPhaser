import Phaser from 'phaser'
import './style.css'

const ARENA_WIDTH = 800
const ARENA_HEIGHT = 520

class GameScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite
  private platforms!: Phaser.Physics.Arcade.StaticGroup
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private wasd!: {
    A: Phaser.Input.Keyboard.Key
    D: Phaser.Input.Keyboard.Key
    W: Phaser.Input.Keyboard.Key
    SPACE: Phaser.Input.Keyboard.Key
  }

  constructor() {
    super('game')
  }

  create() {
    const { width, height } = this.scale
    const offsetX = (width - ARENA_WIDTH) / 2
    const offsetY = (height - ARENA_HEIGHT) / 2

    this.add.rectangle(width / 2, height / 2, ARENA_WIDTH, ARENA_HEIGHT, 0x171b27)
    this.add.rectangle(width / 2, offsetY + 30, ARENA_WIDTH - 2, 60, 0x20283a)
    this.add
      .text(width / 2, offsetY + 29, 'PLATFORM JUMPER', {
        color: '#e5edff',
        fontFamily: 'system-ui, sans-serif',
        fontSize: '20px',
        fontStyle: 'bold',
        letterSpacing: 3,
      })
      .setOrigin(0.5)

    this.add
      .text(width / 2, offsetY + ARENA_HEIGHT - 24, 'MOVE  A / D  or  ← / →     JUMP  W / SPACE / ↑', {
        color: '#a5b0c8',
        fontFamily: 'system-ui, sans-serif',
        fontSize: '13px',
        letterSpacing: 1,
      })
      .setOrigin(0.5)

    const graphics = this.make.graphics({ x: 0, y: 0 })
    graphics.fillStyle(0x72e0bd)
    graphics.fillRoundedRect(0, 0, 34, 42, 8)
    graphics.fillStyle(0xe5fff7)
    graphics.fillCircle(23, 13, 3)
    graphics.generateTexture('player', 34, 42)
    graphics.destroy()

    this.platforms = this.physics.add.staticGroup()
    this.addPlatform(offsetX + 400, offsetY + 459, 720, 24, 0x52647f)
    this.addPlatform(offsetX + 205, offsetY + 365, 190, 18, 0x6e82a3)
    this.addPlatform(offsetX + 570, offsetY + 310, 190, 18, 0x6e82a3)
    this.addPlatform(offsetX + 385, offsetY + 235, 180, 18, 0x8a9ab7)
    this.addPlatform(offsetX + 175, offsetY + 155, 150, 18, 0x8a9ab7)

    this.player = this.physics.add.sprite(offsetX + 400, offsetY + 410, 'player')
    this.player.setDepth(1)
    this.physics.add.collider(this.player, this.platforms)

    this.physics.world.setBounds(offsetX + 40, offsetY + 65, ARENA_WIDTH - 80, ARENA_HEIGHT - 105)
    this.player.setCollideWorldBounds(true)

    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys()
      this.wasd = this.input.keyboard.addKeys('A,D,W,SPACE') as typeof this.wasd
    }
  }

  update() {
    if (!this.cursors || !this.wasd) return

    const left = this.cursors.left.isDown || this.wasd.A.isDown
    const right = this.cursors.right.isDown || this.wasd.D.isDown
    const jump = Phaser.Input.Keyboard.JustDown(this.cursors.up) ||
      Phaser.Input.Keyboard.JustDown(this.cursors.space) ||
      Phaser.Input.Keyboard.JustDown(this.wasd.W) ||
      Phaser.Input.Keyboard.JustDown(this.wasd.SPACE)

    this.player.setVelocityX(left === right ? 0 : left ? -250 : 250)

    if (jump && (this.player.body?.blocked.down || this.player.body?.touching.down)) {
      this.player.setVelocityY(-510)
    }
  }

  private addPlatform(x: number, y: number, platformWidth: number, platformHeight: number, color: number) {
    const platform = this.add.rectangle(x, y, platformWidth, platformHeight, color)
    platform.setStrokeStyle(2, 0xb6c8e5, 0.55)
    this.platforms.add(platform)
  }
}

new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#10131c',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 1100 },
      debug: false,
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: ARENA_WIDTH,
    height: ARENA_HEIGHT,
  },
  scene: GameScene,
})