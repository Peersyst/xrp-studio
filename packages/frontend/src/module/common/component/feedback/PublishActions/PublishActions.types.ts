export interface NftPublishActionStep {
    title: string;
    description: string;
    execution: () => Promise<string | void>;
}

export interface NftPublishActionsStepsProps {
    stepNumber: number;
    step: NftPublishActionStep;
    active: boolean;
    onSuccess: () => void;
}

export interface NftPublishActionsProps {
    title?: string;
    steps: NftPublishActionStep[];
    onSuccess: () => void;
}
