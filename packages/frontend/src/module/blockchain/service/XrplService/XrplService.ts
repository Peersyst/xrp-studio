import * as xrpl from "xrpl";
import { Client } from "xrpl/dist/npm/client";
import { config } from "config";
import { TxResponse } from "xrpl";

class XrplService {
    private static client: xrpl.Client = new xrpl.Client(config.xrpNodeUrl);

    static async initializeClient(): Promise<void> {
        this.client = new xrpl.Client(config.xrpNodeUrl);

        this.client.addListener("error", async () => {
            // Catch errors so app does not crash
            return undefined;
        });

        await this.client.connect();
    }

    static async connectClient(): Promise<void> {
        await this.reconnectClient();
    }

    static async reconnectClient(): Promise<void> {
        this.client.disconnect();
        await this.initializeClient();
    }

    private static async clientRequest<T>(request: (client: Client) => Promise<T>): Promise<T> {
        return request(this.client);
    }

    public static async getAccountBalance(address: string): Promise<string> {
        return await this.clientRequest((client) => client.getXrpBalance(address));
    }

    public static async getAvailableBalance(address: string): Promise<number> {
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

    public static async isAuthorized(address: string, minterAddress: string): Promise<boolean> {
        const res = await this.clientRequest((client) =>
            client.request({
                command: "account_info",
                account: address,
            }),
        );
        // @ts-ignore XRPL library service doesn't have the correct updated type
        return res.result.account_data["NFTokenMinter"] === minterAddress;
    }

    public static async getTx(hash: string): Promise<TxResponse> {
        return this.clientRequest((client) => client.request({ command: "tx", transaction: hash }));
    }

    public static async txIsValidated(hash: string): Promise<boolean> {
        const tx = await this.getTx(hash);
        return !!tx.result.validated;
    }
}

export default XrplService;
