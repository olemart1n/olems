import { state } from "./state";
const dialog = document.querySelector("dialog");
const dialogDiv = document.querySelector("#previous_exercise_program");

export const openDialog = (i: number) => {
    dialog?.showModal();
    const closeBtn = document.createElement("button");
    closeBtn.innerHTML = "Lukk";
    closeBtn?.addEventListener("click", () => {
        dialogDiv!.innerHTML = "";
        closeBtn.remove();
        dialog?.close();
    });
    state.storedLocal[i].data.forEach((each) => {
        dialogDiv?.insertAdjacentHTML(
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
    dialog?.insertAdjacentElement("beforeend", closeBtn);
};
