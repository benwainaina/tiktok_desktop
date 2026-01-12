import { StyleSheet } from "react-native";
import { itemScalerUtility } from "../../utilities/itemScaler.utility";
import { FONTS } from "../../../constants/fonts.constants";
import { fontScaleUtility } from "../../utilities/fontScale.utility";

export const ChatComponentStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: "rgba(0,0,0,.5)",
    // maxHeight: itemScalerUtility()().h(200),
    overflow: "scroll",
    paddingVertical: itemScalerUtility()().h(4),
    paddingHorizontal: itemScalerUtility()().w(6),
    borderRadius: itemScalerUtility()().w(4),
    // height: itemScalerUtility()().h(150),
    height: "100%",
  },
  noChatsPresentWrapper: {
    height: "100%",
    paddingHorizontal: itemScalerUtility()().w(12),
    display: "flex",
    justifyContent: "center",
  },
  noChatsPresentWrapper__instruction: {
    fontFamily: FONTS.poppinsBold,
    fontSize: fontScaleUtility(12),
    textAlign: "center",
    color: "#c8c8c8ff",
  },

  //   chat present
  chatPresentWrapper: {
    display: "flex",
    rowGap: itemScalerUtility()().h(12),
    flex: 1,
  },
  chatPresentWrapper__thread: {
    marginBottom: itemScalerUtility()().h(12),
    display: "flex",
    flexDirection: "row",
    columnGap: itemScalerUtility()().w(4),
  },
  chatPresentWrapper__thread__avatar: {
    width: itemScalerUtility()().w(28),
    aspectRatio: 1,
    borderRadius: 100,
    overflow: "hidden",
  },
  chatPresentWrapper__thread__info: {
    display: "flex",
  },
  chatPresentWrapper__thread__info__username: {
    fontFamily: FONTS.poppinsBold,
    fontSize: itemScalerUtility()().h(12),
    color: "#ddd9d9ff",
  },
  chatPresentWrapper__thread__info__comment: {
    fontFamily: FONTS.inter,
    fontSize: itemScalerUtility()().h(11),
    color: "#ffffff",
    fontWeight: "bold",
    marginTop: itemScalerUtility()().h(-4),
    width: 190,
  },
});
