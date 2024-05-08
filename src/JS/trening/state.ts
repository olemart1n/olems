import type { Exercise, StoredExercises } from "./definitions";
interface State {
    completedExercises: Exercise[];
    currentProgram: string;
    savedExercises: StoredExercises[];
}
export const state: State = {
    completedExercises: [],
    currentProgram: "overkropp",
    savedExercises: [],
};
