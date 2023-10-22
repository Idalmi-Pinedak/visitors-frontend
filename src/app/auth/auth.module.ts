import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthContentGuard } from "./guards/auth-content.guard";
import { PrivateContentGuard } from "./guards/private-content.guard";
import { AuthenticationService } from "./services/authentication.service";
import { UserRoleService } from "./services/user-role.service";

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [AuthContentGuard, PrivateContentGuard, AuthenticationService, UserRoleService]
})
export class AuthModule {
}
