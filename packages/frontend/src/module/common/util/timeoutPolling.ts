import { polling } from "@peersyst/react-utils";

export default function timeoutPolling<R>(
    fn: () => Promise<R>,
    condition: (res: R) => boolean,
    { timeout = 2000, ...restOptions }: Parameters<typeof polling>[2] = {},
) {
    return polling(fn, condition, { timeout, ...restOptions });
}
