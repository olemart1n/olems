import type { Exercise } from "./definitions";
import { state } from "./state";

const findValue = (inputEl: HTMLInputElement | null) => {
    return inputEl ? inputEl.value : "";
};
const getSpanInnerHTML = (spanEl: HTMLSpanElement | null) => {
    return spanEl?.innerHTML as string;
};

const addExerciseToObject = (key: string) => {
    const newExercise: Exercise = {
        exercise: getSpanInnerHTML(document.querySelector(`[data-exercise="${key}"]`) ?? null),
        sets: getSpanInnerHTML(document.querySelector(`[data-sets="${key}"]`) ?? null),
        reps: findValue(document.querySelector(`[data-reps="${key}"]`) ?? null),
        weight: findValue(document.querySelector(`[data-weight="${key}"]`) ?? null),
    };
    state.completedExercises.push(newExercise);
};
export const programForm = (prog: Exercise[]) => {
    document.querySelector<HTMLFormElement>("form")!.innerHTML = "";

    prog.forEach((step, i) => {
        const button = document.createElement("button");
        button.classList.add("form_exercise_button");
        button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>`;
        button.setAttribute("type", "button");
        button.addEventListener("click", (e) => {
            addExerciseToObject(i.toString());
            button.style.backgroundColor = "rgb(146, 222, 146)";
        });
        const parentDiv = document.createElement("div");
        parentDiv.classList.add("form_exercise");
        document
            .querySelector<HTMLFormElement>("form")!
            .insertAdjacentElement("afterbegin", parentDiv);
        parentDiv.innerHTML += `
            <div>
                <p ><span data-exercise="${i}">${step.exercise}</span>, <span data-sets="${i}">${step.sets}</span> sett</p>
                <input data-reps="${i}" placeholder="reps: ${step.reps}" name="reps"/>
                <input data-weight="${i}" placeholder="vekt" name="kg"/>
            </div>
            <input name="exercise" class="hidden" value="${step.exercise}" name="sets"/>
        `;
        parentDiv.insertAdjacentElement("beforeend", button);
    });
    document
        .querySelector<HTMLFormElement>("form")!
        .insertAdjacentHTML("beforeend", "<button>Loggfør</button>");
};
