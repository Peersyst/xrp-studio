import * as xrpl from "xrpl";
import { Client } from "xrpl/dist/npm/client";
import { config } from "config";

class XrplService {
    private client: Client;
    constructor() {
        this.client = new xrpl.Client(config.xrpNodeUrl);
    }

    private async clientRequest<T>(request: (client: Client) => Promise<T>): Promise<T> {
        await this.client.connect();
        const res = await request(this.client);
        await this.client.disconnect();
        return res;
    }

    public async getAccountBalance(address: string): Promise<string> {
        return await this.clientRequest((client) => client.getXrpBalance(address));
    }

    public async hasEnoughBalance(address: string): Promise<Boolean> {
        const balance = await this.clientRequest((client) => client.getXrpBalance(address));
        return Number(xrpl.xrpToDrops(balance)) > config.feeInDrops;
    }

    public async getAvailableBalance(address: string): Promise<number> {
        return Number(await this.getAccountBalance(address));
    }

    static dropsToXrp(xrpToConvert: string): string {
        return xrpl.dropsToXrp(xrpToConvert);
    }

    static xrpToDrops(dropsToConvert: string): string {
        return xrpl.xrpToDrops(dropsToConvert);
    }

    static isValidXrpAddress(address: string): boolean {
        return xrpl.isValidAddress(address);
    }
}

export default XrplService;
