import "../../CSS/trening.css";
import { displayProgramForm, addExerciseToObject } from "./form";
import { state, fullBody, lowerBody, upperBody } from "./state";

import { form, prevExercisesDiv } from "./elements";
import { setStateBasedOnLocalStorage } from "./localStorage";
import { savedExerciseButton } from "./components";
setStateBasedOnLocalStorage();
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
    form!.reset();
    renderStoredLocally();
});

export const renderStoredLocally = () => {
    prevExercisesDiv!.innerHTML = "";
    state.storedLocal.forEach((saved, i) => {
        savedExerciseButton(saved, i, prevExercisesDiv);
    });
};

document.querySelector<HTMLSelectElement>("#program")?.addEventListener("change", function () {
    state.programToDisplay = this.value;
    switch (this.value) {
        case "fullkropp":
            displayProgramForm(fullBody);
            break;
        case "overkropp":
            displayProgramForm(upperBody);
            break;
        case "underkropp":
            displayProgramForm(lowerBody);
            break;
        default:
            break;
    }
});
displayProgramForm(upperBody);
renderStoredLocally();
