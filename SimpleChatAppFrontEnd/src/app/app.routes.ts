import { Routes } from '@angular/router';
import { AcceuilComponent } from './ChatAppComponents/Pages/acceuil/acceuil.component';
import { CreateChatroomComponent } from './ChatAppComponents/Pages/create-chatroom/create-chatroom.component';
import { ChatroomComponent } from './ChatAppComponents/Pages/chatroom/chatroom.component';
import { JoinedChatroomsListComponent } from './ChatAppComponents/Pages/joined-chatrooms-list/joined-chatrooms-list.component';
import { OwnedChatroomsListComponent } from './ChatAppComponents/Pages/owned-chatrooms-list/owned-chatrooms-list.component';
import { ModifyChatroomComponent } from './ChatAppComponents/Pages/modify-chatroom/modify-chatroom.component';
import { PageNotFoundComponent } from './ChatAppComponents/Pages/page-not-found/page-not-found.component';
import routerLinkList from './routerLinkList.json'

export const routes: Routes = [
    {'path': routerLinkList[0].pathRouter, component: AcceuilComponent},
    {'path': routerLinkList[1].pathRouter, component: CreateChatroomComponent},
    {'path': routerLinkList[3].pathRouter, component: JoinedChatroomsListComponent},
    {'path': routerLinkList[2].pathRouter, component: OwnedChatroomsListComponent},
    {'path': routerLinkList[4].pathRouter, component: ModifyChatroomComponent},
    {'path': routerLinkList[5].pathRouter, component: ChatroomComponent},
    {'path': '', redirectTo: routerLinkList[0].pathRouter, pathMatch: 'full'},
    {'path': '**', component: PageNotFoundComponent}
];
