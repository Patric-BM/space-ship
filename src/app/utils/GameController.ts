import { Ship } from "../Ship";

export class GameController {
  private ship: Ship;
  private keys: { [key: string]: boolean } = {};
  private gamepadIndex: number | null = null;

  constructor(ship: Ship) {
    this.ship = ship;
    this.initKeyboardControls();
    this.initGamepadControls();
  }

  private initKeyboardControls(): void {
    window.addEventListener("keydown", (event) => {
      this.keys[event.key] = true;
    });

    window.addEventListener("keyup", (event) => {
      this.keys[event.key] = false;
    });
  }

  private initGamepadControls(): void {
    window.addEventListener("gamepadconnected", (event) => {
      this.gamepadIndex = event.gamepad.index;
    });

    window.addEventListener("gamepaddisconnected", () => {
      this.gamepadIndex = null;
    });
  }

  public update(): void {
    this.updateKeyboardControls();
    this.updateGamepadControls();
    this.ship.update();
  }

  private updateKeyboardControls(): void {
    if (this.keys["ArrowUp"]) {
      this.ship.velocity.y = -5;
    } else if (this.keys["ArrowDown"]) {
      this.ship.velocity.y = 5;
    } else {
      this.ship.velocity.y = 0;
    }

    if (this.keys["ArrowLeft"]) {
      this.ship.position.x -= 5;
    } else if (this.keys["ArrowRight"]) {
      this.ship.position.x += 5;
    }
  }

  private updateGamepadControls(): void {
    if (this.gamepadIndex !== null) {
      const gamepad = navigator.getGamepads()[this.gamepadIndex];
      if (gamepad) {
        const leftStickX = gamepad.axes[0];
        const leftStickY = gamepad.axes[1];

        this.ship.position.x += leftStickX * 5;
        this.ship.velocity.y = leftStickY * 5;
      }
    }
  }

  public vibrateGamepad(duration: number, intensity: number): void {
    if (this.gamepadIndex !== null) {
      const gamepad = navigator.getGamepads()[this.gamepadIndex];
      if (gamepad) {
        gamepad.vibrationActuator?.playEffect("dual-rumble", {
          duration,
          strongMagnitude: intensity,
          weakMagnitude: intensity,
        });
      }
    }
  }

  public stopVibratingGamepad(): void {
    if (this.gamepadIndex !== null) {
      const gamepad = navigator.getGamepads()[this.gamepadIndex];
      if (gamepad) {
        gamepad.vibrationActuator?.reset();
      }
    }
  }
}
