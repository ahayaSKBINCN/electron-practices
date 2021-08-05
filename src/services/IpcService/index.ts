const path = require("path");
const fs = require("fs");
const NOTES_FOLDER = 'notes';
const {
  ipcMain
} = require("electron");

const IpcService = ( function () {
  let instance: Service | null = null;

  class Service {
    constructor() {
      this.init();
    }

    init() {
      const { readNotes, saveNotes } = this;
      ipcMain.on("toMain", function toMain(event, data: ApiData) {
        const {
          type,
          payload,
        } = data;

        if ( type === Channel.READ_NOTES ) {
          const result = readNotes();
          ipcMain.emit("fromMain", data);
        }
        if ( type === Channel.SAVE_NOTES ) {
          const {
            data, name
          } = payload as { name: string, data: any }
          saveNotes(name, data);
        }
      })
    }

    readNotes() {
      return fs
        .readdirSync(path.join('.', NOTES_FOLDER))
        .map((file: string) => {
          return JSON.parse(
            String(fs.readFileSync(path.join('.', NOTES_FOLDER, file)))
          );
        });
    }

    saveNotes(name: string, data: unknown) {
      fs.writeFileSync(
        path.join('.', NOTES_FOLDER, `${name}${Date.now()}.json`).toString(),
        JSON.stringify(data)
      );
    }

  }

  return function inner() {
    if ( instance === null ) {
      instance = new Service();
    }
    return instance;
  }

} )()

export default IpcService;
