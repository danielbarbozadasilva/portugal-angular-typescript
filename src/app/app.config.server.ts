import { ApplicationConfig, mergeApplicationConfig } from '@angular/core'
import { provideServerRouting } from '@angular/ssr'
import { serverRoutes } from './app.routes.server'
import { appConfig } from './app.config'

const serverAppConfig: ApplicationConfig = {
  providers: [
    provideServerRouting(serverRoutes)
  ]
}

export const serverConfig: ApplicationConfig = mergeApplicationConfig(appConfig, serverAppConfig)
