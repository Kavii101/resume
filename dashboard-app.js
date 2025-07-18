// Dashboard data from JSON
const dashboardData = {
  "report_date": "2025-04-25",
  "summary": {
    "deposits": {
      "total_amount": 278455.17,
      "count": 2591,
      "average": 107.47,
      "fees": 5588.49,
      "unique_players": 1198
    },
    "period_totals": {
      "mtd": {"total_amount": 7339258.40, "unique_players": 8096},
      "ytd": {"total_amount": 42298758.64, "unique_players": 28340}
    },
    "trends": {
      "vs_yesterday": 7.3,
      "vs_last_week": -30.2,
      "vs_last_month": 28.1,
      "vs_last_quarter": -28.4
    }
  },
  "vip_tiers": {
    "Default": {"player_count": 788, "total_deposit": 95959.15, "avg_deposit": 70.35, "percentage": 34.46, "growth": 3.6},
    "PreVIP": {"player_count": 258, "total_deposit": 61738.89, "avg_deposit": 95.28, "percentage": 22.17, "growth": 22.3},
    "Silver": {"player_count": 95, "total_deposit": 33514.06, "avg_deposit": 135.14, "percentage": 12.04, "growth": 37.2},
    "Gold": {"player_count": 37, "total_deposit": 38580.07, "avg_deposit": 287.91, "percentage": 13.86, "growth": -3.5},
    "Platinum": {"player_count": 14, "total_deposit": 23996.00, "avg_deposit": 212.35, "percentage": 8.62, "growth": 25.3},
    "Diamond": {"player_count": 6, "total_deposit": 24667.00, "avg_deposit": 293.65, "percentage": 8.86, "growth": -24.8}
  },
  "campaigns": {
    "NO_CAMPAIGN": {"player_count": 888, "total_deposit": 192957.45, "avg_deposit": 96.24, "growth": -11.3},
    "VIP_AllVIP_Casino_50%upto800RON_Bonus": {"player_count": 58, "total_deposit": 32190.89, "avg_deposit": 536.51, "growth": 0},
    "WOF_100FS_20BulkyFruits": {"player_count": 117, "total_deposit": 8894.74, "avg_deposit": 74.75, "growth": -4.7},
    "VIP_AllVIP_Casino_100_FS": {"player_count": 33, "total_deposit": 8173.90, "avg_deposit": 247.69, "growth": 0},
    "NON-VIP_NEW_ACTIVE_ROC_CHURN_DORMANT_Casino_150_FS": {"player_count": 65, "total_deposit": 7133.57, "avg_deposit": 109.75, "growth": 0}
  },
  "ftd_analysis": {
    "total_ftd_players": 118,
    "total_ftd_amount": 16962.47,
    "avg_ftd_amount": 81.94,
    "conversion_funnel": {
      "1st_to_2nd": 64.8,
      "2nd_to_3rd": 55.6,
      "3rd_to_4th": 38.9,
      "4th_to_5th": 1.9
    }
  },
  "traffic_sources": {
    "ftd": {
      "bettingpro": {"player_count": 23, "total_deposit": 4196.12, "avg_deposit": 123.42},
      "Organic": {"player_count": 21, "total_deposit": 3699.62, "avg_deposit": 84.08},
      "facebook": {"player_count": 24, "total_deposit": 2376.36, "avg_deposit": 67.90},
      "Direct": {"player_count": 5, "total_deposit": 2204.57, "avg_deposit": 244.95}
    },
    "non_ftd": {
      "Organic": {"player_count": 430, "total_deposit": 96690.88, "avg_deposit": 100.30},
      "ppc": {"player_count": 175, "total_deposit": 47542.55, "avg_deposit": 121.59},
      "bettingpro": {"player_count": 125, "total_deposit": 40221.61, "avg_deposit": 123.76},
      "Direct": {"player_count": 130, "total_deposit": 35416.99, "avg_deposit": 150.07}
    }
  },
  "user_segments": {
    "ACTIVE": {"player_count": 926, "total_deposit": 220874.35, "avg_deposit": 104.63, "percentage": 79.3},
    "NEW": {"player_count": 87, "total_deposit": 36796.25, "avg_deposit": 171.95, "percentage": 13.2},
    "ROC": {"player_count": 53, "total_deposit": 7831.03, "avg_deposit": 84.20, "percentage": 2.8},
    "RND": {"player_count": 73, "total_deposit": 5975.63, "avg_deposit": 60.36, "percentage": 2.1},
    "CHURN": {"player_count": 46, "total_deposit": 5962.70, "avg_deposit": 108.41, "percentage": 2.1},
    "DORMANT": {"player_count": 13, "total_deposit": 1015.21, "avg_deposit": 53.43, "percentage": 0.4}
  },
  "alerts": [
    {"type": "positive", "message": "VIP Tier Movement: Silver tier shows +37.2% growth", "priority": "medium"},
    {"type": "warning", "message": "Weekly Decline: Overall deposits down -30.2% vs last week", "priority": "high"},
    {"type": "positive", "message": "Monthly Growth: Strong +28.1% growth vs last month", "priority": "medium"},
    {"type": "negative", "message": "Diamond Tier Volatility: -24.8% decline needs attention", "priority": "high"}
  ]
};

// Utility functions
function formatCurrency(amount) {
  return new Intl.NumberFormat('ro-RO', {
    style: 'currency',
    currency: 'RON',
    minimumFractionDigits: 2
  }).format(amount);
}

function formatNumber(num) {
  return new Intl.NumberFormat('ro-RO').format(num);
}

function formatPercentage(percent) {
  const sign = percent > 0 ? '+' : '';
  return `${sign}${percent.toFixed(1)}%`;
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
  updateTimestamp();
  renderAlerts();
  renderVipTiers();
  renderCampaignTable();
  renderFunnelChart();
  initCharts();
  setupEventListeners();
});

function updateTimestamp() {
  const timestamp = new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  document.getElementById('timestamp').textContent = timestamp;
}

function renderAlerts() {
  const alertContainer = document.getElementById('alert-container');
  
  if (dashboardData.alerts.length === 0) {
    alertContainer.style.display = 'none';
    return;
  }

  const alertsHTML = dashboardData.alerts.map(alert => `
    <div class="alert alert--${alert.type}" data-priority="${alert.priority}">
      <div class="alert-message">${alert.message}</div>
      <div class="alert-actions">
        <button class="alert-btn alert-btn--acknowledge" onclick="acknowledgeAlert(this)">Acknowledge</button>
        <button class="alert-btn alert-btn--investigate" onclick="investigateAlert('${alert.message}')">Investigate</button>
      </div>
    </div>
  `).join('');

  alertContainer.innerHTML = alertsHTML;
}

function acknowledgeAlert(button) {
  const alert = button.closest('.alert');
  alert.style.animation = 'slideUp 0.3s ease-in-out reverse';
  setTimeout(() => alert.remove(), 300);
}

function investigateAlert(message) {
  showModal('Alert Investigation', `
    <div class="investigation-details">
      <h4>Alert Details</h4>
      <p><strong>Message:</strong> ${message}</p>
      <p><strong>Recommended Actions:</strong></p>
      <ul>
        <li>Review detailed metrics in the affected area</li>
        <li>Compare with historical data patterns</li>
        <li>Consider market conditions and external factors</li>
        <li>Escalate to relevant team if needed</li>
      </ul>
    </div>
  `);
}

function renderVipTiers() {
  const vipGrid = document.getElementById('vip-tiers');
  
  const vipHTML = Object.entries(dashboardData.vip_tiers).map(([tier, data]) => {
    const tierClass = tier.toLowerCase().replace('previp', 'previp');
    const growthClass = data.growth >= 0 ? 'growth-positive' : 'growth-negative';
    
    return `
      <div class="vip-card vip-card--${tierClass}" onclick="showVipDetails('${tier}')">
        <div class="vip-header">
          <h3 class="vip-tier-name">${tier}</h3>
          <span class="vip-growth ${growthClass}">${formatPercentage(data.growth)}</span>
        </div>
        <div class="vip-stats">
          <div class="vip-stat">
            <span class="vip-stat-value">${formatNumber(data.player_count)}</span>
            <div class="vip-stat-label">Players</div>
          </div>
          <div class="vip-stat">
            <span class="vip-stat-value">${formatCurrency(data.total_deposit)}</span>
            <div class="vip-stat-label">Total Deposit</div>
          </div>
          <div class="vip-stat">
            <span class="vip-stat-value">${formatCurrency(data.avg_deposit)}</span>
            <div class="vip-stat-label">Avg Deposit</div>
          </div>
          <div class="vip-stat">
            <span class="vip-stat-value">${data.percentage}%</span>
            <div class="vip-stat-label">of Total Volume</div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  vipGrid.innerHTML = vipHTML;
}

function showVipDetails(tier) {
  const data = dashboardData.vip_tiers[tier];
  showModal(`${tier} Tier Details`, `
    <div class="vip-details">
      <div class="detail-grid">
        <div class="detail-item">
          <strong>Player Count:</strong> ${formatNumber(data.player_count)}
        </div>
        <div class="detail-item">
          <strong>Total Deposits:</strong> ${formatCurrency(data.total_deposit)}
        </div>
        <div class="detail-item">
          <strong>Average Deposit:</strong> ${formatCurrency(data.avg_deposit)}
        </div>
        <div class="detail-item">
          <strong>Volume Percentage:</strong> ${data.percentage}%
        </div>
        <div class="detail-item">
          <strong>Growth Rate:</strong> ${formatPercentage(data.growth)}
        </div>
      </div>
      <div class="tier-insights">
        <h4>Insights</h4>
        <ul>
          <li>This tier represents ${data.percentage}% of total deposit volume</li>
          <li>Average deposit per player: ${formatCurrency(data.avg_deposit)}</li>
          <li>Growth trend: ${data.growth >= 0 ? 'Positive' : 'Negative'} (${formatPercentage(data.growth)})</li>
        </ul>
      </div>
    </div>
  `);
}

function renderCampaignTable() {
  const tableBody = document.querySelector('#campaign-table tbody');
  
  const campaignHTML = Object.entries(dashboardData.campaigns).map(([name, data]) => {
    const growthClass = data.growth > 0 ? 'trend-positive' : data.growth < 0 ? 'trend-negative' : 'trend-neutral';
    const displayName = name === 'NO_CAMPAIGN' ? 'No Campaign' : name;
    
    return `
      <tr onclick="showCampaignDetails('${name}')">
        <td class="campaign-name" title="${displayName}">${displayName}</td>
        <td>${formatNumber(data.player_count)}</td>
        <td>${formatCurrency(data.total_deposit)}</td>
        <td>${formatCurrency(data.avg_deposit)}</td>
        <td><span class="campaign-growth ${growthClass}">${formatPercentage(data.growth)}</span></td>
        <td><button class="btn btn--sm btn--outline">View Details</button></td>
      </tr>
    `;
  }).join('');

  tableBody.innerHTML = campaignHTML;
}

function showCampaignDetails(campaignName) {
  const data = dashboardData.campaigns[campaignName];
  const displayName = campaignName === 'NO_CAMPAIGN' ? 'No Campaign' : campaignName;
  
  showModal(`Campaign: ${displayName}`, `
    <div class="campaign-details">
      <div class="detail-grid">
        <div class="detail-item">
          <strong>Player Count:</strong> ${formatNumber(data.player_count)}
        </div>
        <div class="detail-item">
          <strong>Total Deposits:</strong> ${formatCurrency(data.total_deposit)}
        </div>
        <div class="detail-item">
          <strong>Average Deposit:</strong> ${formatCurrency(data.avg_deposit)}
        </div>
        <div class="detail-item">
          <strong>Growth Rate:</strong> ${formatPercentage(data.growth)}
        </div>
      </div>
      <div class="campaign-insights">
        <h4>Performance Insights</h4>
        <ul>
          <li>Revenue per player: ${formatCurrency(data.total_deposit / data.player_count)}</li>
          <li>Performance status: ${data.growth > 0 ? 'Growing' : data.growth < 0 ? 'Declining' : 'Stable'}</li>
          <li>Contribution to total deposits: ${((data.total_deposit / dashboardData.summary.deposits.total_amount) * 100).toFixed(1)}%</li>
        </ul>
      </div>
    </div>
  `);
}

function renderFunnelChart() {
  const funnelChart = document.getElementById('funnel-chart');
  const funnel = dashboardData.ftd_analysis.conversion_funnel;
  
  const steps = [
    { label: '1st Deposit', rate: 100 },
    { label: '2nd Deposit', rate: funnel['1st_to_2nd'] },
    { label: '3rd Deposit', rate: funnel['2nd_to_3rd'] },
    { label: '4th Deposit', rate: funnel['3rd_to_4th'] },
    { label: '5th Deposit', rate: funnel['4th_to_5th'] }
  ];

  const funnelHTML = steps.map((step, index) => `
    <div class="funnel-step">
      <div class="funnel-step-circle" style="opacity: ${step.rate / 100}">
        ${step.rate.toFixed(1)}%
      </div>
      <div class="funnel-step-label">${step.label}</div>
    </div>
  `).join('');

  funnelChart.innerHTML = funnelHTML;
}

function initCharts() {
  createTrendsChart();
  createTrafficCharts();
  createSegmentsChart();
}

function createTrendsChart() {
  const ctx = document.getElementById('trendsChart').getContext('2d');
  
  // Generate sample trend data
  const dates = Array.from({length: 30}, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  });
  
  const baseAmount = dashboardData.summary.deposits.total_amount;
  const trendData = dates.map((_, i) => {
    const variation = (Math.random() - 0.5) * 0.4;
    return baseAmount * (1 + variation);
  });

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [{
        label: 'Daily Deposits',
        data: trendData,
        borderColor: '#1FB8CD',
        backgroundColor: '#1FB8CD20',
        borderWidth: 3,
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          ticks: {
            callback: function(value) {
              return formatCurrency(value);
            }
          }
        }
      },
      interaction: {
        intersect: false,
        mode: 'index'
      }
    }
  });
}

function createTrafficCharts() {
  // FTD Traffic Chart
  const ftdCtx = document.getElementById('ftdTrafficChart').getContext('2d');
  const ftdData = dashboardData.traffic_sources.ftd;
  
  new Chart(ftdCtx, {
    type: 'doughnut',
    data: {
      labels: Object.keys(ftdData),
      datasets: [{
        data: Object.values(ftdData).map(source => source.total_deposit),
        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5'],
        borderWidth: 2,
        borderColor: '#fff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.label}: ${formatCurrency(context.raw)}`;
            }
          }
        }
      }
    }
  });

  // Non-FTD Traffic Chart
  const nonFtdCtx = document.getElementById('nonFtdTrafficChart').getContext('2d');
  const nonFtdData = dashboardData.traffic_sources.non_ftd;
  
  new Chart(nonFtdCtx, {
    type: 'doughnut',
    data: {
      labels: Object.keys(nonFtdData),
      datasets: [{
        data: Object.values(nonFtdData).map(source => source.total_deposit),
        backgroundColor: ['#5D878F', '#DB4545', '#D2BA4C', '#964325'],
        borderWidth: 2,
        borderColor: '#fff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.label}: ${formatCurrency(context.raw)}`;
            }
          }
        }
      }
    }
  });
}

function createSegmentsChart() {
  const ctx = document.getElementById('segmentsChart').getContext('2d');
  const segments = dashboardData.user_segments;
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(segments),
      datasets: [{
        label: 'Player Count',
        data: Object.values(segments).map(segment => segment.player_count),
        backgroundColor: '#1FB8CD',
        yAxisID: 'y'
      }, {
        label: 'Total Deposit',
        data: Object.values(segments).map(segment => segment.total_deposit),
        backgroundColor: '#FFC185',
        yAxisID: 'y1'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          title: {
            display: true,
            text: 'Player Count'
          }
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          title: {
            display: true,
            text: 'Total Deposit (RON)'
          },
          grid: {
            drawOnChartArea: false,
          },
          ticks: {
            callback: function(value) {
              return formatCurrency(value);
            }
          }
        }
      },
      plugins: {
        legend: {
          position: 'top'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              if (context.datasetIndex === 0) {
                return `Players: ${formatNumber(context.raw)}`;
              } else {
                return `Deposits: ${formatCurrency(context.raw)}`;
              }
            }
          }
        }
      }
    }
  });
}

function setupEventListeners() {
  // Chart period controls
  document.querySelectorAll('[data-period]').forEach(button => {
    button.addEventListener('click', function() {
      document.querySelectorAll('[data-period]').forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      // In a real implementation, this would reload chart data for the selected period
    });
  });

  // Export PDF functionality
  document.getElementById('export-pdf').addEventListener('click', function() {
    window.print();
  });

  // Modal close functionality
  document.querySelector('.modal-close').addEventListener('click', closeModal);
  document.getElementById('detail-modal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
  });

  // Keyboard events
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeModal();
  });
}

function showModal(title, content) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').innerHTML = content;
  document.getElementById('detail-modal').style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('detail-modal').style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Additional utility functions for interactivity
function refreshDashboard() {
  // In a real implementation, this would fetch new data
  console.log('Refreshing dashboard data...');
  updateTimestamp();
}

function exportData(format) {
  // In a real implementation, this would export data in the specified format
  console.log(`Exporting data in ${format} format...`);
}

// Auto-refresh every 5 minutes
setInterval(refreshDashboard, 5 * 60 * 1000);