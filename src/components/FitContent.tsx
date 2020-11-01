import React from 'react';
import styles from './fit.module.css';
import clsx from 'clsx';

function findDistance(
  from: React.MutableRefObject<HTMLDivElement | null>,
  to: React.MutableRefObject<HTMLDivElement | null>
): number | null {
  if (!to.current || !from.current) return null;
  return (
    to.current.getBoundingClientRect().height -
    from.current.getBoundingClientRect().height
  );
}

export function FitContent({ children }: React.PropsWithChildren<{}>) {
  const [fontSize, setFontSize] = React.useState(1.0);
  const [display, setDisplay] = React.useState(false);
  const outerRef = React.useRef<HTMLDivElement | null>(null);
  const innerRef = React.useRef<HTMLDivElement | null>(null);
  const incRef = React.useRef({ inc: 1.0, dir: 0, flipCount: 0 });
  React.useEffect(() => {
    const innerRect = innerRef.current?.getBoundingClientRect();
    const outerRect = outerRef.current?.getBoundingClientRect();
    if (!innerRect || !outerRect) return;
    const distance = findDistance(innerRef, outerRef);
    if (distance === null) return;
    const targetDistance = -distance + 40;
    if (targetDistance === 0) return;
    //innerRect.height - (outerRect.height - 40);
    console.log(
      targetDistance,
      '( ' + innerRect.height + ', ' + outerRect.height + ')'
    );
    const tooMany = incRef.current.flipCount > 10;
    if (targetDistance > 0) {
      if (incRef.current.dir > 0) {
        incRef.current.inc *= 0.25;
        incRef.current.flipCount++;
      }
      incRef.current.dir = -1;
      setFontSize((size) => size - incRef.current.inc);
    } else if (targetDistance < -40 && !tooMany) {
      if (incRef.current.dir < 0) {
        incRef.current.inc *= 0.25;
        incRef.current.flipCount++;
      }
      incRef.current.dir = 1;
      setFontSize((size) => size + incRef.current.inc);
    } else {
      setDisplay(true);
    }
  }, [fontSize]);

  const distance = display ? findDistance(innerRef, outerRef) ?? 0 : 0;
  return (
    <div
      ref={outerRef}
      className={clsx(styles.outer, !display && styles.hidden)}
      style={{ fontSize: `${fontSize}rem` }}
    >
      <div
        ref={innerRef}
        className={styles.inner}
        style={{ paddingTop: distance / 2.0 }}
      >
        {children}
      </div>
    </div>
  );
}
