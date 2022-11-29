export interface Step {
    title: string;
    description: string;
    execution: () => any;
}

export interface ActionStepProps {
    stepNumber: number;
    step: Step;
    active: boolean;
    onSuccess: () => void;
}

export interface ActionStepsProps {
    title?: string;
    steps: Step[];
    onSuccess: () => void;
}
