import React, { HTMLAttributes, Suspense } from 'react';
import { imagine1, imagine2, imagine3, imagine4 } from '../../assets/images';
import { makeStyles } from "@material-ui/core/styles";
import { List } from "@material-ui/core";
import Animated from 'animejs';


const useStyle = makeStyles({
  container: {
    width: 310,
    height: 180,
    overflow: "hidden",
  },
  list: {
    listStyle: "none",
    display: "flex",
    flexDirection: "row",
    width: 310,
    height: 180,
    paddingInlineStart: 0
  },
  'list-item': {
    width: 300,
    height: 180,
    margin: "0 5px",
  },
  'list-item-img': {
    width: 300,
    height: 180,
  }
})


function InfinitelyScrollBar() {
  const styles = useStyle();
  const list = React.useRef<HTMLUListElement | null>(null);

  function init() {
    const length = list.current?.children?.length ?? 0;

    function translateX() {
      const arr = [];
      for ( let i = 1; i < length; i++ ) {
        arr.push({
          translateX: -310 * i,
          delay: 2000,
          duration: 500,
          easing:"easeOutCubic"
        });
      }
      return arr;
    }

    if ( length > 1 ) {
      Animated({
        targets: list.current,
        keyframes:translateX(),
        easing: "linear",
        loop: true,
      })
    }
  }

  React.useEffect(function selector() {
    init();
  }, [])

  const List = React.forwardRef<HTMLUListElement, { children: React.ReactNode }>((props: HTMLAttributes<HTMLUListElement>, ref) => {
    const { children, ...rest } = props;
    return <ul {...rest} ref={ref} className={styles.list}> {children}</ul>
  })
  const Item = React.forwardRef<HTMLLIElement, { src: unknown }>((props: HTMLAttributes<HTMLLIElement> & { src: any }, ref) => {
    const { src, ...rest } = props;
    return <li {...rest} ref={ref} className={styles["list-item"]}>
      <img src={src} alt="" className={styles["list-item-img"]}/>
    </li>
  })


  return (
    <Suspense fallback={"fs-loading"}>
      <div id="container" className={styles.container}>
        <List ref={list}>
          <Item src={imagine1}/>
          <Item src={imagine2}/>
          <Item src={imagine3}/>
          <Item src={imagine4}/>
          <Item src={imagine1}/>
        </List>
      </div>
    </Suspense>
  );
}

export default InfinitelyScrollBar;
