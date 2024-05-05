import "../../CSS/trening.css";
import { fullBody, lowerBody, upperBody } from "./definitions";
import { programForm } from "./form";
import { state } from "./state";
import { openDialog } from "./dialog";
const form = document.querySelector("form");

form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const localStored = localStorage.getItem("storedExercises");
    state.savedExercises = JSON.parse(localStored!);
    state.savedExercises.push({
        prog: state.currentProgram,
        data: state.completedExercises,
        date: new Date(),
    });
    localStorage.removeItem("storedExercises");
    localStorage.setItem("storedExercises", JSON.stringify(state.savedExercises));
    form.reset();
    renderStoredTrainings();
});

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

if (!localStorage.getItem("storedExercises")) {
    localStorage.setItem("storedExercises", "[]");
} else {
    const stored = localStorage.getItem("storedExercises");
    state.savedExercises = JSON.parse(stored!);
    renderStoredTrainings();
}

document.querySelector<HTMLSelectElement>("#program")?.addEventListener("change", function () {
    displayChosenProgram(this.value);
    state.currentProgram = this.value;
});

displayChosenProgram();
