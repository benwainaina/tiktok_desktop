/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { AnimatedListComponent } from "../../shared/components/animatedList/animatedList.component";
import { ImageComponent } from "../../shared/components/image.component";
import "./share.component.styles";

export const SharedComponent = ({ payload }: any) => {
  const [userList, setUserList] = useState<any[]>([]);

  useEffect(() => {
    if (payload && Object.keys(payload).length !== 0) {
      setUserList([payload]);
    }
  }, [payload]);

  return (
    <div className="sharedTheLiveWrapper">
      <AnimatedListComponent
        list={userList.slice(0, 1)}
        RefListComponent={SharedUserComponent}
        wrapperHeight={35}
      />
    </div>
  );
};

const SharedUserComponent = ({ payload }: any) => {
  return (
    <div className="followersPresent__latestShare">
      <div className="followersPresent__latestShare__avatar">
        <ImageComponent uri={payload.avatar} />
        <div className="followersPresent__latestShare__avatar__icon">
          <ImageComponent uri="https://iili.io/f8B1KHN.png" />
        </div>
      </div>
      <div className="followersPresent__latestShare__info">
        <span className="followersPresent__latestShare__info__name">
          {payload.name}
        </span>
        <span className="followersPresent__latestShare__info__instruction">
          Shared the live
        </span>
      </div>
    </div>
  );
};
