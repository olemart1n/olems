import type { Exercise } from "./definitions";
import { renderStoredTrainings } from ".";
import { state } from "./state";
const saveButton = document.createElement("button");
saveButton.innerText = "Loggfør";

saveButton.addEventListener("click", () => {
    const localStored = localStorage.getItem("storedExercises");
    state.savedExercises = JSON.parse(localStored!);
    state.savedExercises.push({
        prog: state.currentProgram,
        data: state.completedExercises,
        date: new Date(),
    });
    localStorage.removeItem("storedExercises");
    localStorage.setItem("storedExercises", JSON.stringify(state.savedExercises));
    renderStoredTrainings();
});
export const programForm = (prog: Exercise[]) => {
    document.querySelector<HTMLDivElement>("#program-data")!.innerHTML = "";
    prog.forEach((step) => {
        document.querySelector<HTMLDivElement>(
            "#program-data"
        )!.innerHTML += `<form class="step_row">
        <p>${step.exercise}</p>
        <input name="exercise" class="hidden" value="${step.exercise}" name="sets"/>
        <input placeholder="sett: ${step.sets}" name="sets"/>
        <input placeholder="reps: ${step.reps}" name="reps"/>
        <input placeholder="vekt" name="kg"/>
        <button class="submit-btn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg></button>
        </form>`;
    });

    document
        .querySelector<HTMLDivElement>("#program-data")!
        .insertAdjacentElement("beforeend", saveButton);
};
