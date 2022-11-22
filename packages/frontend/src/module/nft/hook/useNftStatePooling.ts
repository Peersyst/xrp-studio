import { useState } from "react";

interface ReturnUseStartPooling {
    endPooling: () => void;
    isPooling: boolean;
}

export default function (): ReturnUseStartPooling {
    const [isPooling, setIsPooling] = useState(true);

    const endPooling = () => {
        setIsPooling(false);
    };

    return {
        endPooling: endPooling,
        isPooling: isPooling,
    };
}
