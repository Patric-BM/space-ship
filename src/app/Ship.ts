import { Vector2 } from "@/app/utils/Vector2";

export class Ship {
  position: Vector2;
  velocity: Vector2;
  width: number;
  height: number;
  context: CanvasRenderingContext2D;
  sprite: HTMLImageElement;
  frameIndex: number;
  frameWidth: number;
  frameHeight: number;
  totalFrames: number;
  frameCounter: number;
  frameRate: number;

  constructor(context: CanvasRenderingContext2D, sprite: HTMLImageElement) {
    this.context = context;
    this.position = new Vector2(
      context.canvas.width / 2,
      context.canvas.height - 50
    );
    this.velocity = new Vector2(0, 0);
    this.width = 100;
    this.height = 130;
    this.sprite = sprite;
    this.frameIndex = 0;
    this.frameWidth = 300 / 3;
    this.frameHeight = 148;
    this.totalFrames = 3;
    this.frameCounter = 0;
    this.frameRate = 10;
  }

  private draw(): void {
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

  public update(): void {
    this.position.y += this.velocity.y;
    if (this.position.y > this.context.canvas.height - this.height) {
      this.velocity.y = 0;
      this.position.y = this.context.canvas.height - this.height;
    }

    this.frameCounter++;
    if (this.frameCounter >= this.frameRate) {
      this.frameIndex++;
      this.frameIndex %= this.totalFrames;
      this.frameCounter = 0;
    }

    this.draw();
  }
}
