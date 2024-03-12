import { NgModule } from '@angular/core';
import { ChildrenOutletContexts, RouterModule, Routes } from '@angular/router';
import { ChatPanelComponent } from '../chat-panel/chat-panel.component';
import { ContentComponent } from './content.component';

const routes: Routes = [
  { path: '', component: ContentComponent,
    children: [
        {path: 'chat', component: ChatPanelComponent},
    ]
} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
