// src/main.server.ts
import { renderApplication } from '@angular/platform-server';
import { AppComponent } from './app/app.component';
import { appServerConfig } from './app/app.config.server';

export default function(): Promise<any> {
  return renderApplication(AppComponent as any, appServerConfig as any);
}
