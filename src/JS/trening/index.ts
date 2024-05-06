import "../../CSS/trening.css";
import { fullBody, lowerBody, upperBody } from "./definitions";
import { programForm, resetButtonsColors } from "./form";
import { state } from "./state";
import { openDialog } from "./dialog";
const form = document.querySelector("form");
const prevExercises = document.querySelector("#prev_exercises");
form?.addEventListener("submit", (e) => {
    e.preventDefault();
    state.savedExercises.push({
        prog: state.currentProgram,
        data: state.completedExercises,
        date: new Date(),
    });
    localStorage.removeItem("storedExercises");
    localStorage.setItem("storedExercises", JSON.stringify(state.savedExercises));
    state.completedExercises = [];
    form.reset();
    resetButtonsColors();
    renderPrevExercises();
});

export const renderPrevExercises = () => {
    prevExercises!.innerHTML = "";
    state.savedExercises.forEach((saved, i) => {
        const button = document.createElement("button");
        button.addEventListener("click", () => {
            openDialog(i);
        });
        button.innerHTML = `<button key=${i}>${saved.prog} | ${saved.date
            .toString()
            .substring(5, 10)}</button>`;
        prevExercises!.insertAdjacentElement("afterbegin", button);
    });
};

const displayChosenProgram = (prog: string = "overkropp") => {
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

document.querySelector<HTMLSelectElement>("#program")?.addEventListener("change", function () {
    displayChosenProgram(this.value);
    state.currentProgram = this.value;
});

displayChosenProgram();
renderPrevExercises();
