import * as React from 'react';
// import * as ReactDOM from 'react-dom';

function degreesToRadians(degrees: number): number {
  return degrees / 180 * Math.PI - Math.PI / 2;
}
const radius = 100;
const size = radius * 2;
export const MAX_FPS = 60;

interface StopWatchProps {
  initialDegree: number;
  frameRate: number;
}
interface State {
  degree: number;
}
export default class StopWatch extends React.Component<StopWatchProps, State> {
  private increment = 3;
  public constructor(props: StopWatchProps) {
    super(props);
    this.state = {
      degree: props.initialDegree
    };
    this.increment = MAX_FPS / props.frameRate;
  }

  //
  public componentDidMount() {
    console.log('this.increment', this.increment);
    this.update();
  }
  //
  //
  private update = () => {
    this.setState((previous: State): State => {
      return {
        degree: (previous.degree + this.increment) % 360
      };
    });
    window.requestAnimationFrame(this.update);
  };

  public render() {
    const radians = degreesToRadians(this.state.degree);
    // line begin at the circle center
    const lineX1 = radius;
    const lineY1 = radius;
    // Calculate line end from parametric expression for circle
    const lineX2 = lineX1 + radius * Math.cos(radians);
    const lineY2 = lineY1 + radius * Math.sin(radians);
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={radius} cy={radius} r={radius} fill="yellow" />
        <line x1={lineX1} y1={lineY1} x2={lineX2} y2={lineY2} strokeWidth="1" stroke="red" />
        <text x="70" y="50" fill="black">
          {`FPS: ${this.props.frameRate}`}
        </text>
      </svg>
    );
  }
}
// ReactDOM.render(<StopWatch initialDegree={0} />, document.getElementById('root'));
