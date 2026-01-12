import { BASE_DESIGN_WIDTH } from "../../constants/design.constants";
import { deviceDimensionsUtility } from "./deviceDimensions.utility";

const { deviceWidth } = deviceDimensionsUtility();

export const fontScaleUtility = (fontSize: number): number => {
  return (deviceWidth / BASE_DESIGN_WIDTH) * fontSize;
};
