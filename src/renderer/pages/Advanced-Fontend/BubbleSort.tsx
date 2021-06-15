import React from "react";
import { makeStyles } from "@material-ui/core";
import Animated  from "animejs";

const randomArr = function () {
  const arr: number[] = [];

  function uniqueValue(arr: number[]) {
    const value = Math.floor(Math.random() * 100);
    if ( arr.includes(value) ) {
      uniqueValue(arr)
    } else {
      arr.push(value)
    }
    return;
  }

  for ( let i = 0; i < 10; i++ ) {
    uniqueValue(arr);
  }
  return arr;
}

const useStyles = makeStyles({
  container: {
    width: "100%",
  },
  box: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  item: {
    margin: "0 5px",
    width: "50px",
    textAlign: "center",
    background: "lightcyan"
  }
})


export default function BubbleSort() {
  const styles = useStyles();
  const anyArr = randomArr()
  const list = React.useRef<{ [key: string]: { item: HTMLDivElement | null, plus: number, minus: number } }>({});
  const anime = Animated.timeline({
    easing: "easeOutQuart",
  })

  function bubbleSort(arr: typeof anyArr) {
    for ( let i = 0; i < arr.length; i++ ) {
      for ( let j = 0; j < arr.length - i - 1; j++ ) {
        if ( arr[j] > arr[j + 1] ) {
          const temp = arr[j];
          const cur = list.current[temp.toString()]
          const next = list.current[arr[j+1].toString()];
          anime.add({
            targets: cur.item,
            keyframes: [
              { translateY: -60, duration: 500 },
              { translateX: "+="+(60 * ( cur.plus + 1 - cur.minus )), duration: 500 },
            ],
            changeComplete: () => {
              cur.plus += 1
            }
          })
          arr[j] = arr[j + 1];
          anime.add({
            targets: next.item,
            keyframes: [
              { translateX: "-="+(60 * ( next.minus + 1 )), duration: 500 },
            ],
            changeComplete: () => {
              next.minus += 1;
            }
          })
          arr[j + 1] = temp;
          anime.add({
            targets: cur.item,
            keyframes: [
              { translateY: 0, duration: 500 }
            ]
          })
        }
      }
    }
  }

  React.useEffect(() => {
    // 删除空指针
    Object.keys(list.current).forEach(key => {
      if ( list.current[key] === null ) delete list.current[key]
    })
    bubbleSort(anyArr)
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        {anyArr.map((value) => ( <div className={styles.item} key={value} id={value.toString()} ref={(el) => {
          list.current = { ...list.current, [value.toString()]: { item: el, plus: 0, minus: 0 } }
        }}>{value}</div> ))}
      </div>
    </div>
  )
}
