import { UserModel } from "./UserModel";

export interface ChatroomModel {
    id: number;
    titre: string;
    description: string;
    isActif: boolean;
}

export interface ChatroomWithOwnerAndStatusModel extends ChatroomModel {
    owner: UserModel;
}

export interface ModifyChatroomModel extends ChatroomModel {
    startDate: string;
    duration: number;
}