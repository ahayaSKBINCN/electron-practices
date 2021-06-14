import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  createStyles,
  Theme,
  Grid,
  Paper,
  TextField,
  Typography,
  ListItemText,
  Button,
  List,
  ListItem
} from '@material-ui/core';
import { remote } from 'electron';

// import fs and path nodejs core module for wrting and reading files
const fs = remote.require('fs');
const path = remote.require('path');

interface NoteRVC {
  body: any;
  title: string;
  createdAt: number | string | Date;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: '100vw',
    },
    paper: {
      width: '100%',
      minHeight: '100vh',
      padding: '5px',
    },
    control: {
      padding: theme.spacing(2),
    },
    textArea: {
      width: '100%',
      height: '100%',
    },
    heading: {
      textAlign: 'center',
    },
  })
);
const NOTES_FOLDER = 'notes';
const save = (name: string, data: any) => {
  fs.writeFileSync(
    path.join('.', NOTES_FOLDER, `${name}${Date.now()}.json`).toString(),
    JSON.stringify(data)
  );
};
export default function SpacingGrid() {
  const [ editorState, setEditorState ] = useState('');
  const [ previewState, setPreview ] = useState('');
  const [ notes, setNotes ] = useState<NoteRVC[]>([]);
  useEffect(() => {
    // we need to add code to parse md and set it to preview
  }, [ setPreview, editorState ]);
  useEffect(() => {
    const note = fs
      .readdirSync(path.join('.', NOTES_FOLDER))
      .map((file: string) => {
        return JSON.parse(
          String(fs.readFileSync(path.join('.', NOTES_FOLDER, file)))
        );
      });
    setNotes(note);
  }, []);
  const [ title, setTitle ] = useState('');
  const classes = useStyles();
  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          <Grid item xs={9}>
            <Paper className={classes.paper}>
              <Grid container justify="space-between">
                <Grid item>
                  <Typography variant="h3" align="center">
                    Add Notes
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      save(title, {
                        title,
                        createdAt: Date.now(),
                        body: editorState,
                      });
                    }}
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
              <Grid
                container
                direction="column"
                justify="space-between"
                spacing={2}
              >
                <Grid item>
                  <TextField
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    variant="outlined"
                    className={classes.textArea}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    multiline
                    label="Content"
                    value={editorState}
                    onChange={(e) => setEditorState(e.target.value)}
                    variant="outlined"
                    className={classes.textArea}
                    rows={20}
                  />
                </Grid>
                <Grid item>
                  <div dangerouslySetInnerHTML={{ __html: previewState }}/>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              <List>
                {notes.map((note, i) => (
                  <ListItem
                    key={`key-${i}`}
                    onClick={() => {
                      setEditorState(note.body);
                      setTitle(note.title);
                    }}
                  >
                    <ListItemText
                      primary={note.title}
                      secondary={new Date(note.createdAt).toLocaleString('in')}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
