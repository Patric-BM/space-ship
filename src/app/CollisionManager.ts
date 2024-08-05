import { Vector2 } from "./Vector2";

export class CollisionManager {
    
    public static checkCollision(
        object1: { position: Vector2; width: number; height: number },
        object2: { position: Vector2; width: number; height: number }
    ): boolean {
        return (
        object1.position.x < object2.position.x + object2.width &&
        object1.position.x + object1.width > object2.position.x &&
        object1.position.y < object2.position.y + object2.height &&
        object1.position.y + object1.height > object2.position.y
        );
    }
}