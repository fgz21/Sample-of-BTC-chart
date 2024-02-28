// Código para el gráfico de Bitcoin
const ctxBitcoin = document.getElementById('bitcoinChart').getContext('2d');
const bitcoinChart = new Chart(ctxBitcoin, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Precio de Bitcoin',
            data: [],
            borderColor: 'rgba(255, 255, 255, 1)', // Blanco
            backgroundColor: 'rgba(255, 255, 255, 0.5)', // Blanco con transparencia
            borderWidth: 1
        }]
    },
    options: {
        plugins: {
            legend: {
                labels: {
                    color: 'rgba(255, 255, 255, 1)' // Blanco
                }
            }
        },
        scales: {
            x: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.2)' // Blanco con transparencia
                },
                ticks: {
                    color: 'rgba(255, 255, 255, 1)' // Blanco
                }
            },
            y: {
                beginAtZero: false,
                grid: {
                    color: 'rgba(255, 255, 255, 0.2)' // Blanco con transparencia
                },
                ticks: {
                    color: 'rgba(255, 255, 255, 1)' // Blanco
                }
            }
        }
    }
});


function actualizarGraficoBitcoin() {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
        .then(response => response.json())
        .then(data => {
            const precio = data.bitcoin.usd;
            const hora = new Date().toLocaleTimeString();
            
            bitcoinChart.data.labels.push(hora);
            bitcoinChart.data.datasets[0].data.push(precio);
            bitcoinChart.update();
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            const lastUpdate = new Date().toLocaleTimeString();
            const mensaje = `El precio observado actualmente no está actualizado a tiempo real, última actualización ${lastUpdate}`;
            console.log(mensaje);
            setTimeout(() => {
                const alertBox = document.querySelector('.alert');
                alertBox.style.display = 'none';
            }, 3000);
        });
}

setInterval(actualizarGraficoBitcoin, 5000);