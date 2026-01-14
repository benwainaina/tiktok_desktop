import { useEffect, useState } from "react";
import { EXTERNAL_CONSTANTS } from "../constants/constants";
// import { LikesComponent } from "./components/likes/likes.component";
import { itemScalerUtility } from "./utilities/itemScaler.utility";
// import { FollowersComponent } from "./components/followers/followers.component";
import { useWebsocketUtilityHook } from "./utilities/useWebsocket.utility";
import { jsonStringToObjectUtility } from "./utilities/jsonStringToObject.utility";
import "./home.component.styles";
import { LikesComponent } from "./components/likes/likes.component";
import { FollowersComponent } from "./components/followers/followers.component";
import { ImageComponent } from "./shared/components/image.component";
import { numberFormatterUtility } from "./utilities/numberFormatter.utility";

export const HomeComponent = () => {
  return (
    <div className="home">
      <ActionsComponent />
    </div>
  );
};

const ActionsComponent = () => {
  /**
   * Hooks
   */
  const {
    openSocket,
    closeSocket,
    sendData: sendSocketData,
    socketData,
    webSocket,
    setSocketData,
  } = useWebsocketUtilityHook();

  /**
   * States
   */
  const [likesDelta, setLikesDelta] = useState<Record<string, string>>({});
  const [followsDelta, setFollowsDelta] = useState<Record<string, string>>({});
  const [likesCount, setLikesCount] = useState<number>(0);

  /**
   * Effects
   */
  useEffect(() => {
    /**
     * Open a socket connection
     */
    openSocket(`${EXTERNAL_CONSTANTS.wsEndpoint}/live`);
  }, []);

  useEffect(() => {
    /**
     * Connect to socket data
     */
    if (webSocket) {
      setTimeout(() => {
        sendSocketData({
          username: EXTERNAL_CONSTANTS.username,
          action: "connect",
        });
      }, 2000);
    }
  }, [webSocket]);

  useEffect(() => {
    /**
     * Handler received socket data
     */
    if (socketData) {
      const payload = jsonStringToObjectUtility(socketData.data);
      switch (payload.event_type) {
        case "like":
        case "follow":
        case "share":
          if (payload.event_type === "like") {
            setLikesCount(likesCount + payload.likes_increment);
          }
          setLikesDelta(payload);
          break;
        case "join":
          break;
      }
    }
  }, [socketData]);

  useEffect(() => {
    () => {
      closeSocket();
    };
  }, []);

  const mockAction = (event_type: string, payload?: any) => {
    setSocketData({
      data: JSON.stringify({
        username: "gameranthemtv",
        avatar:
          "https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/13f067b94895453e03b19593f3815a02~tplv-tiktokx-cropcenter:100:100.webp?dr=14579&refresh_token=841a0110&x-expires=1768478400&x-signature=ivcCAfGl8Ozhif5I1Ya6uY340B0%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=fdd36af4&idc=my",
        name: "Gamer Anthem TV",
        event_type,
        ...payload,
      }),
    });
  };

  return (
    <div className="home_wrapper">
      <div className="wrapper__inner">
        <div style={{ padding: `0 ${itemScalerUtility()().w(8)}` }}>
          <div className="wrapper__inner__chatTurnedOff">
            <span className="wrapper__inner__chatTurnedOff__instruction">
              Chat is turned off by the host. Send them a DM 📥
            </span>
          </div>
        </div>

        <div className="sectionTwo">
          <div className="sectionTwo_A">
            <LikesCountComponent totalLikes={likesCount} />
          </div>
          <div className="sectionTwo_B">
            <LikesComponent payload={likesDelta} />
          </div>
        </div>

        {/* <div
          style={{
            backgroundColor: "red",
          }}
        >
          <button onClick={() => mockAction("like", { likes_increment: 10 })}>
            Like
          </button>
          <button onClick={() => mockAction("share")}>Share</button>
          <button onClick={() => mockAction("follow")}>Follow</button>
        </div> */}
      </div>
    </div>
  );
};

const LikesCountComponent = ({ totalLikes }: any) => {
  /**
   * States
   */
  const [goal, setGoal] = useState<number>(10000);

  return (
    <div className="totalLikes">
      <div className="totalLikes__icon">
        <ImageComponent uri="https://iili.io/fvjuoZJ.png" />
      </div>
      <div className="totalLikes__progress_wrapper">
        <div className="totalLikes__progress_visual">
          <div
            style={{ width: Math.ceil((totalLikes / goal) * 100) }}
            className="totalLikes__progress__active"
          />
        </div>

        <div className="totalLikes__wrapper">
          <span className="totalLikes__text">
            {numberFormatterUtility(totalLikes)}
          </span>
          <div className="totalLikes__textSeparator" />
          <span className="totalLikes__text">
            {numberFormatterUtility(goal)}
          </span>
        </div>
      </div>
    </div>
  );
};
