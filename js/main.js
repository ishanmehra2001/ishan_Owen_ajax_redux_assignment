(() => {
  const planetList = document.querySelector(".planet-list");
  const reviewTemplate = document.querySelector(".details-template");
  const detailsCon = document.querySelector(".details-con");
  const baseUrl = `https://swapi.dev/api/planets/`;

  function getPlanets() {
    fetch(`${baseUrl}`)
      .then((response) => response.json())
      .then(function (data) {
        console.log(data);

        const planetName = data.results;
        const ul = document.createElement("ul");

        planetName.forEach((planet) => {
          const li = document.createElement("li");
          const a = document.createElement("a");
          a.textContent = planet.name;
          a.dataset.url = planet.url;
          li.appendChild(a);
          ul.appendChild(li);
        });

        planetList.appendChild(ul);
      })

      .then(function () {
        const links = document.querySelectorAll(".planet-list ul li ");
        links.forEach(function (link) {
          link.addEventListener("click", getDetails);
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  function getDetails(e) {
    e.preventDefault();
    const url = e.currentTarget.dataset.url;
    fetch(`${baseUrl}`)
      .then((response) => response.json())
      .then(function (data) {
        console.log(data);
        detailsCon.innerHTML = "";
        const details = reviewTemplate.content.cloneNode(true);
        const name = details.querySelector(".planet-name");
        name.textContent = data.name;

        const rotation = details.querySelector(".planet-rotation");
        rotation.textContent = data.rotation_period;

        const orbital = details.querySelector(".planet-orbital");
        orbital.textContent = data.orbital_period;

        const diameter = details.querySelector(".planet-diameter");
        diameter.textContent = data.diameter;

        const gravity = details.querySelector(".planet-gravity");
        gravity.textContent = data.gravity;

        const population = details.querySelector(".planet-population");
        population.textContent = data.population;

        const climate = details.querySelector(".planet-climate");
        climate.textContent = data.climate;

        const terrain = details.querySelector(".planet-terrain");
        terrain.textContent = data.terrain;

        const surface = details.querySelector(".planet-surface");
        surface.textContent = data.surface_water;

        detailsCon.appendChild(details);
      })

      .catch(function (err) {
        console.log(err);
        detailsCon.innerHTML = "<p>No details found!</p>";
      });
  }

  getPlanets();
})();
