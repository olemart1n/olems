import type { Exercise } from "./definitions";
import { state } from "./state";

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
    state.completedExercises.push(newExercise);
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
        const inputReps = document.createElement("input");
        inputReps.classList.add("reps");
        inputReps.placeholder = step.reps;
        inputReps.setAttribute("data-reps", i.toString());
        parentDiv.insertAdjacentElement("beforeend", inputReps);
        const inputWeight = document.createElement("input");
        inputWeight.classList.add("weight");
        inputWeight.placeholder = "vekt";
        inputReps.setAttribute("data-weight", i.toString());
        parentDiv.insertAdjacentElement("beforeend", inputWeight);
        document
            .querySelector<HTMLFormElement>("form")!
            .insertAdjacentElement("afterbegin", parentDiv);
    });
    document
        .querySelector<HTMLFormElement>("form")!
        .insertAdjacentHTML("beforeend", "<button id='submit_btn'>Loggfør</button>");
};

export const resetButtonsColors = () => {
    const btns = document.querySelectorAll<HTMLButtonElement>(".form_exercise_button");
    btns.forEach((btn) => {
        btn.style.backgroundColor = "#808080";
    });
};
