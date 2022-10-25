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
        const balance = await this.clientRequest((client) => client.getXrpBalance(address));
        return balance;
    }

    public async getAvailableBalance(address: string): Promise<string> {
        const balance = await this.getAccountBalance(address);
        const dropsBalance = XrplService.xrpToDrops(balance);
        if (BigInt(dropsBalance) <= BigInt(XrplService.xrpToDrops("10"))) return "0";
        else {
            const finalBalance = BigInt(dropsBalance) - BigInt(XrplService.xrpToDrops("10"));
            return XrplService.dropsToXrp(finalBalance.toString());
        }
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
