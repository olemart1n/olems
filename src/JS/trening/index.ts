import "../../CSS/trening.css";
import type { Exercise } from "./definitions";
import { fullBody, lowerBody, upperBody } from "./definitions";
import { programForm } from "./form";
import { state } from "./state";
import { openDialog } from "./dialog";

export const renderStoredTrainings = () => {
    document.querySelector<HTMLDivElement>("#stored_trainings")!.innerHTML = "";
    state.savedExercises.forEach((saved, i) => {
        const button = document.createElement("button");
        button.addEventListener("click", () => {
            openDialog(i);
        });
        button.innerHTML = `<button key=${i}>${saved.prog} | ${saved.date
            .toString()
            .substring(5, 10)}</button>`;
        document
            .querySelector<HTMLDivElement>("#stored_trainings")!
            .insertAdjacentElement("afterbegin", button);
    });
};

const checkChosenProgram = (prog: string = "overkropp") => {
    if (prog === "fullkropp") {
        programForm(fullBody);
    } else if (prog === "overkropp") {
        programForm(upperBody);
    } else if (prog === "underkropp") {
        programForm(lowerBody);
    } else {
        return;
    }
};

if (!localStorage.getItem("storedExercises")) {
    localStorage.setItem("storedExercises", "[]");
} else {
    const stored = localStorage.getItem("storedExercises");
    state.savedExercises = JSON.parse(stored!);
    renderStoredTrainings();
}

document.querySelector<HTMLSelectElement>("#program")?.addEventListener("change", function () {
    checkChosenProgram(this.value);
    state.currentProgram = this.value;
});

checkChosenProgram();

window.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll<HTMLFormElement>("form").forEach((f) => {
        f.addEventListener("submit", function (e) {
            e.preventDefault();
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            const newExercise: Exercise = {
                exercise: data.exercise as string,
                sets: data.sets as string,
                reps: data.reps as string,
                weight: data.kg as string,
            };
            state.completedExercises.push(newExercise);
        });
    });
    document.querySelectorAll<HTMLButtonElement>(".submit-btn")!.forEach((btn) => {
        btn.addEventListener("click", function (e) {
            this.style.backgroundColor = "lightGreen";
        });
    });
});
