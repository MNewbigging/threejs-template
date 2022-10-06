export class NumberUtils {
  public static clampToRange(min: number, max: number, value: number) {
    return Math.min(Math.max(value, min), max);
  }

  // Min inclusive, max exclusive
  public static randomRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  // Returns -1 or 1 at random
  public static negativeCoinToss() {
    return Math.random() > 0.5 ? 1 : -1;
  }
}
