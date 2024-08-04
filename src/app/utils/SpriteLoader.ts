export class SpriteLoader {

  public static loadImage(src: string): Promise<HTMLImageElement> {
    const sprite = new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = src;
    });
    return sprite as Promise<HTMLImageElement>;
  }

  public static loadImages(srcs: string[]): Promise<HTMLImageElement[]> {
    const sprites = srcs.map(src => SpriteLoader.loadImage(src));
    return Promise.all(sprites);
  }
}
