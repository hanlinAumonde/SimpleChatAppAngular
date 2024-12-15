export interface UserModel {
    id: number;
    firstName: string;
    lastName: string;
    mail: string;
}

export interface UserInChatroomModel extends UserModel {
    isConnecting:0|1;
}