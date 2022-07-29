import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class XummJwtAuthGuard extends AuthGuard("jwt") {}
