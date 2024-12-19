export interface ChatMessage extends InitialMessage {
    index: number;
    sender: boolean;
}

export interface InitialMessage {
    user : {
        id: number;
        username: string;
    };
    messageType: 0 | 1 | 2 | 3;
    message: string;
    timestamp: string;
}

export interface HistoryMessage {
    index: number;
    username: string;
    message: string;
    timestamp: string;
    sentByUser: boolean;
    messageType: "content" | "dateSign" | "latestDateSign";
}