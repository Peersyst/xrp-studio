import { XummAuthGuard } from "@peersyst/xumm-module";

export class OptionalXummAuthGuard extends XummAuthGuard {
    // Override handleRequest so it never throws an error
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleRequest(err, user, info, context) {
        return user;
    }
}
