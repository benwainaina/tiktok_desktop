const { width: innerWidth, height: innerHeight } = window as any;

export const deviceDimensionsUtility = () => ({
  deviceWidth: innerWidth,
  deviceHeight: innerHeight,
});
