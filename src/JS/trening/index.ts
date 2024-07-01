import "../../CSS/trening.css";
import { displayProgramForm, addExerciseToObject } from "./form";
import { state, fullBody, lowerBody, upperBody } from "./state";
import { openDialog } from "./dialog";

const form = document.querySelector("form");
const prevExercises = document.querySelector("#prev_exercises");

if (!localStorage.getItem("storedExercises")) {
    localStorage.setItem("storedExercises", "[]");
} else {
    state.storedLocal = JSON.parse(localStorage.getItem("storedExercises")!);
}

form?.addEventListener("submit", (e) => {
    e.preventDefault();

    for (let i = 0; i <= 4; i++) {
        addExerciseToObject(i.toString());
    }

    state.storedLocal.push({
        prog: state.programToDisplay,
        data: state.currentProgram,
        date: new Date().toISOString().substring(5, 10),
    });

    localStorage.removeItem("storedExercises");
    localStorage.setItem("storedExercises", JSON.stringify(state.storedLocal));
    state.currentProgram = [];
    form.reset();
    renderStoredLocal();
});

export const renderStoredLocal = () => {
    prevExercises!.innerHTML = "";
    state.storedLocal.forEach((saved, i) => {
        const div = document.createElement("div");
        div.style.display = "flex";
        div.style.alignItems = "center";
        div.style.gap = "5px";
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
        prevExercises!.insertAdjacentElement("afterbegin", div);
    });
};

const displayChosenProgram = (prog: string = "overkropp") => {
    if (prog === "fullkropp") {
        displayProgramForm(fullBody);
    } else if (prog === "overkropp") {
        displayProgramForm(upperBody);
    } else if (prog === "underkropp") {
        displayProgramForm(lowerBody);
    } else {
        return;
    }
};

document.querySelector<HTMLSelectElement>("#program")?.addEventListener("change", function () {
    displayChosenProgram(this.value);
    state.programToDisplay = this.value;
});

displayChosenProgram();
renderStoredLocal();
