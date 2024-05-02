const dialog = document.querySelector("dialog");
const closeBtn = document.querySelector("dialog button");
import { state } from "./state";
export const openDialog = (i: number) => {
    dialog?.showModal();
    const programToRender = state.savedExercises[i];

    state.savedExercises[i].data.forEach((each) => {
        dialog?.insertAdjacentHTML(
            "afterbegin",
            `
            
        <div class="stored_exercise_div">
            <p>${each.exercise}</p> 
            <div>
                <p>Sett: ${each.sets}</p>
                <p >Reps: ${each.reps}</p>
                <p >Vekt: ${each.weight}</p>
            </div>
        </div>
        `
        );
    });
};

closeBtn?.addEventListener("click", () => {
    dialog?.close();
});
