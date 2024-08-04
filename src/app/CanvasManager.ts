import { Ship } from "./Ship";
import { SpriteLoader } from "./utils/SpriteLoader";

export class CanvasManager {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  ship: Ship | null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d")!;
    this.ship = null;
  }

  public async init(): Promise<void> {
    const shipSprite = await SpriteLoader.loadImage("/spaceship.png");
    this.ship = new Ship(this.context, shipSprite);
    this.gameLoop();
  }

  private draw(): void {
    this.ship?.update();
  }

  private gameLoop(): void {
    this.draw();
    requestAnimationFrame(() => this.gameLoop());
  }
}
