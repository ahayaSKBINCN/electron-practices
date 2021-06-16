import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import Animated from "animejs";
import Button from "../../components/CustomButtons/Button";


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

const arr = randomArr();

const useStyles = makeStyles({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  box: {
    width: 610,
    display: "flex",
    flexDirection: "row",

  },
  item: {
    margin: "0 5px",
    width: 50,
    height: 50,
    lineHeight: "50px",
    textAlign: "center",
    background: "lightcyan"
  },
  "btn-group": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center"
  }
})

interface BubbleSortConfig {
  arr?: number[];
  type?: "normal" | "best";
  boxRef: React.MutableRefObject<HTMLDivElement | null>;


}

const useBubbleSort = function (config: BubbleSortConfig) {
  const styles = useStyles()
  const {
    arr,
    type: _type,
    boxRef
  } = config;
  if ( arr && !Array.isArray(arr) ) throw new TypeError(`Typeof [config.arr] must be Array<Number>, but got ${typeof arr}`);
  const targets = arr ?? randomArr();
  const [ type, $type ] = React.useState<"normal" | "best">(_type ?? "normal");

  const collection = React.useRef<{ [key: string]: { item: HTMLDivElement | null, plus: number, minus: number } } | null>(null);
  const anime = Animated.timeline({
    easing: "easeOutQuart",
    autoplay: false
  })
  const startAnimation = function (sIdx: number, tIdx: number, anime: Animated.AnimeTimelineInstance, arr: number[], col: typeof collection) {
    const temp = arr[sIdx];
    const cur = collection.current![temp.toString()]
    const next = collection.current![arr[tIdx].toString()];
    if ( !cur || !next ) return;
    anime.add({
      targets: cur.item,
      keyframes: [
        { translateY: -60, duration: 500 },
        { translateX: "+=" + ( 60 * ( cur.plus + 1 - cur.minus ) ), duration: 500 },
      ],
      changeComplete: () => {
        cur.plus += 1
      }
    })
    arr[sIdx] = arr[tIdx];
    anime.add({
      targets: next.item,
      keyframes: [
        { translateX: "-=" + ( 60 * ( next.minus + 1 ) ), duration: 500 },
      ],
      changeComplete: () => {
        next.minus += 1;
      }
    })
    arr[tIdx] = temp;
    anime.add({
      targets: cur.item,
      keyframes: [
        { translateY: 0, duration: 500 }
      ]
    })

  }
  const normal = function (arr: typeof targets) {
    for ( let i = 0; i < arr.length; i++ ) {
      for ( let j = 0; j < arr.length - i - 1; j++ ) {
        if ( arr[j] > arr[j + 1] ) {
          startAnimation(j, j + 1, anime, arr, collection);
        }
      }
    }
  }
  const startAnimated = React.useCallback(() => {
    const cb = type === "normal" ? normal : best;
    cb(targets);
  }, [ type ])

  const best = function (arr: typeof targets) {
    let i = arr.length - 1;

    while ( i > 0 ) {
      let pos = 0;
      for ( let j = 0; j < i; j++ ) {
        if ( arr[j] > arr[j + 1] ) {
          pos = j;
          startAnimation(j, j + 1, anime, arr, collection);
        }
      }
      i = pos;
    }
  }
  useEffect(() => {
    // 删除已存在的Node
    if ( collection.current && Object.keys(collection.current).length > 0 ) {
      collection.current = {}
      while(boxRef.current?.firstChild){
        boxRef.current?.removeChild(boxRef.current?.firstChild);
      }
    }

    targets.forEach((value) => {
      const el = document.createElement("div");
      el.className = styles.item;
      el.append(value.toString());
      if ( !collection.current ) {
        collection.current = {}
      }
      collection.current[value.toString()] = {
        item: el,
        plus: 0,
        minus: 0
      }
      boxRef.current!.append(el);
    });
  }, [ targets ]);
  useEffect(() => {
    if ( collection.current ) {
      // 删除空指针
      Object.keys(collection.current).forEach(key => {
        if ( collection.current![key] === null ) delete collection.current![key]
      })
      startAnimated()
    }
  }, [ collection.current, type ]);
  return {
    play: anime.play,
    pause: anime.pause,
    restart: anime.restart,
    reverse: anime.reverse,
    styles
  };
}


export default function BubbleSort() {
  const box = React.useRef<HTMLDivElement | null>(null);
  const {
    play,
    pause,
    restart,
    styles
  } = useBubbleSort({
    arr,
    type: "normal",
    boxRef: box
  })


  return (
    <div className={styles.container}>
      <div className={styles.box} ref={box}/>
      <div className={styles["btn-group"]}>
        <Button onClick={play} size="sm" color="primary">PLAY</Button>
        <Button onClick={pause} size="sm" color="primary">PAUSE</Button>
        <Button onClick={restart} size="sm" color="primary">RESTART</Button>
      </div>
    </div>
  )
}
