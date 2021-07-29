import * as React from 'react';
import { BaseProps, withAnimation } from '../../TimerHOC/TimerHOC';
function degreesToRadians(degree: number): number {
  return degree / 180 * Math.PI - Math.PI / 2;
}
const radius = 100;
const size = radius * 2;
type Props = Readonly<{
  degree: number;
}> &
  BaseProps;
const StopWatch: React.SFC<Props> = props => {
  const radians = degreesToRadians(props.degree);
  const lineX1 = radius;
  const lineY1 = radius;
  const lineX2 = lineX1 + radius * Math.cos(radians);
  const lineY2 = lineY1 + radius * Math.sin(radians);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={radius} cy={radius} r={radius} fill="yellow" />
      <line x1={lineX1} y1={lineY1} x2={lineX2} y2={lineY2} strokeWidth="1" stroke="red" />
      <text x="70" y="50" fill="black">
        {`FPS: ${props.frameRate}`}
      </text>
    </svg>
  );
};
const options = {
  update: (props: Props): Props => {
    return {
      ...props,
      degree: (props.degree + 180 / props.frameRate) % 360
      // degree: (props.degree + this.increment) % 360
    };
  }
};
const WithAnimation = withAnimation(options)(StopWatch);
export default () => (
  <div style={{ display: 'flex' }}>
    <WithAnimation degree={0} frameRate={30} />
    <WithAnimation degree={0} frameRate={10} />
    <WithAnimation degree={0} frameRate={5} />
  </div>
);
