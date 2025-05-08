import 'zone.js/node'
import { bootstrapApplication } from '@angular/platform-browser'
import { renderApplication } from '@angular/platform-server'
import { AppComponent } from './app/app.component';
import { serverConfig } from './app/app.config.server';

export default function bootstrap() {
  return bootstrapApplication(AppComponent, serverConfig)
}

export { renderApplication }
