import React from 'react';
import {
  makeStyles
} from '@material-ui/core';
import classNames from "classnames";

const useStyles = makeStyles({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap"
  },
  box: {
    width: 100,
    height: 100,
    background: "#fff022",
    "&.v1": {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center"
    },
    "&.v2,&.v3,&.v4": {
      position: "relative",
    },
    "&.v5": {
      display: "grid",
    },
    "&.v6": {
      display: "flex",
    },
  },
  subBox: {
    background: "darkcyan",
    height: 50,
    width: 50,
    "&.v2,&.v3,&.v4": {
      position: "absolute",
    },
    "&.v2": {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
    "&.v3": {
      top: "50%",
      left: "50%",
      marginLeft: -25,
      marginTop: -25,
    },
    "&.v4": {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      margin: "auto"
    },
    "&.v5": {
      justifySelf: "center",
      alignSelf: "center",
    },
    "&.v6": {
      margin: "auto",
    },

  }
})

function CenterBox() {
  const styles = useStyles();
  const SubBox = function ({ subClazz }: { subClazz: string }) {
    return ( <div className={classNames(styles.box, subClazz)}>
      <div className={classNames(styles.subBox, subClazz)}/>
    </div> )
  }

  return <div className={styles.container}>
    <SubBox subClazz="v1"/>
    <SubBox subClazz="v2"/>
    <SubBox subClazz="v3"/>
    <SubBox subClazz="v4"/>
    <SubBox subClazz="v5"/>
    <SubBox subClazz="v6"/>
  </div>
}

CenterBox.menu = {
  name: "居中模型",
  icon: "format_align_center",
  sort: 3,
}

export default CenterBox;
