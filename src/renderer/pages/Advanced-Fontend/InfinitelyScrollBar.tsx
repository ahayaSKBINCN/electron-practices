import React, { HTMLAttributes, Suspense } from 'react';
import { imagine1, imagine2, imagine3, imagine4 } from '../../assets/images';
import { makeStyles } from "@material-ui/core/styles";
import { Button, List } from "@material-ui/core";
import { remote } from 'electron';

console.log(remote);


const useStyle = makeStyles({
  container: {},
  list: {
    listStyle: "none",
    display: "flex",
    flexDirection: "row",
    width: 100,
    height: 80,
    overflow: "hidden"
  },
  'list-item': {
    width: 100,
    height: 80,
  },
  'list-item-img': {
    width: 100,
    height: 80,
  }
})


function InfinitelyScrollBar() {
  const styles = useStyle();
  const list = React.useRef<HTMLUListElement | null>(null);
  const boundary = React.useRef<[ Element | null, Element | null ]>([ null, null ]);

  console.log(window.api)
  console.log("eval", eval('require("electron")'));
  React.useEffect(function selector() {
    if ( list.current ) {
      const list_children = list.current?.children!;
      boundary.current[0] = list_children.item(0);
      boundary.current[1] = list_children.item(list_children.length - 1);
    }
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
        </List>
      </div>
    </Suspense>
  );
}

export default InfinitelyScrollBar;
