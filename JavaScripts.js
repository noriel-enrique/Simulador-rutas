// Función para calcular el tiempo de entrega según la distancia y transporte
function calcularTiempoEntrega(distancia, transporte) {
    let velocidad;

    // Definir velocidad por tipo de transporte (en km/h)
    switch (transporte) {
        case "bicicleta":
            velocidad = 15; // km/h
            break;
        case "moto":
            velocidad = 80; // km/h
            break;
        case "auto":
            velocidad = 100; // km/h
            break;
        case "camion":
            velocidad = 50; // km/h
            break;
        case "mula":
            velocidad = 5; // km/h
            break;
        case "apie":
            velocidad = 4; // km/h
            break;
        case "scooter":
            velocidad = 25; // km/h
            break;
        default:
            velocidad = 0;
    }

    if (velocidad === 0) {
        return "Transporte no válido.";
    }

    // Calcular tiempo en horas
    let tiempoHoras = distancia / velocidad;

    // Convertir tiempo en horas a horas, minutos y segundos
    let horas = Math.floor(tiempoHoras);
    let minutos = Math.floor((tiempoHoras - horas) * 60);
    let segundos = Math.floor((((tiempoHoras - horas) * 60) - minutos) * 60);

    return `${horas} horas, ${minutos} minutos, ${segundos} segundos`;
}

// Actualizar el gráfico de rutas
function updateChart(distancia, transporte) {
    // Actualizar datos del gráfico
    chart.data.labels.push(transporte);
    chart.data.datasets[0].data.push(distancia);
    chart.update();
}

// Evento para calcular el tiempo de entrega y mostrar el historial
document.getElementById("calcular").addEventListener("click", function () {
    const inicio = document.getElementById("inicio").value;
    const destino = document.getElementById("destino").value;
    const distancia = parseFloat(document.getElementById("distancia").value);
    const transporte = document.getElementById("transporte").value;

    if (!inicio || !destino) {
        document.getElementById("output").innerText = "Por favor, ingrese el punto de inicio y destino.";
        return;
    }

    if (!isNaN(distancia) && distancia > 0) {
        const tiempoEntrega = calcularTiempoEntrega(distancia, transporte);

        // Mostrar el tiempo de entrega calculado
        document.getElementById("output").innerText = `Ruta: ${inicio} a ${destino}. Tiempo estimado: ${tiempoEntrega}`;

        // Guardar en el historial
        let historyElement = document.createElement("li");
        historyElement.textContent = `Ruta: ${inicio} a ${destino}, Transporte: ${transporte}, Distancia: ${distancia} km, Tiempo: ${tiempoEntrega}`;
        document.getElementById("historyList").appendChild(historyElement);

        // Simular la ruta en el gráfico
        updateChart(distancia, transporte);
    } else {
        document.getElementById("output").innerText = "Por favor, ingrese una distancia válida.";
    }
});

// Crear el gráfico de rutas
const ctx = document.getElementById('routeChart').getContext('2d');
const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Distancia recorrida (km)',
            data: [],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Distancia (km)'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Método de Transporte'
                }
            }
        }
    }
});
