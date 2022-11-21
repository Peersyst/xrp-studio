import { useState } from "react";

interface ReturnUseStartPooling {
    startPooling: () => Promise<void>;
    endPooling: () => void;
    isPooling: boolean;
}

export default function (): ReturnUseStartPooling {
    const [isPooling, setIsPooling] = useState(true);

    const endPooling = () => {
        setIsPooling(false);
    };
    const startPooling = async () => {
        return;
    };

    return {
        startPooling: startPooling,
        endPooling: endPooling,
        isPooling: isPooling,
    };
}
