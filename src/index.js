import tippy from "tippy.js";
import "tippy.js/dist/tippy.css"; // optional for styling
import "tippy.js/themes/light.css";
import "./styles.scss";
import drawCharts from "./stateCharts.js";
import stateData from "./data";

const stateContent = document.getElementById("state-content");
const stateTitle = document.getElementById("state-title");
const stateName = document.getElementById("stateName");
const totalDeaths = document.getElementById("totalDeaths");
const totalCost = document.getElementById("totalCost");
const totalNox = document.getElementById("totalNox");
const totalVoc = document.getElementById("totalVoc");

const getClosest = function (elem, selector) {
  // Element.matches() polyfill
  if (!Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.matchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector ||
      Element.prototype.oMatchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      function (s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
          i = matches.length;
        while (--i >= 0 && matches.item(i) !== this) {}
        return i > -1;
      };
  }

  // Get the closest matching element
  for (; elem && elem !== document; elem = elem.parentNode) {
    if (elem.matches(selector)) return elem;
  }
  return null;
};

const formatDeaths = (deaths) => {
  if (deaths === 0) {
    return deaths;
  } else if (deaths / 1000000000 >= 1) {
    return deaths / 1000000000 + " billion";
  } else if (deaths / 1000000 >= 1) {
    return deaths / 1000000 + " million";
  } else {
    return deaths;
  }
};

const formatCost = (cost) => {
  if (cost === 0) {
    return "$" + cost;
  } else if (cost / 1000000000 >= 1) {
    return "$" + cost / 1000000000 + " billion";
  } else if (cost / 1000000 >= 1) {
    return "$" + cost / 1000000 + " million";
  } else {
    return "$" + cost;
  }
};

const initMap = () => {
  const states = document.querySelectorAll(".state");
  states.forEach((state) => {
    state.addEventListener("click", (e) => {
      states.forEach((state) => {
        state.classList.remove("active");
      });
      const parentState = getClosest(e.target, ".state");
      parentState.classList.add("active");
      window.location.hash = parentState.id;
    });
  });
};

tippy("[data-state]", {
  content: (reference) => {
    let deaths = reference.dataset.deaths;
    if (deaths.includes(",")) {
      deaths = deaths.replace(",", ".") + " billion";
    } else {
      deaths = deaths + " million";
    }
    let cost = reference.dataset.cost;
    if (cost.includes(",")) {
      cost = cost.replace(",", ".") + " billion";
    } else {
      cost = cost + " million";
    }
    return `
        <div class="tooltip-content">
          <h4>${reference.dataset.state}</h4>
          <small><em>Air Pollution Health Impacts<br>from Buildings</em></small>
          <span><strong>Deaths:</strong> ${deaths}</span>
          <span><strong>Costs:</strong> $${cost}</span>
          <small>Click the state for more details</small>
        </div>
      `;
  },
  allowHTML: true,
  theme: "light"
});

const handleDataChange = () => {
  let stateID = window.location.hash.replace("#", "", "g"); //KS
  let state = document.getElementById(stateID);
  if (!state) {
    state = document.getElementById("AL");
    stateID = "AL";
  }
  stateContent.classList.remove("is-visible");
  stateTitle.innerHTML = `<strong>${state.dataset.state}</strong>`;
  stateName.innerHTML = stateData[stateID].name;
  totalDeaths.innerHTML = formatDeaths(stateData[stateID].deaths_total);
  totalCost.innerHTML = formatCost(stateData[stateID].health_cost_total);
  totalNox.innerHTML = formatCost(stateData[stateID].nox_total);
  totalVoc.innerHTML = formatCost(stateData[stateID].voc_total);
  stateContent.classList.add("is-visible");
  drawCharts(stateID);
};

if (window.location.hash) {
  let hashValue = window.location.hash.replace("#", "", "g");
  if (!document.getElementById(hashValue)) {
    hashValue = "AL";
  }
  document.getElementById(hashValue).classList.add("active");
  handleDataChange();
} else {
  console.log(`no hash yet, keep cool`);
}

window.onhashchange = handleDataChange;

(() => {
  initMap();
})();
