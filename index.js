const graphContainer = document.querySelector(".spending-graph");

// fetching data from json file
async function fetchGraphData() {
  const response = await fetch("./data.json");
  const jsonData = response.json();
  return jsonData;
}

// displaying data received from json file to DOM
async function loadGraphData() {
  const data = await fetchGraphData();

  data.map((element) => {
    const graphDiv = createGraphBar(element.day, element.amount);

    graphContainer.appendChild(graphDiv);
  });
}

// displaying data on loading window
window.addEventListener("DOMContentLoaded", loadGraphData());

// create graph chart and controlling its functioning
const createGraphBar = (day, amount) => {
  const graphDiv = document.createElement("div");

  graphDiv.classList.add("spending-graph--week", "flex", "flex-col");

  graphDiv.innerHTML = `<div class="spending-graph--week__amt">$${amount}</div>
                        <div class="spending-graph--week__bar"></div>
                        <p class="spending-graph--week__day">${day}</p>`;

  // selectors
  const graphBarDiv = graphDiv.querySelector(".spending-graph--week__bar");
  const graphAmt = graphDiv.querySelector(".spending-graph--week__amt");

  // managing height of the graph bar
  graphBarDiv.style.height = `${amount * 3}px`;

  // changing the color of the graph bar with highest amount.
  if (amount > 50) {
    graphBarDiv.style.backgroundColor = "hsl(186, 34%, 60%)";
  }

  // mouse events invoked.
  mouseOver(graphAmt, graphBarDiv);

  mouseOut(graphAmt, graphBarDiv);

  return graphDiv;
};

// mouse events declared.
function mouseOver(amount, bar) {
  bar.addEventListener("mouseover", () => {
    amount.style.opacity = 1;
    bar.style.opacity = 0.7;
  });
}

function mouseOut(amount, bar) {
  bar.addEventListener("mouseout", () => {
    amount.style.opacity = 0;
    bar.style.opacity = 1;
  });
}
