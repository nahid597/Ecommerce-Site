import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router';
import { map, switchMap, mapTo, switchAll } from "rxjs/operators";
import { UserService } from './user.service';
import {Observable} from 'rxjs'
import * as firebase from 'firebase'
import { AppUser } from './models/app-user';

@Injectable({
  providedIn: 'root'
})

   export class AdminAuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) { }


  canActivate(): Observable<boolean> {
    return this.auth.user$.pipe(map(user =>
      this.userService.get(user.uid)),
    map((appUser: AppUser) => appUser.isAdmin));

  }



}


