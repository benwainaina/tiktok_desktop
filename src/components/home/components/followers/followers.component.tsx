/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { ImageComponent } from "../../shared/components/image.component";
import "./followers.component.styles";

interface IFollowerInfo {
  avatar: string;
  event_type: string;
  name: string;
  username: string;
}

export const FollowersComponent = ({ payload: newFollower }: any) => {
  /**
   * States
   */
  const [followers, setFollowers] = useState<IFollowerInfo[]>([]);

  /**
   * Effects
   */
  useEffect(() => {
    if (Object.keys(newFollower).length !== 0) {
      const currentFollowers = followers;
      setFollowers([newFollower, ...currentFollowers]);
    }
  }, [newFollower]);

  return (
    <div className="followers_wrapper">
      {followers.length === 0 ? (
        <NoFollowersComponent />
      ) : (
        <FollowersPresentComponent followers={followers} />
      )}
    </div>
  );
};

const NoFollowersComponent = () => {
  return (
    <div className="noFollowers">
      <span className="noFollowers__instruction">
        New followers will appear here
      </span>
    </div>
  );
};

const FollowersPresentComponent = ({ followers }: any) => {
  const _listRenderItem = ({ item }: Record<string, any>) => {
    return <NewFollowerWrapperComponent payload={item} />;
  };

  const _listItemKeyExtractor = ({ username }: Record<string, any>) => {
    return username;
  };

  return (
    <div className="followersPresent">
      <div className="followersPresent__count">
        <div className="followersPresent__count__icon">
          <ImageComponent uri="https://iili.io/fvjuIGR.png" />
        </div>

        <div className="followersPresent__count__value_wrapper">
          <span className="followersPresent__count__value_wrapper__value">
            +{followers.length}
          </span>
        </div>
      </div>
      <div
        style={{
          overflow: "hidden",
        }}
      >
        {(followers as any).map((user: any, index: number) => (
          <NewFollowerWrapperComponent key={index} payload={user} />
        ))}
      </div>
    </div>
  );
};

const NewFollowerWrapperComponent = ({ payload }: any) => (
  <div className="followersPresent__latestFollower">
    <div className="followersPresent__latestFollower__avatar">
      <ImageComponent uri={payload.avatar} />
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
);
