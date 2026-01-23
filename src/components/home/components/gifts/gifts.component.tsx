import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import "./gifts.component.css";
import { ImageComponent } from "../../shared/components/image.component";
import { MOCK_GIFTS } from "./mockData";
const GIFT_AUDIO = new Audio("https://benwainaina.github.io//gift.mp3");
const PARTY_WHISTLE = new Audio(
  "https://benwainaina.github.io//party-whistle.mp3",
);

export const GiftComponent = ({ gift }: any) => {
  const [gifts, setGifts] = useState<any[]>([]);

  useEffect(() => {
    if (Object.keys(gift).length !== 0) {
      GIFT_AUDIO.play();
      GIFT_AUDIO.onended = () => PARTY_WHISTLE.play();
      const userGiftExists = gifts.find(
        (userGift) =>
          userGift.username === gift.username &&
          userGift.gift.name.toLowerCase() === gift.gift.name.toLowerCase(),
      );
      if (userGiftExists) {
        const updatedGifts = gifts.map((existingGifter) => {
          if (existingGifter.username === userGiftExists.username) {
            existingGifter.gift.repeat += gift.gift.repeat;
          }
          return existingGifter;
        });
        setGifts(updatedGifts);
      } else {
        setGifts([...gifts, gift]);
      }
    }
  }, [gift]);

  return (
    <Marquee speed={50}>
      <div className="giftsWrapper">
        {gifts.map((giftUser, index) => (
          <GiftUserComponent key={index} payload={giftUser} />
        ))}
      </div>
    </Marquee>
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
