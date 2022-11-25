export interface Step {
    title: string;
    description: string;
    execution?: () => any;
}

export interface ActionStepProps {
    stepNumber: number;
    step: Step;
    active: boolean;
    onSuccess: () => void;
    onError: (e: unknown) => void;
}

export type ActionStepsProps = ActionStepsHandlers & {
    title?: string;
    steps: Step[];
};

export interface ActionStepsHandlers {
    onStart?: () => void;
    onEnd?: () => void;
    onSuccess?: () => void;
    onError?: (e: unknown) => void;
}
