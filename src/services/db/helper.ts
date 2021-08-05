import RealmDatabase from "./index";
import { IpcMainEvent } from "electron";

const { ipcMain} = require("electron");


export default class RealmDatabaseHelper {

  // database instance
  #db: RealmDatabase


  constructor(db: RealmDatabase) {
    this.#db = db;
  }

  registerHelper() {
    ipcMain.on("login", this.loginHelper);
    ipcMain.on("close-database", this.closeHelper);

  }

  loginHelper(event: IpcMainEvent, args: any) {
    if ( !( "email" in args ) || !( "password" in args ) ) return;
    this.#db.login(args.email, args.password);
  }

  closeHelper(event: IpcMainEvent, args: any) {

  }


}
