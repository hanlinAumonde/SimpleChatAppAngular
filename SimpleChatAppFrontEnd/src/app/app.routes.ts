import { Routes } from '@angular/router';
import { AcceuilComponent } from './ChatAppComponents/Pages/acceuil/acceuil.component';
import { CreateChatroomComponent } from './ChatAppComponents/Pages/create-chatroom/create-chatroom.component';
import { ChatroomComponent } from './ChatAppComponents/Pages/chatroom/chatroom.component';
import { JoinedChatroomsListComponent } from './ChatAppComponents/Pages/joined-chatrooms-list/joined-chatrooms-list.component';
import { OwnedChatroomsListComponent } from './ChatAppComponents/Pages/owned-chatrooms-list/owned-chatrooms-list.component';
import { ModifyChatroomComponent } from './ChatAppComponents/Pages/modify-chatroom/modify-chatroom.component';
import { PageNotFoundComponent } from './ChatAppComponents/Pages/page-not-found/page-not-found.component';

export const routes: Routes = [
    {'path': 'acceuilPage', component: AcceuilComponent},
    {'path': 'planifier-a-chatroom', component: CreateChatroomComponent},
    {'path': 'chatroomlist-joined', component: JoinedChatroomsListComponent},
    {'path': 'chatroomlist-owned', component: OwnedChatroomsListComponent},
    {'path': 'modify-chatroom/:id', component: ModifyChatroomComponent},
    {'path': 'chatroom/:id', component: ChatroomComponent},
    {'path': '', redirectTo: '/acceuilPage', pathMatch: 'full'},
    {'path': '**', component: PageNotFoundComponent}
];
