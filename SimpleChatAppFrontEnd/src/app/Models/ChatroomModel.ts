import { UserModel } from "./UserModel";

interface Chatroom {
    id: number;
    titre: string;
    description: string;
}

export class ChatroomModel implements Chatroom {
    constructor(
        public id: number,
        public titre: string,
        public description: string
    ){}
}

export class ChatroomWithOwnerAndStatusModel implements Chatroom {
    constructor(
        public id: number,
        public titre: string,
        public description: string,
        public owner: UserModel,
        public isActif: boolean
    ){}
}