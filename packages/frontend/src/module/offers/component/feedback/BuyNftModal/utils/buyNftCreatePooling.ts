import { polling } from "@peersyst/react-utils";

export default function buyNftCreatePooling(): () => Promise<void> {
    function handleStatus(): boolean {
        return Math.random() < 0.8;
    }

    async function startPooling(): Promise<void> {
        await polling(() => new Promise((resolve) => setTimeout(resolve, 1000)), handleStatus);
    }

    return startPooling;
}
