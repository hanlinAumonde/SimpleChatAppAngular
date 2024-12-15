export interface ChatMessage extends InitialMessage {
    index: number;
    sender: 0 | 1;
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