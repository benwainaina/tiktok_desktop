/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { AnimatedListComponent } from "../../shared/components/animatedList/animatedList.component";
import { ImageComponent } from "../../shared/components/image.component";
import "./joined.component.styles";

export const JoinedComponent = ({ payload }: any) => {
  const [userList, setUserList] = useState<any[]>([]);

  useEffect(() => {
    const currentUserList = userList;
    if (payload && Object.keys(payload).length !== 0) {
      setUserList([payload, ...currentUserList]);
    }
  }, [payload]);

  return (
    <div className="joinedTheLiveWrapper">
      <AnimatedListComponent
        list={userList.slice(0, 2)}
        RefListComponent={JoinedUserComponent}
        wrapperHeight={33}
      />
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
