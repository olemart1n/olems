import { state } from "./state";

export function setStateBasedOnLocalStorage() {
    if (!localStorage.getItem("storedExercises")) {
        localStorage.setItem("storedExercises", "[]");
    } else {
        state.storedLocal = JSON.parse(localStorage.getItem("storedExercises")!);
    }
}
