document.addEventListener("DOMContentLoaded", function () {
  //Hide/Show Other Country question
  const countrySelect = document.getElementById("country");
  const otherGroup = document.getElementById("other-country-group");

  if (countrySelect && otherGroup) {
    countrySelect.addEventListener("change", function () {
      if (this.value === "Other") {
        otherGroup.classList.add("show");
      } else {
        otherGroup.classList.remove("show");
      }
    });
  }

  //Hide/Show What Changed? question
  const perspectiveCheckbox = document.getElementById("perspective_change");
  const perspectiveDetails = document.getElementById("perspective-details");

  if (perspectiveCheckbox && perspectiveDetails) {
    perspectiveCheckbox.addEventListener("change", function () {
      if (this.checked) {
        perspectiveDetails.classList.add("show");
      } else {
        perspectiveDetails.classList.remove("show");
      }
    });
  }

  //Charts

  if (typeof summaryData !== 'undefined') {
    initializeCharts(summaryData);
  }

});

function initializeCharts(summaryData) {
  
  const colors = [
    'rgb(246, 211, 158)',
    'rgb(255, 179, 186)',
    'rgb(186, 225, 255)',
    'rgb(200, 230, 201)',
    'rgb(255, 224, 178)',
    'rgb(206, 147, 216)',
    'rgb(255, 245, 157)'
  ];

  // Country Chart
  if (document.getElementById('chartCountry')) {
    const countryData = {
      labels: summaryData.country_counts.map(r => r.label),
      counts: summaryData.country_counts.map(r => r.count)
    };
    
    new Chart(document.getElementById('chartCountry'), {
      type: 'bar',
      data: { 
        labels: countryData.labels, 
        datasets: [{ 
          data: countryData.counts,
          backgroundColor: countryData.labels.map((_, i) => colors[i % colors.length]),
          borderColor: "rgb(48, 2, 2)",
          borderWidth: 1,
          barPercentage: 0.5
        }] 
      },
      options: { 
        plugins: { legend: { display: false } }, 
        scales: {
          x: {
            ticks: {
              stepSize: 1, 
              color: "rgb(48, 2, 2)", 
              font: { weight: 'bold' }
            },
            title: {
              display: true,
              text: "Countries",
              color: "rgba(76, 61, 61, 1)",
              font: { weight: 'bold' }
            }
          },
          y: { 
            beginAtZero: true,
            ticks: {
              stepSize: 1, 
              color: "rgb(48, 2, 2)", 
              font: { weight: 'bold' }
            },
            title: {
              display: true,
              text: "No. of People",
              color: "rgba(76, 61, 61, 1)",
              font: { weight: 'bold' }
            }
          } 
        } 
      }
    });
  }

  // Level of Study Chart
  if (document.getElementById('chartLevel')) {
    const levelData = {
      labels: summaryData.study_level_counts.map(r => r.label),
      counts: summaryData.study_level_counts.map(r => r.count)
    };
    
    new Chart(document.getElementById('chartLevel'), {
      type: 'bar',
      data: { 
        labels: levelData.labels, 
        datasets: [{ 
          data: levelData.counts,
          backgroundColor: levelData.labels.map((_, i) => colors[i % colors.length]),
          borderColor: "rgb(48, 2, 2)",
          borderWidth: 1,
          barPercentage: 0.5
        }] 
      },
      options: { 
        plugins: { legend: { display: false } }, 
        scales: {
          x: {
            ticks: {
              stepSize: 1, 
              color: "rgb(48, 2, 2)", 
              font: { weight: 'bold' },
            },
            title: {
              display: true,
              text: "Level of study",
              color: "rgba(76, 61, 61, 1)",
              font: { weight: 'bold' }
            }

          },
          y: { 
            beginAtZero: true,
            ticks: {
              stepSize: 1, 
              color: "rgb(48, 2, 2)", 
              font: { weight: 'bold' },
            },
            title: {
              display: true,
              text: "No. of People",
              color: "rgba(76, 61, 61, 1)",
              font: { weight: 'bold' }
            }
          } 
        } 
      }
    });
  }

  // Graduating Year Chart
  if (document.getElementById('chartGradYear')) {
    const gradYearData = {
      labels: summaryData.graduation_year_counts.map(r => r.label),
      counts: summaryData.graduation_year_counts.map(r => r.count)
    };
    
    new Chart(document.getElementById('chartGradYear'), {
      type: 'line',
      data: { 
        labels: gradYearData.labels, 
        datasets: [{ 
          data: gradYearData.counts,
          backgroundColor: "rgba(201, 208, 215, 0.3)",
          borderColor: "rgb(48, 2, 2)",
          borderWidth: 3,
          tension: 0.3,
          fill: true,
          pointBackgroundColor: colors,
          pointBorderColor: "rgb(48, 2, 2)",
          pointBorderWidth: 2,
          pointRadius: 5
        }] 
      },
      options: { 
        plugins: { legend: { display: false } }, 
        scales: { 
          x: {
            ticks: {
              color: "rgb(48, 2, 2)", 
              font: { weight: 'bold' }
            },
            title: {
              display: true,
              text: "Graduation Year",
              color: "rgba(76, 61, 61, 1)",
              font: { weight: 'bold' }
            }
          },
          y: { 
            beginAtZero: true,
            ticks: {
              stepSize: 1, 
              color: "rgb(48, 2, 2)", 
              font: { weight: 'bold' }
            },
            title: {
              display: true,
              text: "No. of People",
              color: "rgba(76, 61, 61, 1)",
              font: { weight: 'bold' }
            }
          } 
        } 
      }
    });
  }

  // Why Study Abroad Pie Chart
  if (document.getElementById('chartReasons')) {
    const reasonsData = {
      labels: summaryData.reasons_counts.map(r => r.label),
      counts: summaryData.reasons_counts.map(r => r.count)
    };
    
    new Chart(document.getElementById('chartReasons'), {
      type: 'pie',
      data: { 
        labels: reasonsData.labels, 
        datasets: [{ 
          data: reasonsData.counts,
          backgroundColor: colors,
          borderColor: "rgb(48, 2, 2)",
          borderWidth: 1
        }] 
      },
      options: { 
        responsive: true,
        maintainAspectRatio: true,
        plugins: { 
          legend: { 
            display: true,
            position: 'bottom',
            labels: {
              color: "rgb(48, 2, 2)",
              font: { weight: 'bold', size: 12 },
              padding: 15,
              boxWidth: 20
            }
          } 
        }
      }
    });
  }

   //Most Missed Chart
  if (document.getElementById('chartMissed')) {
    const missedData = {
      labels: summaryData.missed_most_counts.map(r => r.label),
      counts: summaryData.missed_most_counts.map(r => r.count)
    };
    
    new Chart(document.getElementById('chartMissed'), {
      type: 'bar',
      data: { 
        labels: missedData.labels, 
        datasets: [{ 
          data: missedData.counts,
          backgroundColor: missedData.labels.map((_, i) => colors[i % colors.length]),
          borderColor: "rgb(48, 2, 2)",
          borderWidth: 1,
          barPercentage: 0.5
        }] 
      },
      options: { 
        plugins: { legend: { display: false } }, 
        scales: {
          x: {
            ticks: {
              stepSize: 1, 
              color: "rgb(48, 2, 2)", 
              font: { weight: 'bold' }
            },
            title: {
              display: true,
              text: "Most Missed from Home Country",
              color: "rgba(76, 61, 61, 1)",
              font: { weight: 'bold' }
            }
          },
          y: { 
            beginAtZero: true,
            ticks: {
              stepSize: 1, 
              color: "rgb(48, 2, 2)", 
              font: { weight: 'bold' }
            },
            title: {
              display: true,
              text: "No. of People",
              color: "rgba(76, 61, 61, 1)",
              font: { weight: 'bold' }
            }
          } 
        } 
      }
    });
  }

  // Perspective Change Chart
  if (document.getElementById('chartPerspective')) {
    const perspectiveData = {
      labels: summaryData.perspective_counts.map(r => r.label),
      counts: summaryData.perspective_counts.map(r => r.count)
    };
    
    new Chart(document.getElementById('chartPerspective'), {
      type: 'pie',
      data: { 
        labels: perspectiveData.labels, 
        datasets: [{ 
          data: perspectiveData.counts,
          backgroundColor: ['rgb(200, 230, 201)', 'rgb(255, 179, 186)'],
          borderColor: "rgb(48, 2, 2)",
          borderWidth: 1
        }] 
      },
      options: { 
        responsive: true,
        maintainAspectRatio: true,
        plugins: { 
          legend: { 
            display: true,
            position: 'bottom',
            labels: {
              color: "rgb(48, 2, 2)",
              font: { weight: 'bold', size: 12 },
              padding: 15,
              boxWidth: 20
            }
          } 
        }
      }
    });
  }
  // Daily Responses Chart
  if (document.getElementById('chartDaily')) {
    const dailyData = {
      labels: summaryData.per_day_counts.map(r => r.day),
      counts: summaryData.per_day_counts.map(r => r.count)
    };
    
    new Chart(document.getElementById('chartDaily'), {
      type: 'line',
      data: { 
        labels: dailyData.labels, 
        datasets: [{ 
          label: 'Responses',
          data: dailyData.counts,
          backgroundColor: "rgba(186, 225, 255, 0.3)",
          borderColor: "rgb(48, 2, 2)",
          borderWidth: 2,
          tension: 0.3,
          fill: true,
          pointBackgroundColor: "rgb(186, 225, 255)",
          pointBorderColor: "rgb(48, 2, 2)",
          pointBorderWidth: 2,
          pointRadius: 5
        }] 
      },
      options: { 
        plugins: { 
          legend: { display: false }
        }, 
        scales: { 
          x: {
            ticks: {
              color: "rgb(48, 2, 2)", 
              font: { weight: 'bold' }
            },
            title: {
              display: true,
              text: "Day",
              color: "rgba(76, 61, 61, 1)",
              font: { weight: 'bold' }
            }
          },
          y: { 
            beginAtZero: true,
            ticks: {
              stepSize: 1, 
              color: "rgb(48, 2, 2)", 
              font: { weight: 'bold' }
            },
            title: {
              display: true,
              text: "Responses",
              color: "rgba(76, 61, 61, 1)",
              font: { weight: 'bold' }
            }
          } 
        } 
      }
    });
  }
}