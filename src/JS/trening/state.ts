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

if (!localStorage.getItem("storedExercises")) {
    localStorage.setItem("storedExercises", "[]");
} else {
    state.savedExercises = JSON.parse(localStorage.getItem("storedExercises")!);
}
