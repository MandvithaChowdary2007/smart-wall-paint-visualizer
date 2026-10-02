import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar.component';
import { HomeComponent } from './pages/home.component';
import { VisualizerComponent } from './pages/visualizer.component';
import { ShopComponent } from './pages/shop.component';
import { CalculatorComponent } from './pages/calculator.component';
import { AuthComponent } from './pages/auth.component';
import { AdminComponent } from './pages/admin.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'visualizer', component:VisualizerComponent},
  {path:'shop', component:ShopComponent},
  {path:'calculator', component:CalculatorComponent},
  {path:'auth', component:AuthComponent},
  {path:'admin', component:AdminComponent, canActivate:[AuthGuard]},
  {path:'**', redirectTo:''}
];

@NgModule({
  declarations:[AppComponent,NavbarComponent,HomeComponent,VisualizerComponent,ShopComponent,CalculatorComponent,AuthComponent,AdminComponent],
  imports:[BrowserModule,BrowserAnimationsModule,FormsModule,HttpClientModule,RouterModule.forRoot(routes)],
  providers:[{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true},AuthGuard],
  bootstrap:[AppComponent]
})
export class AppModule {}
