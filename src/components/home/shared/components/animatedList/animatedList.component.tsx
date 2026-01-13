/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTransition, animated } from "@react-spring/web";
import "./animatedList.component.css";

export const AnimatedListComponent = ({
  list,
  RefListComponent,
  wrapperHeight,
}: any) => {
  let height = 0;
  const transitions = useTransition(
    list.map((data: any) => ({
      ...data,
      y: (height += wrapperHeight) - wrapperHeight,
    })),
    {
      key: (item: any) => item.name,
      from: { height: 0, opacity: 0 },
      leave: { height: 0, opacity: 0 },
      enter: ({ y, height }) => ({ y, height, opacity: 1 }),
      update: ({ y, height }) => ({ y, height }),
    }
  );

  return (
    <div className="list" style={{ height }}>
      {transitions((style: any, item: any, t: any, index: any) => (
        <animated.div
          className="card"
          style={{ zIndex: list.length - index, ...style }}
        >
          <RefListComponent payload={item} />
        </animated.div>
      ))}
    </div>
  );
};
