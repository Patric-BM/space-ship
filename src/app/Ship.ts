import { Vector2 } from "./Vector2";

export class Ship {
  position: Vector2;
  velocity: Vector2;
  width: number;
  height: number;
  gravity: number;
  context: CanvasRenderingContext2D;
  sprite: HTMLImageElement;
  frameIndex: number;
  frameWidth: number;
  frameHeight: number;

  constructor(context: CanvasRenderingContext2D, sprite: HTMLImageElement) {
    this.position = new Vector2(0, 0);
    this.velocity = new Vector2(0, 0);
    this.width = 50;
    this.height = 50;
    this.gravity = 0.5;
    this.context = context;
    this.sprite = new Image();
    this.sprite.src = sprite.src;
    this.frameIndex = 0;
    this.frameWidth = 50;
    this.frameHeight = 50;
  }

  public draw(): void {
    this.context.drawImage(
      this.sprite,
      this.frameIndex * this.frameWidth,
      0,
      this.frameWidth,
      this.frameHeight,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
