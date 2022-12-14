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

    async isAuthorized(address: string, minterAddress: string): Promise<boolean> {
        const res = await this.clientRequest((client) =>
            client.request({
                command: "account_info",
                account: address,
            }),
        );
        // @ts-ignore XRPL library service doesn't have the correct updated type
        return res.result.account_data["NFTokenMinter"] === minterAddress;
    }
}

export default XrplService;
