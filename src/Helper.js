//random functions used in a bunch of places that I'm too lazy to organize 

export default class Helper{
/**
* Returns a random integer between min (inclusive) and max (inclusive)
* Using Math.round() will give you a non-uniform distribution!
*/
  static getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}