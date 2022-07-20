const graphContainer = document.querySelector(".spending-graph");

async function fetchGraphData() {
  const response = await fetch("./data.json");
  const jsonData = response.json();
  return jsonData;
}

async function loadGraphData() {
  const data = await fetchGraphData();

  data.map((element) => {
    const graphDiv = graphBar(element.day, element.amount);

    graphContainer.appendChild(graphDiv);
  });
}

// window.addEventListener("DOMContentLoaded", loadGraphData);
loadGraphData();

const graphBar = (day, amount) => {
  const graphDiv = document.createElement("div");

  graphDiv.classList.add("spending-graph--week", "flex", "flex-col");

  graphDiv.innerHTML = `<div class="spending-graph--week__amt">$${amount}</div>
                        <div class="spending-graph--week__bar"></div>
                        <p class="spending-graph--week__day">${day}</p>`;

  const graphBar = graphDiv.querySelector(".spending-graph--week__bar");
  const graphAmt = graphDiv.querySelector(".spending-graph--week__amt");

  graphBar.style.height = `${amount * 3}px`;

  if (amount > 50) {
    graphBar.style.backgroundColor = "hsl(186, 34%, 60%)";
  }

  graphBar.addEventListener("mouseover", () => {
    graphAmt.style.opacity = 1;
    graphBar.style.opacity = 0.7;
  });

  graphBar.addEventListener("mouseout", () => {
    graphAmt.style.opacity = 0;
    graphBar.style.opacity = 1;
  });

  return graphDiv;
};
