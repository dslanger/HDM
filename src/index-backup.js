import tippy from "tippy.js";
import "tippy.js/dist/tippy.css"; // optional for styling
import "tippy.js/themes/light.css";
import "./styles.scss";
import { stateDataTwo } from "./stateDataTwo.js";
import * as d3 from "d3";

const yearOptions = document.getElementsByClassName("year-option");
const stateTitle = document.getElementById("state-title");
// const stateText = document.getElementById("state-text");
const stateContent = document.getElementById("state-content");
const map = document.querySelector(".map");

const initMap = () => {
  // map.addEventListener("click", function () {
  //   this.classList.add("is-active");
  //   //TODO refactor to remove event listener after initial fire
  // });
  const states = document.querySelectorAll(".state path");
  states.forEach((state) => {
    state.addEventListener("click", (e) => {
      states.forEach((state) => {
        state.classList.remove("active");
      });
      e.target.classList.add("active");
      window.location.hash = e.target.id;
    });
  });
};

const initYearOptions = () => {
  for (var i = 0; i < yearOptions.length; i++) {
    yearOptions[i].addEventListener("change", () => {
      updateData();
    });
  }
};

const toolTips = tippy(".state path", {
  content: (reference) => {
    return `
        <div class="tooltip-content">
          <span><strong>Total:</strong> $${reference.dataset.total} millions</span>
          <span><strong>Commercial:</strong> $${reference.dataset.commercial} millions</span>
          <span><strong>Residential:</strong> $${reference.dataset.residential} millions</span>
        </div>
      `;
  },
  allowHTML: true,
  theme: "light"
});

const getZone = (year) => {
  if (year <= 10) {
    return 1;
  } else if (year > 10 && year <= 20) {
    return 2;
  } else if (year > 20 && year <= 30) {
    return 3;
  } else if (year > 30 && year <= 40) {
    return 4;
  } else if (year > 40 && year <= 50) {
    return 5;
  } else {
    return 0;
  }
};

const updateData = (year = "2017") => {
  for (var i = 0; i < yearOptions.length; i++) {
    if (yearOptions[i].checked) {
      year = yearOptions[i].value;
    }
  }
  stateDataTwo.forEach((state) => {
    let path = document.getElementById(state.id);
    path.setAttribute("data-year", state[year].heat);
    path.setAttribute("data-zone", getZone(state[year].heat));
    path.setAttribute("data-total", state[year].total);
    path.setAttribute("data-commercial", state[year].commercial);
    path.setAttribute("data-residential", state[year].residential);
    toolTips.forEach((toolTip) => {
      toolTip.setContent((reference) => {
        return `
            <div class="tooltip-content">
              <span><strong>Total:</strong> $${reference.dataset.total} millions</span>
              <span><strong>Commercial:</strong> $${reference.dataset.commercial} millions</span>
              <span><strong>Residential:</strong> $${reference.dataset.residential} millions</span>
            </div>
          `;
      });
    });
  });
};

const handleHashChange = () => {
  const stateID = window.location.hash.replace("#", "", "g"); //KS
  const state = stateDataTwo.find((state) => state.id === stateID).state;
  stateContent.classList.remove("is-visible");
  stateTitle.innerHTML = `<strong>${state}</strong> content here`;
  stateContent.classList.add("is-visible");
};

if (window.location.hash) {
  const hashValue = window.location.hash.replace("#", "", "g");
  document.getElementById(hashValue).classList.add("active");
  // map.classList.add("is-active");
  handleHashChange();
} else {
  console.log(`no hash yet, keep cool`);
}
window.onhashchange = handleHashChange;

(() => {
  initMap();
  initYearOptions();
  updateData();
})();
