declare var api: {
  send: (channel: string, data: ApiData) => void;
  sendSync:(channel: string, data: ApiData) => void;
  receive: (channel: string, func: (...args: any[]) => void) => void;
};

enum DataType {
  readNotes,
  saveNotes,
}

interface ApiData {
  type: number;
  payload: unknown;
}
