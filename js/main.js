(() => {
  const planetList = document.querySelector(".planet-list");
  const reviewTemplate = document.querySelector(".details-template");
  const detailsCon = document.querySelector(".details-con");
  const planetImage = document.querySelector(".planet img");
  const baseUrl = "https://swapi.dev/api/planets/";
  const loader = document.querySelector(".loader");

  // Array of planet images (Make sure these are correctly named)
  const planetImages = {
    Tatooine: "images/tatooine.png",
    Alderaan: "images/alderaan.png",
    "Yavin IV": "images/yavin.png",
    Hoth: "images/hoth.png",
    Dagobah: "images/dagobah.png",
    Bespin: "images/bespin.png",
    Endor: "images/endor.png",
    Naboo: "images/naboo.png",
    Coruscant: "images/coruscant.png",
    Kamino: "images/kamino.png",
  };

  function getPlanets() {
    loader.style.display = "block";
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
        loader.style.display = "none";
      })
      .catch(function (err) {
        console.log(err);
        loader.style.display = "none";
      });
  }

  function getDetails(e) {
    e.preventDefault();
    const url = e.currentTarget.dataset.url;
    const planetName = e.currentTarget.textContent;
    
    detailsCon.innerHTML = "";
    detailsCon.appendChild(loader);
    loader.style.display = "block";

    fetch(url)
    .then((response) => response.json())
    .then((data) => {
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

        //updating the image of planet on click
        if (planetImages[planetName]) {
          planetImage.src = planetImages[planetName];
          planetImage.alt = planetName;
        } else {
          planetImage.src = "images/default.png";
          planetImage.alt = "planet burst!";
        }
        loader.style.display = "none";
      })
      .catch(function (err) {
        console.log(err);
        detailsCon.innerHTML = "<p>No details found!</p>";
        loader.style.display = "none";
      });
  }

  getPlanets();
})();
