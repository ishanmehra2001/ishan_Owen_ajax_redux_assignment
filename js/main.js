(() => {
  const planetList = document.querySelector(".planet-list");
  const reviewTemplate = document.querySelector(".details-template");
  const detailsCon = document.querySelector(".details-con");
  const baseUrl = `https://swapi.dev/api/planets/`;

  function getPlanets() {
    fetch(baseUrl)
      .then((response) => response.json())
      .then(function (response) {
        console.log(response);

        const planetName = response.results;
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
        const links = document.querySelectorAll(".planet-list ul li a");
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

    fetch(url)
      .then((response) => response.json())
      .then(function (data) {
        console.log(data);
        detailsCon.innerHTML = "";
        const details = reviewTemplate.content.cloneNode(true);

        details.querySelector(".planet-name").textContent = data.name;
        details.querySelector(
          ".planet-rotation"
        ).textContent = `Rotation Period: ${data.rotation_period}`;
        details.querySelector(
          ".planet-orbital"
        ).textContent = `Orbital Period: ${data.orbital_period}`;
        details.querySelector(
          ".planet-diameter"
        ).textContent = `Diameter: ${data.diameter}`;
        details.querySelector(
          ".planet-climate"
        ).textContent = `Climate: ${data.climate}`;
        details.querySelector(
          ".planet-gravity"
        ).textContent = `Gravity: ${data.gravity}`;
        details.querySelector(
          ".planet-terrain"
        ).textContent = `Terrain: ${data.terrain}`;
        details.querySelector(
          ".planet-water"
        ).textContent = `Surface Water: ${data.surface_water}`;
        details.querySelector(
          ".planet-population"
        ).textContent = `Population: ${data.population}`;

        detailsCon.appendChild(details);
      })
      .catch(function (err) {
        console.log(err);
        detailsCon.innerHTML = "<p>No details found!</p>";
      });
  }

  getPlanets();
})();
