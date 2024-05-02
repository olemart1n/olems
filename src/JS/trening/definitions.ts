export interface StoredExercises {
    date: Date;
    prog: string;
    data: Exercise[];
}

export interface Exercise {
    exercise: string;
    sets: string;
    reps: string;
    weight: string;
}
export const upperBody: Exercise[] = [
    { exercise: "Benkpress", sets: "4", reps: "5-8", weight: "" },
    { exercise: "Skulderpress", sets: "3", reps: "6-10", weight: "" },
    { exercise: "Pull-ups", sets: "3", reps: "6-10", weight: "" },
    { exercise: "Biceps curls", sets: "4", reps: "10-12", weight: "" },
    { exercise: "Dips/triceps-push", sets: "3", reps: "10-12", weight: "" },
];

export const lowerBody: Exercise[] = [
    { exercise: "Knebøy", sets: "4", reps: "6-8", weight: "" },
    { exercise: "Deadlift", sets: "3", reps: "6-8", weight: "" },
    { exercise: "Leg-press", sets: "3", reps: "8-10", weight: "" },
    { exercise: "Legg-curls", sets: "3", reps: "10-12", weight: "" },
    { exercise: "Calf-raises", sets: "3", reps: "10-15", weight: "" },
];

export const fullBody: Exercise[] = [
    { exercise: "Legg-press", sets: "3", reps: "8-10", weight: "" },
    { exercise: "Benkpress", sets: "4", reps: "5-8", weight: "" },
    { exercise: "Roing", sets: "3", reps: "6-10", weight: "" },
    { exercise: "Face-pulls/omvendt", sets: "3", reps: "10-12", weight: "" },
    { exercise: "Glutes", sets: "3", reps: "10-12", weight: "" },
];
