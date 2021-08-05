import React from "react";

interface EffectsAndLayoutEffects {

}

/**
 * @description useEffect 不会阻塞视图，这会让应用看起来更快，每次重新渲染都会重新生成Effect，替换掉之前的。
 * 而在某些情况下例如测量布局，需要使用layoutEffect来阻塞布局
 *
 * @param props
 * @constructor
 */
function EffectsAndLayoutEffects(props: EffectsAndLayoutEffects) {
  const [ state, $state ] = React.useState<string[]>([]);
  React.useEffect(() => {
    console.log("effects");
    state.push("effects");
    $state(state.slice());
  }, []);

  React.useLayoutEffect(() => {
    console.log("layout_effects");
    state.push("layout_effect");
    $state(state.slice());
  }, []);

  return (
    <div>
      {state.map((item,index) => ( <div key={item+index}>{item}</div> ))}
    </div>
  )
}

EffectsAndLayoutEffects.menu = {
  name: "生命周期",
  icon: "alternate_email",
  sort: 1
}

export default EffectsAndLayoutEffects;
