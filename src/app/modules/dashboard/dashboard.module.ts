import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ContentComponent } from '../content/content.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ChatPanelComponent } from '../chat-panel/chat-panel.component';
import { UserQueryComponent } from '../user-query/user-query.component';
import { ModelResponseComponent } from '../model-response/model-response.component';
import { InfoPanelComponent } from '../info-panel/info-panel.component';
import { SummaryReportComponent } from '../summary-report/summary-report.component';
import { SharedModule } from '../../shared/shared.module';
import { ToolbarModule } from 'primeng/toolbar';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SplitterModule } from 'primeng/splitter';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AutosizeModule } from 'ngx-autosize';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ContentRoutingModule } from '../content/content-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { DividerModule } from 'primeng/divider';
import { ImageModule } from 'primeng/image';
import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { ProgressBarModule } from 'primeng/progressbar';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogPanelComponent } from '../dialog-panel/dialog-panel.component';
import { BulletSummaryComponent } from '../bullet-summary/bullet-summary.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ToolbarModule,
    FormsModule,
    InputTextModule,
    SplitterModule,
    ScrollPanelModule,
    ButtonModule,
    InputTextareaModule,
    AutosizeModule,
    MatIconModule,
    ContentRoutingModule,
    HttpClientModule,
    TableModule,
    TooltipModule,
    MatTooltipModule,
    DividerModule,
    ImageModule,
    PanelModule,
    ToastModule,
    ProgressBarModule,
    DynamicDialogModule,
  ],
  declarations: [
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    SidebarComponent,
    ChatPanelComponent,
    InfoPanelComponent,
    UserQueryComponent,
    ModelResponseComponent,
    SummaryReportComponent,
    DialogPanelComponent,
    BulletSummaryComponent,
  ],
  providers: [MessageService, DialogService],
})
export class DashboardModule {}
