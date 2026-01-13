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
  } = useWebsocketUtilityHook();

  /**
   * States
   */
  const [likesDelta, setLikesDelta] = useState<Record<string, string>>({});
  const [followsDelta, setFollowsDelta] = useState<Record<string, string>>({});

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
          setLikesDelta(payload);
          break;

        // case "follow":
        //   setFollowsDelta(payload);
        //   break;
      }
    }
  }, [socketData]);

  useEffect(() => {
    () => {
      closeSocket();
    };
  }, []);

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
            {/* <LikesComponent payload={likesDelta} /> */}
          </div>
          <div className="sectionTwo_B">
            {/* <FollowersComponent payload={followsDelta} /> */}
            <LikesComponent payload={likesDelta} />
          </div>
        </div>
      </div>
    </div>
  );
};
