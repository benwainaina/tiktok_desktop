import { useState } from "react";
import Marquee from "react-fast-marquee";
import "./teleprompter.component.css";
import { EXTERNAL_CONSTANTS } from "../../../constants/constants";
import { ImageComponent } from "../../shared/components/image.component";

export const TeleprompterComponent = ({ gameName }: any) => {
  const [advertContent, setAdvertContent] = useState<any[]>([
    { title: `Game name = ${gameName}.` },
    { title: EXTERNAL_CONSTANTS.message },
    { title: "love one another." },
    { title: "remember your creator in the days of your youth." },
  ]);

  return (
    <div className="advertContent__topWrapper">
      <Marquee speed={33} direction="right">
        <div className="advertContent">
          {advertContent.map((content, index) => {
            if (index === 0 || index === 2) {
              return (
                <>
                  <div className="advertContent__wrapper advertContent__wrapper__youtubeBanner">
                    <ImageComponent uri="https://iili.io/BcxpeAN.png" />
                  </div>
                  <AdvertContentComponent
                    key={index}
                    payload={{
                      ...content,
                      isLast: index === advertContent.length - 1,
                    }}
                  />
                </>
              );
            }
            return (
              <AdvertContentComponent
                key={index}
                payload={{
                  ...content,
                  isLast: index === advertContent.length - 1,
                }}
              />
            );
          })}
        </div>
      </Marquee>
    </div>
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
