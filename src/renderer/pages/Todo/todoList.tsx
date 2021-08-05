import React from "react";
import { makeStyles, List, ListItem, ListItemText, Input, FormControl, } from "@material-ui/core";
import { blackColor, hexToRgb } from "../../assets/jss/theme";
import { useForm } from "react-hook-form";

interface Item {
  name: string;
  id: number;
}

const useStyles = makeStyles({
  container: {
    width: "100%",
  },
  list: {
    width: 400,
  },
  listItem: {
    transitionDuration: ".5s",
    "&:hover": {
      boxShadow: `0 10px 30px -12px rgba(${hexToRgb(
        blackColor
      )}, 0.42), 0 4px 25px 0px rgba(${hexToRgb(
        blackColor
      )}, 0.12), 0 8px 10px -5px rgba(${hexToRgb(blackColor)}, 0.2)`,
    },
  }
})

const getToDoList = function () {
  let list = [], a = 10;
  while ( a > 0 ) {
    list.push({ name: `代办${a}`, id: a });
    a--;
  }
  return list;
}


export default function TodoList() {
  const styles = useStyles();
  const [ list, $list ] = React.useState<Item[]>(getToDoList());
  const { register, handleSubmit, watch} = useForm();

  return (
    <div className={styles.container}>
      <List className={styles.list}>
        {list.map((item) => (
          <ListItem key={item.id} className={styles.listItem}>
            <ListItemText>{item.name}</ListItemText>
          </ListItem>
        ))}
      </List>
    </div>
  )

}

TodoList.menu = {
  name: "代办事项",
  icon: "playlist_add_check",
  sort: 6,
  section: "TODO",
}
