import { Vector2 } from "./Vector2";

export class Background {
  context: CanvasRenderingContext2D;
  position: Vector2;
  velocity: Vector2;
  width: number;
  height: number;
  sprite: HTMLImageElement;

  constructor(context: CanvasRenderingContext2D, sprite: HTMLImageElement) {
    this.context = context;
    this.height = sprite.height;
    this.position = new Vector2(0, context.canvas.height - this.height);
    this.velocity = new Vector2(0, 1);
    this.width = context.canvas.width;
    this.sprite = sprite;
  }

  private draw(): void {
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.drawImage(
      this.sprite,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  public update(): void {
    this.position.y += this.velocity.y;
    if (this.position.y > this.height) {
      this.position.y = 0;
    }
    this.draw();
  }
}