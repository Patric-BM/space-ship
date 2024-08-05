import { Vector2 } from "./Vector2";

export class Asteroid {
  context: CanvasRenderingContext2D;
  sprites: HTMLImageElement[];
  position: Vector2;
  velocity: Vector2;
  width: number;
  height: number;
  rotation: number;
  rotationSpeed: number;
  currentSprite: HTMLImageElement | null;

  constructor(context: CanvasRenderingContext2D, sprites: HTMLImageElement[]) {
    this.context = context;
    this.sprites = sprites;
    this.position = new Vector2(
      Math.random() * context.canvas.width,
      Math.random() * context.canvas.height - context.canvas.height - 100
    );
    this.velocity = new Vector2(0, Math.random() * 2 + 1);
    this.width = 100;
    this.height = 100;
    this.rotation = 0;
    this.rotationSpeed = Math.random() * 0.1 - 0.05;
    this.currentSprite =
      this.sprites[Math.floor(Math.random() * this.sprites.length - 1)] ??
      this.sprites[0];
  }

  private draw(): void {
    this.context.save();
    this.context.translate(this.position.x, this.position.y);
    this.context.rotate(this.rotation);
    this.context.drawImage(
      this.currentSprite!,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );
    this.context.restore();
  }

  public update(): void {
    this.position.y += this.velocity.y;
    this.rotation += this.rotationSpeed;
/*     if (this.position.y > this.context.canvas.height + this.height) {
      this.position.y = -this.height;
      this.position.x = Math.random() * this.context.canvas.width;
    } */
    this.draw();
  }
}