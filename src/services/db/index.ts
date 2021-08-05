import Realm,{
  ConnectionState,
  OpenRealmBehaviorType,
  OpenRealmTimeOutBehavior,
  ProgressDirection,
  ProgressMode,
  ProgressNotificationCallback
} from "realm";




import * as fs from "fs";

// realm database declaration.
class RealmDatabase {

  // static string tag.
  static TAG: string = "Realm";

  // realm.application instance;
  app: Realm.App;

  // current user
  currentUser: Realm.User | null = null;

  // realm database
  realm: Realm | null = null;

  // partitionValue
  partitionValue: string = "western_upon_cloud";

  // config for open realm.
  OpenRealmBehaviorConfiguration: Realm.OpenRealmBehaviorConfiguration = {
    type: "openImmediately" as OpenRealmBehaviorType.OpenImmediately, // sync changes in the background.
    timeOut: 15000,
    timeOutBehavior: "throwException" as OpenRealmTimeOutBehavior.ThrowException, // if realm open is timeout. the error will throwout.
  }

  constructor() {

    // insert the application openId.
    this.app = new Realm.App({ id: "westernuponcloud-pknut" })

    // login credentials
  }

  /**
   * login database.
   * @param email
   * @param password
   */
  login(email: string, password: string) {
    const credentials = Realm.Credentials.emailPassword(email, password);

    const self = this;
    // start login
    self.app.logIn(credentials).then(response => {
      // if login success. then set the currentUsr.
      self.currentUser = response;
      // todo success callback
    }).catch(error => {
      // if login failed. do something to let user know.
      // todo failed callback
    });

    // I expected call method step by step.
    return this;
  }

  /**
   * sync the database
   */
  sync() {
    // schema list which is await to sync
    const schema: Realm.ObjectSchema[] = [];
    const self = this;
    const { OpenRealmBehaviorConfiguration, app, currentUser, partitionValue } = self;

    Realm.open({
      schema,
      sync: {
        // logInUser
        user: currentUser!,
        // _partition
        partitionValue: partitionValue,
        // The behavior to use when this is the first time opening a realm.
        newRealmFileBehavior: OpenRealmBehaviorConfiguration,
        // The behavior to use when a realm file already exists locally,
        // i.e. you have previously opened the realm.
        existingRealmFileBehavior: OpenRealmBehaviorConfiguration,

        error: self.#handleError
      }
    }).then((realm: Realm) => {
      self.realm = realm;
    }).catch((e: Error) => {
      // todo deal the realm Promise rejection.
      console.log(RealmDatabase.TAG, e);
    })


    return this;
  }

  /**
   * pause the sync progress
   */
  syncPause() {
    this.realm?.syncSession?.pause();

    return this;
  }

  /**
   *   resume the sync progress
   */
  syncResume() {
    this.realm?.syncSession?.resume();

    return this;
  }

  /**
   * close the realm instance
   */
  close() {
    this.currentUser?.logOut();
    this.realm?.close();
  }

  /**
   *
   * add progress notification
   */
  addSyncProgressNotification(direction: ProgressDirection, mode: ProgressMode, progressCallback: ProgressNotificationCallback) {
    this.realm?.syncSession?.addProgressNotification(direction, mode, progressCallback);

    return this;
  }

  /**
   *
   * remove progress notification which has been added.
   */
  removeSyncProgressNotification(progressCallback: ProgressNotificationCallback) {
    this.realm?.syncSession?.removeProgressNotification(progressCallback)

    return this;
  }

  /**
   * get connectionState
   */
  get connectionState(): ConnectionState | "unknown" {
    return this.realm?.syncSession?.connectionState ?? "unknown";
  }

  /**
   * set logLevel for the application
   * @param level
   */
  set logLevel(level: Realm.App.Sync.LogLevel) {
    Realm.App.Sync.setLogLevel(this.app, level);
  }

  /**
   * open the sessionMultiplex
   * @protected
   */
  protected tryEnableSessionMultiplexing() {
    Realm.App.Sync.enableSessionMultiplexing(this.app);

    return this;
  }

  /**
   * give out the api to reset the realm application
   * @protected
   */
  reset() {

  }

  /**
   * error handler for realm open config.
   * @param session
   * @param error
   * @private just provide to configuration, and need not give out.
   */
  #handleError(session: Realm.App.Sync.Session, error: Realm.SyncError | Realm.ClientResetError) {
    if ( error.name === "ClientReset" ) {
      this.#resetRealmClient(session, <Realm.ClientResetError> error);
    } else {
      this.#handleSyncError(session, <Realm.SyncError> error)
    }
  }

  /**
   * reset realm client and recycle the memory from realm instance
   * @private this method just be provided to handleError
   */
  #resetRealmClient(session: Realm.App.Sync.Session, error: Realm.ClientResetError) {

    // realm path
    const realmPath = "<Your Realm Path>";

    // todo notify the status is reset and renderer_side should do some effects such as reset routes, clean states.
    if ( this.realm ) this.close();

    // reset client
    Realm.App.Sync.initiateClientReset(this.app, realmPath);

    // @ts-ignore to fix the path is not defined on { @see Realm.SyncConfiguration }
    fs.renameSync(error.config.path, realmPath + "~");

    // recycle memory from "realm"
    this.realm = null;
  }

  /**
   * handle SyncError
   * @param session
   * @param error
   * @private this method is just provided to handleError
   */
  #handleSyncError(session: Realm.App.Sync.Session, error: Realm.SyncError) {

  }

}

export default RealmDatabase;
