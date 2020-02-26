declare module "*.obj" {
  import SidiousSkullModel from "./models/SidiousSkull.obj";
  export default SidiousSkullModel;
}

declare module "*.ico" {
  import favicon from "./images/favicon.ico";
  export default favicon;
}

declare module "*.svg" {
  import ThunderLogo from "./images/thunderLogo.svg";
  export default ThunderLogo;
}

declare module "browser-monads";
declare module "react-reveal/Fade";
declare module "webfontloader";