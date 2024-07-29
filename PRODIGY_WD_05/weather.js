const searchButton = document.getElementById('search-button');
const cityInput = document.getElementById('city-input');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const temperatureGraph = document.getElementById('temperature-graph');

const apiKey = '8010279b0bd890d989f7c373868b2093';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';

let chartInstance = null;

async function fetchWeather(city) {
    try {
        const response = await fetch(`${apiUrl}${city}&units=metric&appid=${apiKey}`);
        const data = await response.json();
        updateUI(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function updateUI(data) {
    if (data.cod !== 200) {
        alert('City not found!');
        return;
    }
    cityName.innerHTML = data.name;
    temperature.innerHTML = `${Math.round(data.main.temp)}°C`;
    description.innerHTML = data.weather[0].description;

    const temperatureData = [data.main.temp];
    drawTemperatureGraph(temperatureData);
}

function drawTemperatureGraph(temperatureData) {
    if (chartInstance) {
        chartInstance.destroy();
    }

    const ctx = temperatureGraph.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, 'rgba(0, 123, 255, 0.5)');
    gradient.addColorStop(1, 'rgba(0, 123, 255, 0.1)');

    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Now'],
            datasets: [{
                label: 'Temperature (°C)',
                data: temperatureData,
                backgroundColor: gradient,
                borderColor: '#007bff',
                pointBackgroundColor: '#007bff',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#007bff',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: '#007bff',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#007bff',
                    borderWidth: 1
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        display: false
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

searchButton.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        alert('Please enter a city name.');
    }
});
