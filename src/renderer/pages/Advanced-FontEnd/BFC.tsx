import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";

const useStyles = makeStyles({
  container: {
    background: "darkcyan",
    color: "white",
    padding: "5px 10px",
  },
  box: {
    "&.hidden": {
      overflow: "hidden",
    }
  },
  p: {
    margin: 50,
    lineHeight: "50px",
    background: "red",
    padding: 5,
  }
})
function willMemorized (value: number){
  console.log("Will Memorized", value);
  return value+1;
}
const willMemorizedV = function (){
  console.log("vt")
  return willMemorized;
}

// function Child( { getNum }:any){
//   console.log(123)
//   return <div>{getNum()}</div>
// }

const Child = React.memo(function({getNum,extraKey}:any){
  console.log(extraKey)
return <div>{getNum()}</div>
})

export default function BFC() {
  const [value,$value] = React.useState(0);
  const getNum = () => {
    console.log("123", value);
    return value;
  }
  const memoed = React.useMemo(()=>getNum,[value])

  const [vb,$vb]= React.useState(0);
  const memorized = React.useCallback(getNum,[value]);
  const styles = useStyles();
  const plus =()=> $value((value)=>(value+1));
  const minus = ()=>$value((value)=>(value-1));
  const plusV = ()=>$vb((value)=>(value+1));
  const minusV = ()=>$vb((value)=>(value-1));
  return <div className={styles.container}>
    <div>
      <h5> 清除浮动实现BFC </h5>
      <button onClick={plus}>++</button>
      <button onClick={minus}>--</button>
      <button onClick={plusV}>++</button>
      <button onClick={minusV}>--</button>
      <Child getNum={memoed} extraKey="first"/>
      <Child getNum={memorized} extraKey="second"/>
      <Child getNum={getNum} extraKey="third"/>
      <ul>
        <li>元素为body根元素;</li>
        <li>使用绝对定位，position：absolute， flex;</li>
        <li>display 为 inline-block、table-cells、flex</li>
        <li>overflow 除了 visible 以外的值(hidden、auto、scroll)</li>
      </ul>
    </div>
    <div className={classNames(styles.box)}>
      <p className={styles.p}>text</p>
      <p className={styles.p}>text</p>
    </div>
    <div className={classNames(styles.box, "hidden")}>
      <p className={styles.p}>overflow: hidden</p>
      <p className={styles.p}>text</p>
    </div>
  </div>
}

BFC.menu = {
  name: "BFC",
  icon: "list",
  sort: 4

}
