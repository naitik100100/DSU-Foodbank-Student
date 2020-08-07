import { Injectable } from "@angular/core";
import { env } from '@env/.env';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserModel } from '../model/User';
import { MatDialogWrapperComponent } from '../mat-dialog-wrapper/mat-dialog-wrapper.component';

@Injectable({providedIn: 'root'})
export class AuthenticationService
{
    public isUserLoggedIn  = false;
    public user: UserModel;
    constructor
    (
        public httpClient: HttpClient,
        public router: Router,
        public matDialog: MatDialog   
    )
    {
    }

    public authenticateUser(bannerId:string,password:string)
    {
        return this.httpClient.post(`${this.getUrl()}user`,{bannerid: bannerId, password: password}).subscribe((data:any)=>
            {
                console.log(data);
                if(data.success)
                {
                    this.isUserLoggedIn=true;
                    this.user = {
                        bannerId: bannerId,
                        firstname: data.result.firstname,
                        lastname: data.result.lastname,
                        emailId: data.result.emailid
                    }

                    localStorage.setItem('bannerId',bannerId)
                    this.router.navigate(['/home'])
                }
            },(error:any)=>{
                this.matDialog.open(MatDialogWrapperComponent,{data:{
                    header: "Failure",
                    content: error.error.message
                }})
            })
    }

    public createUser(formControls: any)
    {
        let User={
            bannerid:formControls.bannerId.value,
            password:formControls.password.value,
            firstname:formControls.firstName.value,
            lastname:formControls.lastName.value,
            emailid:formControls.email.value
        }

        console.log(User);

        this.httpClient.post(`${this.getUrl()}user/add`,User).subscribe((data:any)=>{
            console.log(data)
            if(data.success)
            {
                this.matDialog.open(MatDialogWrapperComponent,{data:{header: 'Successful',content:'Welcome To DSU Foodbank'}})

                this.matDialog.afterAllClosed.subscribe(data=>{
                    this.authenticateUser(User.bannerid,User.password)
                })
            }
            else
            {
                this.matDialog.open(MatDialogWrapperComponent,{data:{header: 'Failure',content:data.message}})
            }
        })
    }

    public checkLogin()
    {
        this.isUserLoggedIn = true
        // console.log("Checking login: "+this.isUserLoggedIn);
        // if(this.isUserLoggedIn==false)
        // {
        //     console.log("Redirecting")
        //     this.router.navigate(['/login'])
        // }
    }


    getUrl():string
    {
        return environment.studentUrl;
    }
}