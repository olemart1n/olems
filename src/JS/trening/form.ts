import { type Exercise, state } from "./state";

const findValue = (inputEl: HTMLInputElement | null) => {
    return inputEl ? inputEl.value : "";
};
const getSpanInnerHTML = (spanEl: HTMLSpanElement | null) => {
    return spanEl?.innerHTML as string;
};

export const addExerciseToObject = (key: string) => {
    const newExercise: Exercise = {
        exercise: getSpanInnerHTML(document.querySelector(`[data-exercise="${key}"]`) ?? null),
        sets: getSpanInnerHTML(document.querySelector(`[data-sets="${key}"]`) ?? null),
        reps: findValue(document.querySelector(`[data-reps="${key}"]`) ?? null),
        weight: findValue(document.querySelector(`[data-weight="${key}"]`) ?? null),
    };
    state.currentProgram.push(newExercise);
};
export const displayProgramForm = (prog: Exercise[]) => {
    document.querySelector<HTMLFormElement>("form")!.innerHTML = "";

    prog.forEach((step, i) => {
        // addExerciseToObject(i.toString());
        const parentDiv = document.createElement("div");
        parentDiv.classList.add("form_exercise");
        parentDiv.innerHTML += `
        <div>
            <p ><span data-exercise="${i}">${step.exercise}</span>, <span data-sets="${i}">${step.sets}</span> sett</p>
        </div>
        <input name="exercise" class="hidden" value="${step.exercise}" name="sets"/>
    `;

        const inputReps = input("data-reps", "reps", i.toString());
        inputReps.placeholder = step.reps;
        const inputWeight = input("data-weight", "weight", i.toString());
        //
        parentDiv.insertAdjacentElement("beforeend", inputReps);
        parentDiv.insertAdjacentElement("beforeend", inputWeight);
        //
        document
            .querySelector<HTMLFormElement>("form")!
            .insertAdjacentElement("afterbegin", parentDiv);
    });
    document
        .querySelector<HTMLFormElement>("form")!
        .insertAdjacentHTML("beforeend", "<button id='submit_btn'>Loggfør</button>");
};

function input(attr: string, className: string, i: string) {
    const input = document.createElement("input");
    input.classList.add(className);
    input.setAttribute(attr, i);
    return input;
}
