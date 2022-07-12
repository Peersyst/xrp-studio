import { DynamicModule, Module, Provider, Type, ForwardReference } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { XummService } from "./xumm.service";
import { XummTypeormRepository } from "./typeorm/xumm-typeorm.repository";
import { XummEntity } from "./typeorm/XummEntity";
import { XummAuthService } from "./xumm-auth.service";
import { XummAuthStrategy } from "./strategies/xumm-auth.strategy";
import { JwtModule } from "@nestjs/jwt";
import { XummAuthController, XummController } from "./xumm.controller";
import { PassportModule } from "@nestjs/passport";
import { XummJwtStrategy } from "./strategies/xumm-jwt.strategy";

export interface XummModuleOptions {
    status?: boolean;
    auth?: boolean;
}

@Module({})
export class XummModule {
    static register(
        ConfigModule: Type,
        ConfigService: any,
        { status = true, auth = true }: XummModuleOptions = {},
        ExtendedXummAuthService: typeof XummAuthService = XummAuthService,
    ): DynamicModule {
        let providers: Provider[] = [XummService, { provide: "XummRepository", useClass: XummTypeormRepository }];
        const controllers: Type[] = [];
        let imports: Array<Type | DynamicModule | Promise<DynamicModule> | ForwardReference> = [
            ConfigModule,
            TypeOrmModule.forFeature([XummEntity]),
        ];
        const exports: Provider[] = [XummService];

        if (status) {
            controllers.push(XummController);
        }
        if (auth) {
            providers = [...providers, ExtendedXummAuthService, XummJwtStrategy, XummAuthStrategy];
            controllers.push(XummAuthController);
            imports = [
                ...imports,
                PassportModule,
                JwtModule.registerAsync({
                    imports: [ConfigModule],
                    useFactory: async (configService: typeof ConfigService) => ({
                        secret: configService.get("server.secretKey"),
                        signOptions: { expiresIn: "604800s" },
                    }),
                    inject: [ConfigService],
                }),
            ];
            exports.push(ExtendedXummAuthService);
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
