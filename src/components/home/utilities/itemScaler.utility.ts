import {
  BASE_DESIGN_HEIGHT,
  BASE_DESIGN_WIDTH,
} from "../../constants/design.constants";
import { deviceDimensionsUtility } from "./deviceDimensions.utility";

const { deviceWidth, deviceHeight } = deviceDimensionsUtility();

export const itemScalerUtility = () => {
  return () => ({
    w: (w: number) => (deviceWidth / BASE_DESIGN_WIDTH) * w,
    h: (h: number) => (deviceHeight / BASE_DESIGN_HEIGHT) * h,
  });
};
