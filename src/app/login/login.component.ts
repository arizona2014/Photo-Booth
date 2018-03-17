import { Component } from '@angular/core';
import { AuthenticateService } from "./loginService/authenticate.service";
import { UserComponent } from "../user/user.component";
import { AuthGuardService } from "../auth-guard.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    public user = new UserComponent();
    public errorMsg = '';

    constructor(private _service:AuthenticateService) { }

    login() {
        if(!this._service.login(this.user)) {
            this.errorMsg = 'Failed to login ! try again ... ';
        }
    }

}
