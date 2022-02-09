import { PrivateAuthUserDtoI } from "@peersyst/auth-module";
import { User, UserType } from "../../database/entities/User";

export class UserDto implements PrivateAuthUserDtoI {
    public id: number;
    public email: string;
    public type: UserType;

    static fromEntity(user: User): UserDto {
        return {
            id: user.id,
            email: user.email,
            type: user.type,
        };
    }
}
