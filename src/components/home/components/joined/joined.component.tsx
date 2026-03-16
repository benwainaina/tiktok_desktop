/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { AnimatedListComponent } from "../../shared/components/animatedList/animatedList.component";
import { ImageComponent } from "../../shared/components/image.component";
import "./joined.component.styles";
import Marquee from "react-fast-marquee/dist";

export const JoinedComponent = ({ payload }: any) => {
  const [userList, setUserList] = useState<any[]>([]);

  useEffect(() => {
    if (payload && Object.keys(payload).length !== 0) {
      if (userList.length >= 20) {
        userList.shift();
      }
      setUserList([...userList, payload]);
    }
  }, [payload]);

  return (
    <div className="joinedTheLiveWrapper">
      <Marquee speed={25} direction="left" delay={userList.length > 5 ? 5 : 0}>
        {userList.map((gifter) => (
          <JoinedUserComponent payload={gifter} />
        ))}
      </Marquee>
    </div>
  );
};

const JoinedUserComponent = ({ payload }: any) => {
  return (
    <div className="joinedTheLiveWrapper__user">
      <div className="followersPresent__joinedTheLive__avatar">
        <ImageComponent uri={payload.avatar} />
      </div>
      <div className="followersPresent__joinedTheLive__info">
        <span className="followersPresent__joinedTheLive__info__name">
          {payload.name}
        </span>
        <span className="followersPresent__joinedTheLive__info__instruction">
          Joined the live
        </span>
      </div>
    </div>
  );
};
