import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';

let users: any = [];

@Injectable()
export class AuthenticateService {

    constructor(private _router: Router, private db: AngularFirestore ) {
        db.collection('users').valueChanges().subscribe( res => {
            users = res;
        });
    }

    logout() {
        localStorage.removeItem("user");
        this._router.navigate(['/login']);
    }

    login(user) {
        let authenticatedUser = users.find(u => u.username === user.username);
        if (authenticatedUser && authenticatedUser.password === user.password){
            localStorage.setItem("user", authenticatedUser.username);
            localStorage.setItem("userId", authenticatedUser.userId);
            this._router.navigate(['/home']);
            return true;
        }
        return false;
    }

    checkCredentials() {
        if (localStorage.getItem("user") === null){
            this._router.navigate(['/login']);
        }
    }
}
