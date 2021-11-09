import React, { Fragment, useEffect, useRef, useState } from 'react';
import './Tabs.scss';

export const Tabs: React.FC<ITabs> = ({
  titleTabs,
  bodyTabs,
  contentBody,
  classNameHeaderContainer,
  classNameHeader,
  initialNum = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [num, setNum] = useState(initialNum);
  const handleSelectTab = (number: number) => {
    setNum(number);
  };
  useEffect(() => {
    const scrollWidth = ref.current?.scrollWidth;
    if (num > 1 && scrollWidth) {
      ref.current?.scrollTo({ left: scrollWidth, top: scrollWidth, behavior: 'smooth' });
    }
    if (num === 1 && scrollWidth) {
      ref.current?.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
    }
  }, [ref, num]);

  useEffect(() => {
    setNum(initialNum);
  }, [initialNum]);

  return (
    <div className="tabs">
      <div className={`${classNameHeaderContainer}`}>
        <div className={`tabs__header ${classNameHeader}`} ref={ref}>
          {titleTabs.map((item, i) => {
            return (
              <Fragment key={i}>
                {(!contentBody || (contentBody && contentBody[i].trim().length > 0)) && (
                  <div
                    className={num === i ? 'tabs__title tabs__title--select' : 'tabs__title'}
                    onClick={() => handleSelectTab(i)}
                  >
                    {item}
                  </div>
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
      <div className="tabs__body">
        <div className={'tabs__content'}>{bodyTabs[num]}</div>
      </div>
    </div>
  );
};
