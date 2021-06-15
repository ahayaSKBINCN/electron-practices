const {
    contextBridge,
    ipcRenderer
} = require("electron");

const validChannels = ["toMain"]

contextBridge.exposeInMainWorld("api", {
    send: (channel, data) => {
        // whitelist channels
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data);
        }
    },
    receive: (channel, func) => {
        let validChannels = ["fromMain"];
        if (validChannels.includes(channel)) {
            // Deliberately strip event as it includes `sender`
            ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
    },

    sendSync: (channel, data) => {
        if (validChannels.includes(channel)) {
            return ipcRenderer.sendSync(channel, data)
        }
        return null;
    }
});

