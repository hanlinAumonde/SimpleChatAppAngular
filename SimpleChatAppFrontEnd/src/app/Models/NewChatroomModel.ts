import { UserModel } from "./UserModel";

export interface NewChatroomModel {
    titre: string;
    description: string;
    startDate: string;
    duration: number;
    usersInvited: UserModel[];
}