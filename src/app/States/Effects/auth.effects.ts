import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthenticationService } from "../../Services/authentication.service";
import { AuthActions } from "../Actions/auth.action";
import { catchError, concatMap, exhaustMap, map, of, tap } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private auth: AuthenticationService,
    private router: Router
  ) {}

  // Effect for registering a user
  registerUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      concatMap(({ user }) =>
        this.auth.registerUser(user).pipe(
          map((res) => {
            // Navigate to login page on successful registration
            this.router.navigate(['/login']);
            return AuthActions.registerSuccess({ response: res });
          }),
          catchError((error) =>
            of(AuthActions.registerFailure({ message: error.message }))
          )
        )
      )
    )
  );


  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(({ user }) =>
        this.auth.loginUser(user).pipe(
          map((res) => {
            localStorage.setItem('token', res.token); 
  
            if (user.Email === 'jethrosumbeiywet@gmail.com',user.Password==='Qwertyuiop2023*#') { 
              
              this.router.navigate(['/dash-admin']);
            } else {
              
              const role = res.role; 
              if (role.toString() === 'Government Official') {
                this.router.navigate(['/home']);
              } else if (role.toString() === 'Citizen') {
                this.router.navigate(['/home']);
              }
            }
  
            return AuthActions.loginSuccess({ response: res });
          }),
          catchError((error) =>
            of(AuthActions.loginFailure({ message: error.message }))
          )
        )
      )
    )
  );
  

  // Effect for loading users
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadUsers),
      exhaustMap(() =>
        this.auth.getUsers().pipe(
          map(users => AuthActions.loadUsersSuccess({ users })),
          catchError(error => of(AuthActions.loadUsersFailure({ message: error.message })))
        )
      )
    )
  );

  // Effect for approving a user
  approveUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.approveUser),
      exhaustMap(({ userId }) =>
        this.auth.approveUser(userId).pipe(
          map(approvedUser => AuthActions.approveUserSuccess({ user: approvedUser })),
          catchError(error => of(AuthActions.approveUserFailure({ message: error.message })))
        )
      )
    )
  );
}
