import { Asteroid } from "./Asteroid";
import { Background } from "./Background";
import { Ship } from "./Ship";
import { GameController } from "./utils/GameController";
import { SpriteLoader } from "./utils/SpriteLoader";

export class CanvasManager {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  ship: Ship | null;
  background: Background | null;
  asteroids: Asteroid[] | null;
  gameController: GameController | null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d")!;
    this.ship = null;
    this.background = null;
    this.asteroids = [];
    this.gameController = null;
  }

  public async init(): Promise<void> {
    const shipSprite = await SpriteLoader.loadImage("/spaceship.png");
    const backgroundSprite = await SpriteLoader.loadImage(
      "/background_purple_space.png"
    );
 
    this.ship = new Ship(this.context, shipSprite);
    this.background = new Background(this.context, backgroundSprite);
 
    this.gameController = new GameController(this.ship);
    this.generateAsteroids();
    this.gameLoop();
  }

  private draw(): void {
    this.background?.update();
    this.asteroids?.forEach((asteroid) => asteroid.update());
    this.ship?.update();
  }

  private gameLoop(): void {
    this.draw();
    this.gameController?.update();
    requestAnimationFrame(() => this.gameLoop());

    this.removeAsteroids();

    console.log(this.asteroids);
  }

  private asteroidOffScreen(asteroid: Asteroid): boolean {
    return (
      asteroid.position.y > this.context.canvas.height ||
      asteroid.position.x < 0 ||
      asteroid.position.x > this.context.canvas.width
    );
  }

  private removeAsteroids(): void {
    this.asteroids?.forEach((asteroid) => {
      const index = this.asteroids?.indexOf(asteroid);
      if (this.asteroidOffScreen(asteroid)) {
        this.asteroids?.splice(index!, 1);
      }
    });
  }

  private async generateAsteroids(): Promise<void> {
    const asteroidSprites = await SpriteLoader.loadImages([
      "/asteroid-0.png",
      "/asteroid-1.png",
      "/asteroid-2.png",
      "/asteroid-3.png",
    ]);
    setInterval(() => {
      this.asteroids?.push(new Asteroid(this.context, asteroidSprites));
    }, 2000); 
  }
}
