export default class MathUtils {
  static randomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static randomNumber(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
}
