import { XummAuthGuard } from "@peersyst/xumm-module";

export class OptionalXummAuthGuard extends XummAuthGuard {
    // Override handleRequest so it never throws an error
    handleRequest(err, user, info, context) {
        return user;
    }
}
