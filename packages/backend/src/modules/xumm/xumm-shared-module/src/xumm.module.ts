import { DynamicModule, Module, Provider, Type, ForwardReference } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { XummService } from "./xumm.service";
import { XummTypeormRepository, XummEntity } from "./typeorm";
import { XummAuthService } from "./xumm-auth.service";
import { XummAuthStrategy } from "./strategies";
import { JwtModule } from "@nestjs/jwt";
import { XummAuthController, XummController } from "./xumm.controller";
import { PassportModule } from "@nestjs/passport";
import { XummJwtStrategy } from "./strategies/xumm-jwt.strategy";
import { JwtModuleOptions } from "@nestjs/jwt/dist/interfaces/jwt-module-options.interface";

export interface XummModuleOptions {
    status?: boolean;
    auth?: boolean;
    jwt?: JwtModuleOptions;
}

@Module({})
export class XummModule {
    static register({
        status = true,
        auth = true,
        jwt: {
            signOptions: { expiresIn = "604800s", ...restSignOptions },
            ...restJwtOptions
        },
    }: XummModuleOptions = {}): DynamicModule {
        let providers: Provider[] = [XummService, { provide: "XummRepository", useClass: XummTypeormRepository }];
        const controllers: Type[] = [];
        let imports: Array<Type | DynamicModule | Promise<DynamicModule> | ForwardReference> = [TypeOrmModule.forFeature([XummEntity])];
        const exports: Provider[] = [XummService];

        if (status) {
            controllers.push(XummController);
        }
        if (auth) {
            providers = [...providers, XummAuthService, XummJwtStrategy, XummAuthStrategy];
            controllers.push(XummAuthController);
            imports = [
                ...imports,
                PassportModule,
                JwtModule.register({ signOptions: { expiresIn, ...restSignOptions }, ...restJwtOptions }),
            ];
            exports.push(XummAuthService);
        }

        return {
            module: XummModule,
            imports,
            providers,
            controllers,
            exports,
        };
    }
}
