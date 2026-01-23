/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-explicit-any */
import SlotCounter from "react-slot-counter";
import { itemScalerUtility } from "../../utilities/itemScaler.utility";
import { useEffect, useState } from "react";
import { ImageComponent } from "../../shared/components/image.component";
import { numberFormatterUtility } from "../../utilities/numberFormatter.utility";
import "./likes.component.styles";
import { MOCK_DATA } from "../../../constants/mock.users.constants";
import { AnimatedListComponent } from "../../shared/components/animatedList/animatedList.component";
import { EXTERNAL_CONSTANTS } from "../../../constants/constants";
import { orderBy } from "lodash";

interface ILikeInfo {
  username: string;
  avatar: string;
  likes: number;
}

const payload = [];

export const LikesComponent = ({ payload, totalCumulativeLikes }: any) => {
  /**
   * States
   */
  const [leaderBoard, setLeaderBoard] = useState<any[]>([]);
  const [totalLikes, setTotalLikes] = useState<number>(0);
  const [lastShareOrFollow, setLastShareOrFollow] = useState<any>();
  const [goal, setGoal] = useState<number>(EXTERNAL_CONSTANTS.totalLikesGoal);

  /**
   * Effects
   */
  useEffect(() => {
    if (totalCumulativeLikes >= goal) {
      setGoal(goal + EXTERNAL_CONSTANTS.totalLikesGoal);
      setLeaderBoard(leaderBoard.map((user) => ({ ...user, totalLikes: 0 })));
    } else {
      if (payload && Object.keys(payload).length !== 0) {
        setTotalLikes(totalLikes + payload.likes_increment);
        let currentLeaderBoard = leaderBoard;
        const uniqueId = `${payload.username}_${payload.event_type}`;
        switch (payload.event_type) {
          case "like":
            const likingUser: any = leaderBoard.find(
              ({ uniqueId: leaderboardUserUniqueId }) =>
                uniqueId === leaderboardUserUniqueId,
            );
            let updatedLeaderboard = [];
            if (likingUser) {
              updatedLeaderboard = currentLeaderBoard.map((leaderboardUser) => {
                if (leaderboardUser.uniqueId === likingUser.uniqueId) {
                  leaderboardUser.totalLikes += payload.likes_increment;
                }
                return leaderboardUser;
              });
            } else {
              updatedLeaderboard = [
                ...currentLeaderBoard,
                {
                  username: payload.username,
                  totalLikes: payload.likes_increment,
                  avatar: payload.avatar,
                  name: payload.name,
                  type: payload.event_type,
                  uniqueId,
                },
              ];
            }
            currentLeaderBoard = updatedLeaderboard;
            onNewRecordComputeLeader(currentLeaderBoard);
            break;
          case "follow":
          case "gift":
            setLastShareOrFollow({
              username: payload.username,
              totalLikes: payload.likes_increment,
              avatar: payload.avatar,
              name: payload.name,
              type: payload.event_type,
              uniqueId,
              gift: payload.gift,
            });
            break;
        }
        // setLeaderBoard(currentLeaderBoard);
      }
    }
  }, [payload]);

  /**
   * Handlers
   */

  const onNewRecordComputeLeader = (currentLeaderBoard: any[]) => {
    const sortedLeaderBoard = orderBy(
      currentLeaderBoard,
      ["totalLikes", "name"],
      ["desc", "desc"],
    );
    setLeaderBoard(sortedLeaderBoard);
  };

  /**
   * Helpers
   */

  return (
    <div className="likes_wrapper">
      {/* <LikesCountComponent totalLikes={totalLikes} /> */}
      {leaderBoard.length === 0 && lastShareOrFollow === undefined ? (
        <NoLikesComponent />
      ) : (
        <LikesPresentComponent leaderBoard={leaderBoard} />
      )}
      {lastShareOrFollow && (
        <div className="likes_wrapper__followsAndShares">
          <LeaderBoardUserComponent payload={lastShareOrFollow} />
        </div>
      )}
    </div>
  );
};

const NoLikesComponent = () => {
  return (
    <div className="noLikes__wrapper">
      <div className="noLikes__instruction">Live stream stats.</div>
      <div className="noLikes__instruction__list">
        <div className="noLikes__instruction__list__likes">
          <div className="noLikes__instruction__list__likes__img">
            <ImageComponent uri="https://iili.io/fvjuoZJ.png" />
          </div>
          <span>Top likes</span>
        </div>

        <div className="noLikes__instruction__list__likes">
          <div className="noLikes__instruction__list__likes__img">
            <ImageComponent uri="https://iili.io/f8nwiLQ.png" />
          </div>
          <span>New follows</span>
        </div>

        <div className="noLikes__instruction__list__likes">
          <div className="noLikes__instruction__list__likes__img">
            <ImageComponent uri="https://iili.io/f8B1KHN.png" />
          </div>
          <span>Live shares</span>
        </div>
      </div>
    </div>
  );
};

const LikesPresentComponent = ({ leaderBoard }: any) => {
  return (
    <div className="leaderBoard">
      <AnimatedListComponent
        list={leaderBoard.slice(0, 5)}
        RefListComponent={LeaderBoardUserComponent}
        wrapperHeight={35}
      />
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

const LeaderBoardUserComponent = ({ payload }: any) => {
  return (
    <>
      {payload.type === "like" && (
        <div className="leaderBoard__user">
          <div className="leaderBoard__user__avatar">
            <ImageComponent uri={payload.avatar} />
          </div>
          <div className="leaderBoard__user__info">
            <span className="leaderBoard__user__info__username">
              {payload.name}
            </span>
            <div className="leaderBoard__user__info__likesCount">
              <div
                style={{
                  width: itemScalerUtility()().w(11),
                  height: itemScalerUtility()().w(10),
                  overflow: "hidden",
                }}
              >
                <ImageComponent uri="https://iili.io/fvjuoZJ.png" />
              </div>

              <span className="leaderBoard__user__info__likesCount__value">
                <SlotCounter
                  value={numberFormatterUtility(payload.totalLikes)}
                />
              </span>
            </div>
          </div>
        </div>
      )}

      {/* {payload.type === "follow" && (
        <div className="followersPresent__latestFollower">
          <div className="followersPresent__latestFollower__avatar">
            <ImageComponent uri={payload.avatar} />
            <div className="followersPresent__latestFollower__avatar__icon">
              <ImageComponent uri="https://iili.io/f8nwiLQ.png" />
            </div>
          </div>
          <div className="followersPresent__latestFollower__info">
            <span className="followersPresent__latestFollower__info__name">
              {payload.name}
            </span>
            <span className="followersPresent__latestFollower__info__instruction">
              Followed the host
            </span>
          </div>
        </div>
      )} */}

      {/* {payload.type === "gift" && (
        <div className="followersPresent__latestGift">
          <div className="followersPresent__latestGift__avatar">
            <ImageComponent uri={payload.avatar} />
            <div className="followersPresent__latestGift__avatar__icon">
              <ImageComponent uri="https://iili.io/fUskRHl.png" />
            </div>
          </div>
          <div className="followersPresent__latestGift__info">
            <span className="followersPresent__latestGift__info__name">
              {payload.name}
            </span>
            <span className="followersPresent__latestGift__info__instruction">
              Sent {payload.gift.name}{" "}
              <b>
                <em>x{payload.gift.repeat}</em>
              </b>
            </span>
          </div>
        </div>
      )} */}
    </>
  );
};
{
  /* <img src="https://iili.io/fUskRHl.webp" alt="gift box present icon 225155" border="0"></img> */
}
