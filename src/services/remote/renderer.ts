import {
  ipcRenderer
} from 'electron';

function ipcEval(script: string) {
  return ipcRenderer.send("remote", script);
}

function ipcEvalSync(script: string) {
  return ipcRenderer.sendSync("remote-sync", script);
}

export {
  ipcEval,
  ipcEvalSync
}
