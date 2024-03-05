function renderChart(pokeData) {
    const ctx = document.getElementById('myChart');
    document.getElementById('myChart').style.display = 'unset';
    let stats = [
        pokeData['stats'][0]['base_stat'],
        pokeData['stats'][1]['base_stat'],
        pokeData['stats'][2]['base_stat'],
        pokeData['stats'][3]['base_stat'],
        pokeData['stats'][4]['base_stat'],
        pokeData['stats'][5]['base_stat']
    ];
    const CHART_BG_COLOR = [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
    ];
    const CHART_LABEL_NAMES = [
        'HP', 'Attack', 'Defense', 'Sp. Atk', 'Sp. Def', 'Speed'
    ]

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: CHART_LABEL_NAMES,
            datasets: [{
                label: 'Base Stats',
                data: stats,
                backgroundColor: CHART_BG_COLOR,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}