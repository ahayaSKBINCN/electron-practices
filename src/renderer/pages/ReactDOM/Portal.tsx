import React from "react";
import ReactDOM from "react-dom";
import { Portal as MUIPortal } from "@material-ui/core"
import Button from "../../components/CustomButtons/Button";

interface RenderPortalProps {
  group: string[];
  container: React.MutableRefObject<HTMLUListElement | null>;
}

const RenderPortal = function ({ group, container }: RenderPortalProps) {
  const elGroup = group.map(str => ( <li key={str}>{str}</li> ));
  if ( container.current )
    return ReactDOM.createPortal(elGroup, container.current!, "React_render_portal");
  return <div/>
}

/**
 *
 * @constructor
 */
const Portal = function () {

  const [ state, $state ] = React.useState<string[]>([]);
  const container = React.useRef<HTMLUListElement | null>(null);


  const handleClick = function () {
    const _state = state.slice();
    _state.push("str" + _state.length);
    $state(_state);
  }

  return (
    <React.Fragment>
      <Button onClick={handleClick} color="primary">添加字符串</Button>
      <RenderPortal group={state} container={container}/>
      <ul ref={container} style={{ width: 200 }}/>
    </React.Fragment> )
}


Portal.menu = {
  name: "独立节点",
  sort: 1,
  icon: "view_comfy",
}

export default Portal;
