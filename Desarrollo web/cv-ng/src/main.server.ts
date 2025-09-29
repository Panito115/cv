import { bootstrapApplication, type BootstrapContext } from '@angular/platform-browser';
import { provideServerRendering } from '@angular/platform-server';
import { provideRouter } from '@angular/router';

import { App } from './app/app';
import { routes } from './app/app.routes';

const bootstrap = (context?: BootstrapContext) => bootstrapApplication(App, {
  providers: [
    provideServerRendering(),
    provideRouter(routes)
  ]
}, context);

export default bootstrap;
