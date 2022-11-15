import { Module } from "@nestjs/common";
import { DropController } from "./drop.controller";

@Module({
    imports: [],
    controllers: [DropController],
})
export class DropModule {}
