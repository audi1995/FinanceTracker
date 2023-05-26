import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

export class RoleGuard implements CanActivate {
    private role: string;
    constructor(role: string) {
        this.role = role;
        console.log(this.role);

    }
    canActivate(context: ExecutionContext): boolean {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest<Request>();
        console.log('role',request.user);
        
        const user: any = request.user;        
        console.log(user.role)
        if (request.user && user.role == this.role) 
        return true;


        return false;
    }
}