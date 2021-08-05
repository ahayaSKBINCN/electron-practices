import React, { useState } from "react";
import Button from "../../components/CustomButtons/Button";


const MemorizationBtn = React.memo(Button);


const DocumentProfiler = function () {
  const [ state, $state ] = useState<Map<string, any>>(new Map());

  const onRenderCallback: React.ProfilerOnRenderCallback = function (
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
  ) {
    state.set(id, `phase: ${phase}, actualDuration: ${actualDuration}, baseDuration: ${baseDuration}, startTime: ${startTime}, commitTime:${commitTime}`);
    $state(state);
  }
  return(
  <React.Fragment>
    <React.Profiler id={"MemorizationBtn"} onRender={onRenderCallback}>
      <MemorizationBtn>ahaya</MemorizationBtn>
    </React.Profiler>
    <React.Profiler id={"Button"} onRender={onRenderCallback}>
      <Button>ahaya</Button>
    </React.Profiler>
    {Array.from(state).map(([name,desc])=>(
      <div key={name}>
        <h5>{name}</h5>
        <p>{desc}</p>
      </div>
    ))}
  </React.Fragment>)
}

DocumentProfiler.menu = {
  name: "性能测试",
  icon: "dashboard",
  sort: 2
};

export default DocumentProfiler;
