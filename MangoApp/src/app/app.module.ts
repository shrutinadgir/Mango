import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AuthInterceptor } from './services/http-interceptor';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BackendCallService } from './services/backend-call/backend-call.service';

import {
  MsalModule,
  MsalRedirectComponent,
  MsalGuard,
  MsalInterceptor,
} from '@azure/msal-angular';
import { PublicClientApplication, InteractionType } from '@azure/msal-browser';
import { SortingPipe } from './pipes/sorting.pipe';

const isIE =
  window.navigator.userAgent.indexOf('MSIE ') > -1 ||
  window.navigator.userAgent.indexOf('Trident/') > -1;
@NgModule({
  declarations: [AppComponent, SortingPipe],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    MsalModule.forRoot(
      new PublicClientApplication({
        auth: {
          clientId: 'c1d291ce-3126-4892-a00c-af92e9392d24', // This is your client ID
          authority: 'https://login.microsoftonline.com/organizations', // This is your tenant ID
          redirectUri: 'http://localhost:8100', // This is your redirect URI
          // postLogoutRedirectUri:'http://localhost:8100/logout',
          // navigateToLoginRequestUrl: true,
        },
        cache: {
          cacheLocation: 'localStorage',
          storeAuthStateInCookie: isIE, // Set to true for Internet Explorer 11
        },
      }),
      {
        interactionType: InteractionType.Redirect,
        authRequest: {
          scopes: ['user.read'],
        },
      },
      {
        interactionType: InteractionType.Popup,
        protectedResourceMap: new Map([
          ['https://graph.microsoft.com/v1.0/me', ['user.read']],
          [
            'https://sldemo.azure-api.net/',
            ['api://9fea343a-012d-48e6-b7e8-f8de5f9e2860/.default'],
          ],
        ]),
      }
    ),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    BackendCallService,
    SortingPipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
