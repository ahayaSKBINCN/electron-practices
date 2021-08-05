import React from "react";
import EffectsAndLayoutEffects from "./EffectsAndLayoutEffects";

class DidMountAndEffect extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      primaryKey: [],
    };
  }

  UNSAFE_componentWillMount() {
    console.log("UNSAFE_componentWillMount")
  }

  UNSAFE_componentWillUpdate(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any) {
    console.log("UNSAFE_componentWillUpdate")

    //return snapshot as the componentDidUpdate parameter.
  }

  componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any) {
    console.log("componentDidUpdate")
  }

  componentDidMount() {
    console.log("componentDidMount")
    const primaryKey = this.state.primaryKey;
    primaryKey.push("componentDidMount");
    this.setState({
      primaryKey: primaryKey.slice()
    })
  }

  render() {
    return (
      <div>
        {this.state.primaryKey.map((item: string) => ( <div key={item}>{item}</div> ))}
      </div>
    )
  }
}

/**
 * @description effect componentDidMount layout_effect 执行顺序 layout_effects -> componentDidMount -> effects
 * @constructor
 */
const EffectsAndDidMount = () => (
  <div>
    <EffectsAndLayoutEffects/>
    <DidMountAndEffect/>
  </div>
);

EffectsAndDidMount.menu = {
  name: "函数Hooks",
  icon: "airplay",
  sort: 2
}

export default EffectsAndDidMount;
