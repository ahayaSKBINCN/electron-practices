import React from "react";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@material-ui/core";


const ThemeContext = React.createContext<TypedTheme>("red");

const styles = {
  color: "white",
  padding: "10px 5px",
  width: 220,
  margin: "50px 25px",
}
const FunctionContextConsumer = function () {
  const theme = React.useContext(ThemeContext);
  return <div style={{ ...styles, background: theme }}>
    FunctionContextConsumer
    <p>{theme}</p>
  </div>
}

const ClassContextConsumer = class extends React.Component<any, any> {
  static contextType = ThemeContext;

  render() {
    const { context } = this;
    return <div style={{ ...styles, background: context }}>
      ClassContextConsumer
      <p>{this.context}</p>
    </div>

  }
}

class ContextProvider extends React.Component<any, { theme: TypedTheme }> {
  state = {
    theme: "red" as TypedTheme
  }

  render() {
    return ( <ThemeContext.Provider value={this.state.theme}>
      <FormControl component="fieldset">
        <FormLabel component="legend">Theme</FormLabel>
        <RadioGroup aria-label="theme" name="TypedTheme" value={this.state.theme}
                    onChange={(event, value) => this.setState({
                      theme: value as TypedTheme
                    })}>
          <FormControlLabel control={<Radio/>} label="red" value="red"/>
          <FormControlLabel control={<Radio/>} label="blue" value="blue"/>
          <FormControlLabel control={<Radio/>} label="green" value="green"/>
          <FormControlLabel control={<Radio/>} label="orange" value="orange"/>
        </RadioGroup>
      </FormControl>
      <FunctionContextConsumer/>
      <ClassContextConsumer/>
    </ThemeContext.Provider> )
  }
}

type ContextExports = typeof ContextProvider & {
  menu?: {
    name?: string;
    icon?: string;
    sort?: number;
  }
}

( ContextProvider as ContextExports ).menu = {
  name: "上下文",
  icon: "list_alt",
  sort: 3
}

export default ContextProvider as ContextExports;
