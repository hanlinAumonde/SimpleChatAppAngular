export interface ChatMessage extends InitialMessage {
    index: number;
    sender: boolean;
}

export interface InitialMessage {
    user : {
        id: number;
        username: string;
    };
    messageType: InitialMessageType;
    message: string;
    timestamp: string;
}

export interface HistoryMessage {
    index: number;
    userId: number;
    username: string;
    message: string;
    timestamp: string;
    sentByUser: boolean;
    messageType: HistoryMessageType;
}

export enum InitialMessageType {
  TEXT = 0,
  CONNECT = 1,
  DISCONNECT = 2,
  REMOVE_CHATROOM = 3,
  ADD_MEMBER = 4,
  REMOVE_MEMBER = 5
};

export enum HistoryMessageType {
    CONTENT = "content",
    DATE_SIGN = "dateSign",
    LATEST_DATE_SIGN = "latestDateSign"
}