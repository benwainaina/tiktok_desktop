/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import SlotCounter from "react-slot-counter";
import { EXTERNAL_CONSTANTS } from "../constants/constants";
import { itemScalerUtility } from "./utilities/itemScaler.utility";
import { useWebsocketUtilityHook } from "./utilities/useWebsocket.utility";
import { jsonStringToObjectUtility } from "./utilities/jsonStringToObject.utility";
import "./home.component.styles";
import { LikesComponent } from "./components/likes/likes.component";
import { ImageComponent } from "./shared/components/image.component";
import { numberFormatterUtility } from "./utilities/numberFormatter.utility";
import { JoinedComponent } from "./components/joined/joined.component";
import { SharedComponent } from "./components/shares/share.component";
import { GiftComponent } from "./components/gifts/gifts.component";

const NEW_FOLLOWER_AUDIO = new Audio(
  "https://benwainaina.github.io//newfolloweralert.mp3",
);
const CHEER_AUDIO = new Audio("https://benwainaina.github.io//cheer.mp3");

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
  const [giftsDelta, setGiftsDelta] = useState<Record<string, string>>({});
  const [followsDelta, setFollowsDelta] = useState<Record<string, string>>({});
  const [likesCount, setLikesCount] = useState<number>(0);
  const [joinedDelta, setJoinedDelta] = useState<Record<string, string>>({});
  const [sharedDelta, setSharedDelta] = useState<Record<string, string>>({});
  const [newFollowers, setNewFollowers] = useState<number>(0);
  const [followedDelta, setFollowedDelta] = useState<Record<string, string>>(
    {},
  );
  const [newFollowersGoal, setNewFollowersGoal] = useState(
    EXTERNAL_CONSTANTS.totalFollowersGoal,
  );

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
          setLikesCount(likesCount + payload.likes_increment);
          setLikesDelta(payload);
          break;
        case "follow":
          const _newFollowers = newFollowers + 1;
          if (_newFollowers >= newFollowersGoal) {
            setNewFollowersGoal(
              newFollowersGoal + EXTERNAL_CONSTANTS.totalFollowersGoal,
            );
          }
          setNewFollowers(_newFollowers);
          setFollowedDelta(payload);
          break;
        case "join":
          setJoinedDelta(payload);
          break;
        case "share":
          setSharedDelta(payload);
          break;
        case "gift":
          setGiftsDelta(payload);
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
    const mockName = Math.ceil(Math.random() * 1000);
    setSocketData({
      data: JSON.stringify({
        username: mockName,
        avatar:
          "https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/13f067b94895453e03b19593f3815a02~tplv-tiktokx-cropcenter:100:100.webp?dr=14579&refresh_token=841a0110&x-expires=1768478400&x-signature=ivcCAfGl8Ozhif5I1Ya6uY340B0%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=fdd36af4&idc=my",
        name: mockName,
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

        <GiftComponent gift={giftsDelta} />

        <div className="sectionTwo">
          <div className="sectionTwo_A">
            <NewFollowersCountComponent
              newFollowers={newFollowers}
              newFollowersGoal={newFollowersGoal}
              payload={followedDelta}
            />
            <SharedComponent payload={sharedDelta} />
          </div>
          <div className="sectionTwo_B">
            <LikesComponent
              payload={likesDelta}
              totalCumulativeLikes={likesCount}
            />
          </div>
        </div>

        <div
          style={{
            backgroundColor: "red",
          }}
        >
          <button onClick={() => mockAction("like", { likes_increment: 1 })}>
            Like
          </button>
          <button onClick={() => mockAction("share")}>Share</button>
          <button onClick={() => mockAction("follow")}>Follow</button>
          <button onClick={() => mockAction("join")}>Join</button>
          <button
            onClick={() =>
              mockAction("gift", {
                gift: { repeat: Math.ceil(Math.random() * 10), name: "rose" },
              })
            }
          >
            Gift
          </button>
        </div>
      </div>
    </div>
  );
};

const LikesCountComponent = ({ totalLikes }: any) => {
  /**
   * States
   */
  const [goal, setGoal] = useState<number>(EXTERNAL_CONSTANTS.totalLikesGoal);

  useEffect(() => {
    if (totalLikes >= goal) {
      setGoal(goal + EXTERNAL_CONSTANTS.totalLikesGoal);
    }
  }, [totalLikes]);

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
            <SlotCounter value={numberFormatterUtility(totalLikes)} />
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

const NewFollowersCountComponent = ({
  payload,
  newFollowers,
  newFollowersGoal,
}: any) => {
  const [playQueue, setPlayQueue] = useState<any[]>([]);
  const [newFollow, setNewFollow] = useState<any>({});
  const [newFollowersUpdate, setNewFollowersUpdate] = useState<number>(0);
  const [newFollowersGoalUpdate, setNewFollowersGoalUpdate] =
    useState<number>(newFollowersGoal);
  useEffect(() => {
    if (newFollowers) {
      setPlayQueue([
        {
          main: NEW_FOLLOWER_AUDIO,
          secondary: CHEER_AUDIO,
          followerPayload: payload,
          payload,
          newFollowers,
          newFollowersGoal,
        },
        ...playQueue,
      ]);
      // The below option would be verry snappy and full celebration would not be
      // heard for the new follows
      // NEW_FOLLOWER_AUDIO.currentTime = 0;
      // CHEER_AUDIO.currentTime = 0;
      // NEW_FOLLOWER_AUDIO.play();
      // CHEER_AUDIO.play();
    }
  }, [newFollowers]);

  useEffect(() => {
    if (playQueue.length !== 0) {
      for (let index = 0; index < playQueue.length; index++) {
        const {
          main,
          secondary,
          payload: followerPayload,
          newFollowers: newFollowersCount,
          newFollowersGoal: newFollowersGoalCount,
        } = playQueue[index];
        main.play();
        secondary.play();
        setNewFollow(followerPayload);
        setNewFollowersUpdate(newFollowersCount);
        setNewFollowersGoalUpdate(newFollowersGoalCount);
        secondary.onended = () => {
          playQueue.pop();
          setPlayQueue([...playQueue]);
        };
      }
    }
  }, [playQueue]);

  return (
    <div className="">
      <div className="newFollower">
        <div className="newFollower__icon">
          <ImageComponent uri="https://iili.io/f4SfP14.png" />
        </div>
        <div className="newFollower__progress_wrapper">
          <div className="newFollower__progress_visual">
            <div
              style={{
                width: Math.ceil(
                  (newFollowersUpdate / newFollowersGoalUpdate) * 100,
                ),
              }}
              className="newFollower__progress__active"
            />
          </div>

          <div className="newFollower__wrapper">
            <span className="newFollower__text">
              <SlotCounter value={numberFormatterUtility(newFollowersUpdate)} />
            </span>
            <div className="newFollower__textSeparator" />
            <span className="newFollower__text">
              {numberFormatterUtility(newFollowersGoalUpdate)}
            </span>
          </div>
        </div>
      </div>
      {Object.keys(newFollow).length !== 0 && (
        <div className="followersPresent__latestFollower">
          <div className="followersPresent__latestFollower__avatar">
            <ImageComponent uri={newFollow.avatar} />
            <div className="followersPresent__latestFollower__avatar__icon">
              <ImageComponent uri="https://iili.io/f8nwiLQ.png" />
            </div>
          </div>
          <div className="followersPresent__latestFollower__info">
            <span className="followersPresent__latestFollower__info__name">
              {newFollow.name}
            </span>
            <span className="followersPresent__latestFollower__info__instruction">
              Followed the host
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
{
  /* <img src="https://iili.io/f4SdAkg.png" alt="new follow" border="0"></img> */
}
{
  /* <img src="https://iili.io/f4SfP14.png" alt="new follow (1)" border="0"></img> */
}
