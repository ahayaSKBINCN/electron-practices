import React from "react";

interface ASTProps {
  step: number

}

interface SState {
  count: number;
}


class AST extends React.Component<ASTProps, SState> {
  constructor(props: ASTProps) {
    super(props);
    this.state = {
      count: 1
    }
  }

  getSnapshotBeforeUpdate(prevProps: Readonly<ASTProps>, prevState: Readonly<SState>): any | null {
    console.log(prevProps, prevState);
    return {
      prevProps,
      prevState
    }
  }

  static getDerivedStateFromProps() {
    return null;
  }

  componentDidUpdate(prevProps: Readonly<ASTProps>, prevState: Readonly<SState>, snapshot?: any) {
    console.log("componentDidUpdate", prevProps, prevProps, snapshot);
  }

  shouldComponentUpdate(nextProps: Readonly<ASTProps>, nextState: Readonly<SState>, nextContext: any): boolean {
    console.log("shouldComponentUpdate", nextContext);
    return true;
  }

  componentDidMount() {
    this.setState((state, props) => {
      const { step = 1 } = props;
      const { count } = state;
      return {
        count: count + step
      }
    }, () => console.log("thisState", this.state))
  }

  render() {
    console.log("render", this.state)
    const {
      count
    } = this.state;
    return (
      <div>{count}</div>
    )
  }
}


( AST as MenuComponent<typeof AST> ).menu = {
  name: "AST",
  sort: 2,
  icon: "dashboard",
}

export default AST as MenuComponent<typeof AST>;
