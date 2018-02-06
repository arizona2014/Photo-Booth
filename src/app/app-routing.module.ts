import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
    { path:'login', component: LoginComponent },
    { path:'home', component: HomeComponent },
    { path:'', component: LoginComponent },
    { path:'**', component: LoginComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule { }