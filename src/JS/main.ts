import "../CSS/main.css";
import Handlelista from "/handlelista.png";
const date = new Date();
const hours = date.getHours().toString().padStart(2, "0");
const minutes = date.getMinutes().toString().padStart(2, "0");
const formattedTime = `${hours}:${minutes}`;
// Recommended way, to include only the icons you need.

document.querySelector<HTMLDivElement>("main")!.innerHTML = `
<div>
  <div class="project">
    <div class="iphone">
        <p class="clock">${formattedTime}</p>
        <div data-lucide="Signal" class="signal">
          <div class="col col_1"></div>    
          <div class="col col_2"></div>    
          <div class="col col_3"></div>    
          <div class="col col_4"></div>    
        </div>
        <img class="handlelista-screenshot" src=${Handlelista} />

        <div class="safari_bottom">
        <div class="safari_url_input">
        <p>handlelista.no<p>
        </div>
        <div class="safari_options">
          <div class="option">
            <div class="arrow_left"></div>
          </div>
          <div class="option">
            <div class="arrow_right"></div>
          </div>
          <div class="option">
            <div class="share_button"></div>
          </div>
          <div class="option">
            <div class="book">
              <div class="book_page1"></div>
              <div class="book_page2"></div>
            </div>
          </div>
          <div class="option">
              <div class="tabs">
                <div class="tab tab1"></div>
                <div class="tab tab2"></div>
              </div>
          </div>
      </div>
    </div>
    </div>
    <div class="handlelista_links">
    <a href="https://handlelista.no" target="_blank">qwik.handlelista.no</a>
    <a href="https://svelte.handlelista.no" target="_blank">svelte.handlelista.no</a>
    </div>
  </div>

</div>
`;
