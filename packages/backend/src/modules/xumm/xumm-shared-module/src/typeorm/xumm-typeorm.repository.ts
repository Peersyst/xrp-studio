import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { XummI } from "../dto/xumm.dto";
import { XummRepositoryInterface } from "../xumm.service";
import { XummEntity } from "./XummEntity";

export class XummTypeormRepository implements XummRepositoryInterface {
    constructor(@InjectRepository(XummEntity) private readonly xummRepository: Repository<XummEntity>) {}

    async create(userToken: string, address: string, payloadId?: string): Promise<XummI> {
        const xummModel = await this.xummRepository.save({
            userToken,
            address,
            payloadId,
        });

        return this.transformEntityToDto(xummModel);
    }

    async findByPayloadId(payloadId: string): Promise<XummI> {
        const xummModel = await this.xummRepository.findOne({ where: { payloadId } });

        return xummModel ? this.transformEntityToDto(xummModel) : null;
    }

    async findByAddress(address: string): Promise<XummI> {
        const xummModel = await this.xummRepository.findOne({ where: { address } });

        return xummModel ? this.transformEntityToDto(xummModel) : null;
    }

    async deletePrevious(address: string): Promise<void> {
        await this.xummRepository.delete({ address });
    }

    private transformEntityToDto(model: XummEntity): XummI {
        return {
            address: model.address,
            userToken: model.userToken,
            payloadId: model.payloadId,
        };
    }
}
