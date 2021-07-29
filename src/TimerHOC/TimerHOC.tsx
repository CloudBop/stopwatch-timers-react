import * as React from 'react';
export type BaseProps = Readonly<{
  frameRate: number;
}>;
export type Options<Props extends BaseProps> = Readonly<{
  update: (state: Props) => Props;
}>;
export const MAX_FPS = 60;
export const withAnimation = <Props extends BaseProps>(options: Options<Props>) => {
  return (Component: React.ComponentType<Props>): React.ComponentClass<Props> => {
    return class Animation extends React.Component<Props, Props> {
      private frameCount = 0;
      private frameId = 0;
      constructor(props: Props) {
        super(props);
        this.state = props;
      }
      public render() {
        return <Component {...this.state} />;
      }
      public componentDidMount() {
        this.update();
      }
      public componentWillUnmount() {
        if (this.frameId) {
          window.cancelAnimationFrame(this.frameId);
        }
      }
      private update = () => {
        this.frameCount++;
        if (this.frameCount >= Math.round(MAX_FPS / this.props.frameRate)) {
          this.setState(options.update);
          this.frameCount = 0;
        }
        this.frameId = window.requestAnimationFrame(this.update);
      };
    };
  };
};
