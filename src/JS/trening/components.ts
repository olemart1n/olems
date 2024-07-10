import { openDialog } from "./dialog";
import type { StoredExercises } from "./state";
import type { Exercise } from "./state";
export const savedExerciseButton = (
    saved: StoredExercises,
    i: number,
    prevExercisesDiv: Element | null
) => {
    const div = document.createElement("div");
    div.classList.add("savedExerciseButton");

    const button = document.createElement("button");
    const trash = document.createElement("button");
    trash.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>`;

    button.addEventListener("click", () => {
        openDialog(i);
    });
    button.innerHTML = `<button key=${i}>${saved.prog} | ${saved.date
        .toString()
        .substring(5, 10)}</button>`;

    div.insertAdjacentElement("afterbegin", button);
    div.insertAdjacentElement("beforeend", trash);
    prevExercisesDiv!.insertAdjacentElement("afterbegin", div);
};

export const formExercideDiv = (i: number, step: Exercise) => {
    const parentDiv = document.createElement("div");
    parentDiv.classList.add("form_exercise");
    parentDiv.innerHTML += `
<div>
    <p ><span data-exercise="${i}">${step.exercise}</span></p>
    <p ><span data-sets="${i}">${step.sets}</span> sett</p>
</div>
<input name="exercise" class="hidden" value="${step.exercise}" name="sets"/>
`;

    const inputReps = input("data-reps", "reps", i.toString());
    inputReps.placeholder = step.reps;
    const inputWeight = input("data-weight", "weight", i.toString());

    const inputsWrapper = document.createElement("div");
    inputsWrapper.classList.add("inputsWrapper");
    //
    inputsWrapper.insertAdjacentElement("beforeend", inputReps);
    inputsWrapper.insertAdjacentElement("beforeend", inputWeight);
    parentDiv.insertAdjacentElement("beforeend", inputsWrapper);
    //
    document.querySelector<HTMLFormElement>("form")!.insertAdjacentElement("afterbegin", parentDiv);
};

function input(attr: string, className: string, i: string) {
    const input = document.createElement("input");
    input.classList.add(className);
    input.setAttribute(attr, i);
    return input;
}
