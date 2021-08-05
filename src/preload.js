const {
  contextBridge,
  ipcRenderer
} = require("electron");
const SYMBOL_EMITTER = Symbol("emitter");
const SYMBOL_HANDLER = Symbol("handler");

const map = new Map();

contextBridge.exposeInMainWorld("api", {
   [SYMBOL_EMITTER]: function MessageEmitter(channel, ...data) {
    switch ( channel ) {
      case "LOGIN":
      case "READ_NOTES":
      case "SAVE_NOTES":
      default:
        ipcRenderer.send(channel, ...data)
    }
  },

  [SYMBOL_HANDLER]: function MessageHandler ( channel, handler){
    switch ( channel ) {
      case "LOGIN":
      case "READ_NOTES":
      case "SAVE_NOTES":
      default:
        ipcRenderer.on(channel, (event,...args)=>handler(...args));
      }
  },

  createBridge: async function (channel, ...args ){
     switch( channel ){
       case "LOGIN":
       case "READ_NOTES":
       case "SAVE_NOTES":
       default:
         if(map.has(channel)){
           const emitter = map.get(channel);
           emitter.emit
         }
     }

}



});

