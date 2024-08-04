import { Asteroid } from "./Asteroid";
import { Background } from "./Background";
import { Ship } from "./Ship";
import { SpriteLoader } from "./utils/SpriteLoader";

export class CanvasManager {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  ship: Ship | null;
  background: Background | null;
  asteroids: Asteroid[] | null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d")!;
    this.ship = null;
    this.background = null;
    this.asteroids = null;
  }

  public async init(): Promise<void> {
    const shipSprite = await SpriteLoader.loadImage("/spaceship.png");
    const backgroundSprite = await SpriteLoader.loadImage(
      "/background_purple_space.png"
    );
    const asteroidSprites = await SpriteLoader.loadImages([
      "/asteroid-0.png",
      "/asteroid-1.png",
      "/asteroid-2.png",
      "/asteroid-3.png",
    ]);
    this.ship = new Ship(this.context, shipSprite);
    this.background = new Background(this.context, backgroundSprite);
    this.asteroids = Array.from({ length: Math.random() * 5 + 3 }, () => {
      return new Asteroid(this.context, asteroidSprites);
    });
    this.gameLoop();
  }

  private draw(): void {
    this.background?.update();
    this.asteroids?.forEach((asteroid) => asteroid.update());
    this.ship?.update();
  }

  private gameLoop(): void {
    this.draw();
    requestAnimationFrame(() => this.gameLoop());
  }
}
