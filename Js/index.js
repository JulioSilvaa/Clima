const endPoint = "https://api.openweathermap.org/data/2.5/weather?";
const apiKey = "9e3a2914bf0ab7dca99dd1021a1cf029";
const apiCountryURL = "https://countryflagsapi.com/png/";
const apiUnsplash = "https://source.unsplash.com/1600x900/?";

const cityInput = document.querySelector("#city-input");
const serachButton = document.querySelector("#search");

// Elementos do HTML
const cityElement = document.querySelector("#city");
const temp = document.querySelector("#temperature span");
const desc = document.querySelector("#description");
const weatherIcon = document.querySelector("#weather-icon");
const country = document.querySelector("#country");
const humidity = document.querySelector("#humidity span");
const wind = document.querySelector("#wind span");
const weatherContainer = document.querySelector("#weather-data");
const errorMessageContainer = document.querySelector("#error-message");
const loader = document.querySelector("#loader");

//loader
const toggleLoader = () => {
  loader.classList.toggle("hide");
};

// Tratamento de erro
const showErrorMessage = () => {
  errorMessageContainer.classList.remove("hide");
};

const hideInformation = () => {
  errorMessageContainer.classList.add("hide");
  weatherContainer.classList.add("hide");
};

const getWeatherData = async (city) => {
  toggleLoader();
  const apiWeatherURL = `${endPoint}q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
  const res = await fetch(apiWeatherURL);
  const data = await res.json();
  toggleLoader();

  return data;
};

const showWeatherData = async (city) => {
  hideInformation();

  const data = await getWeatherData(city);

  if (data.cod === "404") {
    showErrorMessage();
    return;
  }

  cityElement.innerText = data.name;
  temp.innerText = parseInt(data.main.temp);
  desc.innerText = data.weather[0].description;
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
  );
  country.setAttribute("src", apiCountryURL + data.sys.country);
  humidity.innerText = `${data.main.humidity}%`;
  wind.innerText = `${data.wind.speed}km/h`;

  weatherContainer.classList.remove("hide");
};

serachButton.addEventListener("click", (event) => {
  event.preventDefault();
  if (!cityInput.value) {
    Toastify({
      text: "Digite uma Cidade Valida",
      className: "alert",
      style: {
        background: "blue",
      },
    }).showToast();
  } else {
    const city = cityInput.value;
    showWeatherData(city);
  }
});

cityInput.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    const city = event.target.value;
    showWeatherData(city);
  }
});
