import { Asset } from "expo-asset";

export default class Images {
  static logo = require("./logo.png");
  static NoImage = require("./no-image.jpg");

  static downloadAsync() {
    return [
      Asset.fromModule(Images.logo).downloadAsync(),
      Asset.fromModule(Images.NoImage).downloadAsync(),
    ];
  }
}
