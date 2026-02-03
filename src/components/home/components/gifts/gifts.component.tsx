import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import "./gifts.component.css";
import { ImageComponent } from "../../shared/components/image.component";
import { EXTERNAL_CONSTANTS } from "../../../constants/constants";

export const GiftComponent = () => {
  const [advertContent, setAdvertContent] = useState<any[]>([
    { title: EXTERNAL_CONSTANTS.gameName },
    { title: "No gifts accepted!!!!" },
    { title: EXTERNAL_CONSTANTS.message },
    { title: "No inappropriate / unethical comments!" },
    { title: "love one another." },
    { title: "remember your creator in the days of your youth." },
  ]);

  return (
    <Marquee speed={50}>
      <div className="advertContent">
        {advertContent.map((content, index) => (
          <AdvertContentComponent
            key={index}
            payload={{
              ...content,
              isLast: index === advertContent.length - 1,
            }}
          />
        ))}
      </div>
    </Marquee>
  );
};

const AdvertContentComponent = ({ payload }: any) => {
  return (
    <div className="advertContent__wrapper">
      {payload.icon && (
        <div className="advertContent__content__img">
          <img
            className="advertContent__content__wrapper__img"
            src={payload.icon}
            alt=""
          />
        </div>
      )}
      <span className="advertContent__content__instructions">
        {payload.title}
      </span>
      {payload.isLast && (
        <div className="advertContent__content__divider"> </div>
      )}
    </div>
  );
};

const GiftUserComponent = ({ payload }: any) => {
  return (
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
  );
};
