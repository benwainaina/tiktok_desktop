/* eslint-disable @typescript-eslint/no-explicit-any */
import { itemScalerUtility } from "../../utilities/itemScaler.utility";
import { useEffect, useRef, useState } from "react";
import { ImageComponent } from "../../shared/components/image.component";
import { numberFormatterUtility } from "../../utilities/numberFormatter.utility";
import "./likes.component.styles";
import { MOCK_DATA } from "../../../constants/mock.users.constants";
import { AnimatedListComponent } from "../../shared/components/animatedList/animatedList.component";

interface ILikeInfo {
  username: string;
  avatar: string;
  likes: number;
}

const payload = [];

export const LikesComponent = ({ payload }: any) => {
  /**
   * States
   */
  const [leaderBoard, setLeaderBoard] = useState<any[]>([]);
  const [totalLikes, setTotalLikes] = useState<number>(0);

  /**
   * Effects
   */
  useEffect(() => {
    if (payload && Object.keys(payload).length !== 0) {
      setTotalLikes(totalLikes + payload.likes_increment);
      const currentLeaderBoard = leaderBoard;
      const userInLeaderboard: any = leaderBoard.find(
        ({ username }) => username === payload.username
      );
      if (userInLeaderboard) {
        userInLeaderboard.totalLikes += payload.likes_increment;
      } else {
        currentLeaderBoard.push({
          username: payload.username,
          totalLikes: payload.likes_increment,
          avatar: payload.avatar,
          name: payload.name,
        });
      }
      onNewRecordComputeLeader(currentLeaderBoard);
      setLeaderBoard(currentLeaderBoard);
    }
  }, [payload]);

  /**
   * Handlers
   */

  const onNewRecordComputeLeader = (currentLeaderBoard: any[]) => {
    currentLeaderBoard.sort((a, b) => (a.totalLikes < b.totalLikes ? 1 : -1));
  };

  /**
   * Helpers
   */

  return (
    <div className="likes_wrapper">
      <LikesCountComponent totalLikes={totalLikes} />
      {leaderBoard.length === 0 ? (
        <NoLikesComponent />
      ) : (
        <LikesPresentComponent leaderBoard={leaderBoard} />
      )}
    </div>
  );
};

const NoLikesComponent = () => {
  return (
    <div className="noLikes__wrapper">
      <span className="noLikes__instruction">
        Top{" "}
        <em>
          <b>likers</b>
        </em>{" "}
        will appear here.
      </span>
    </div>
  );
};

const LikesPresentComponent = ({ leaderBoard }: any) => {
  const _listRenderItem = ({ item }: Record<string, any>) => {
    return <LikesLeaderBoardUserComponent payload={item} />;
  };

  const _listItemKeyExtractor = ({ username }: Record<string, any>) => {
    return username;
  };

  return (
    <div className="leaderBoard">
      <AnimatedListComponent
        list={leaderBoard.slice(0, 10)}
        RefListComponent={LikesLeaderBoardUserComponent}
        wrapperHeight={50}
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

const LikesLeaderBoardUserComponent = ({ payload }: any) => {
  return (
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
            {numberFormatterUtility(payload.totalLikes)}
          </span>
        </div>
      </div>
    </div>
  );
};
