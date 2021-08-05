/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { List,ListItem } from "@material-ui/core";
// core components
import styles from "../../assets/jss/components/footer.styles";

const useStyles = makeStyles(styles);

//@ts-ignore
export default function Footer(props:any) {
  const classes = useStyles({});
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a href="#home" className={classes.block}>
                Home
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="#company" className={classes.block}>
                Company
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="#portfolio" className={classes.block}>
                Portfolio
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="#blog" className={classes.block}>
                Blog
              </a>
            </ListItem>
          </List>
        </div>
        <p className={classes.right}>
          <span>
            &copy; {1900 + (new Date()).getFullYear()}{" "}
            <a
              href="https://www.creative-tim.com?ref=mdr-footer"
              target="_blank"
              className={classes.a}
            >
              Creative Tim
            </a>
            , made with love for a better web
          </span>
        </p>
      </div>
    </footer>
  );
}
