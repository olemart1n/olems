import { type Exercise, state } from "./state";
import { formExercideDiv } from "./components";
export const addExerciseToObject = (key: string) => {
    const newExercise: Exercise = {
        exercise: document.querySelector(`[data-exercise="${key}"]`)?.innerHTML ?? "",
        sets: document.querySelector(`[data-sets="${key}"]`)?.innerHTML ?? "",
        reps:
            (document.querySelector(`[data-reps="${key}"]`) as HTMLInputElement | null)?.value ??
            "",
        weight:
            (document.querySelector(`[data-weight="${key}"]`) as HTMLInputElement | null)?.value ??
            "",
    };
    state.currentProgram.push(newExercise);
};
export const displayProgramForm = (prog: Exercise[]) => {
    document.querySelector<HTMLFormElement>("form")!.innerHTML = "";

    prog.forEach((step, i) => {
        formExercideDiv(i, step);
    });
    document
        .querySelector<HTMLFormElement>("form")!
        .insertAdjacentHTML("beforeend", "<button id='submit_btn'>Loggfør</button>");
};
