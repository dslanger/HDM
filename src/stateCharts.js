import Highcharts from "highcharts";
import stateData from "./data";

const drawChartOne = (state) => {
  const colors = {
    deaths: "#1E8F62",
    costs: "#DD2678",
    dark: "#333",
    offWhite: "#cccccc",
    background: "#ECECEC"
  };

  Highcharts.chart("chart-one", {
    chart: {
      zoomType: "xy",
      backgroundColor: colors.background
    },
    credits: false,
    title: {
      text: "Health Impacts: Residential vs. Commercial Buildings",
      margin: 50,
      style: {
        color: colors.dark
      }
    },
    xAxis: [
      {
        categories: ["Residential", "Commercial"],
        crosshair: false,
        labels: {
          style: {
            color: colors.dark,
            fontSize: "14px"
          }
        }
      }
    ],
    yAxis: [
      {
        // Primary yAxis
        labels: {
          formatter: function () {
            if (this.value === 0) {
              return this.value;
            } else if (this.value / 1000000000 >= 1) {
              return this.value / 1000000000 + "B";
            } else if (this.value / 1000000 >= 1) {
              return this.value / 1000000 + "M";
            } else {
              return this.value;
            }
          },
          style: {
            color: colors.deaths
          }
        },
        title: {
          text: "Number of early deaths* (2017)",
          margin: 20,
          style: {
            color: colors.deaths,
            fontSize: "15px",
            fontWeight: "600"
          }
        }
      },
      {
        // Secondary yAxis
        title: {
          text: "Health impact costs* (2017)",
          margin: 30,
          style: {
            color: colors.costs,
            fontSize: "15px",
            fontWeight: "600"
          }
        },
        labels: {
          formatter: function () {
            if (this.value === 0) {
              return this.value;
            } else if (this.value / 1000000000 >= 1) {
              return "$" + this.value / 1000000000 + "B";
            } else if (this.value / 1000000 >= 1) {
              return "$" + this.value / 1000000 + "M";
            } else {
              return "$" + this.value;
            }
          },
          style: {
            color: colors.costs
          }
        },
        opposite: true
      }
    ],
    tooltip: {
      shared: false,
      enabled: false
    },
    legend: {
      layout: "horizontal",
      floating: false,
      borderColor: colors.offWhite,
      borderWidth: 1,
      padding: 12,
      margin: 30,
      itemStyle: {
        color: colors.dark,
        fontSize: "14px"
      },
      itemHoverStyle: {
        color: colors.offWhite
      }
    },
    series: [
      {
        name: "Deaths",
        type: "column",
        yAxis: 0,
        data: [
          stateData[state].deaths_residential,
          stateData[state].deaths_commercial
        ],
        color: colors.deaths,
        borderColor: colors.deaths,
        dataLabels: {
          enabled: true,
          color: colors.dark,
          style: {
            fontSize: "13px"
          },
          formatter: function () {
            if (this.y === 0) {
              return this.y;
            } else if (this.y / 1000000000 >= 1) {
              return this.y / 1000000000 + "B";
            } else if (this.y / 1000000 >= 1) {
              return this.y / 1000000 + "M";
            } else {
              return this.y;
            }
          }
        }
      },
      {
        name: "Costs",
        type: "column",
        data: [
          stateData[state].health_cost_residential,
          stateData[state].health_cost_commercial
        ],
        yAxis: 1,
        color: colors.costs,
        borderColor: colors.costs,
        dataLabels: {
          enabled: true,
          color: colors.dark,
          style: {
            fontSize: "13px"
          },
          formatter: function () {
            if (this.y === 0) {
              return this.y;
            } else if (this.y / 1000000000 >= 1) {
              return "$" + this.y / 1000000000 + "B";
            } else if (this.y / 1000000 >= 1) {
              return "$" + this.y / 1000000 + "M";
            } else {
              return "$" + this.y;
            }
          }
        }
      }
    ]
  });
};

const drawChartTwo = (state) => {
  const colors = {
    nox: "#4C5480",
    voc: "#9C4F3D",
    dark: "#333",
    offWhite: "#cccccc",
    background: "#ECECEC"
  };

  Highcharts.chart("chart-two", {
    chart: {
      zoomType: "xy",
      backgroundColor: colors.background
    },
    credits: false,
    title: {
      text: "Health Impact Costs from Selected Pollutants Emitted by Buildings",
      margin: 50,
      style: {
        color: colors.dark
      }
    },
    xAxis: [
      {
        categories: ["Residential", "Commercial"],
        crosshair: false,
        labels: {
          style: {
            color: colors.dark,
            fontSize: "14px"
          }
        }
      }
    ],
    yAxis: [
      {
        title: {
          text: "Health Impact Costs* (2017)",
          margin: 30,
          style: {
            color: colors.dark,
            fontSize: "15px",
            fontWeight: "500"
          }
        },
        labels: {
          formatter: function () {
            if (this.value === 0) {
              return this.value;
            } else if (this.value / 1000000000 >= 1) {
              return "$" + this.value / 1000000000 + "B";
            } else if (this.value / 1000000 >= 1) {
              return "$" + this.value / 1000000 + "M";
            } else {
              return "$" + this.value;
            }
          },
          style: {
            color: colors.dark
          }
        }
      }
    ],
    tooltip: {
      shared: false,
      enabled: false
    },
    legend: {
      useHTML: true,
      layout: "horizontal",
      floating: false,
      borderColor: colors.offWhite,
      borderWidth: 1,
      padding: 12,
      margin: 30,
      itemStyle: {
        color: colors.dark,
        fontSize: "14px"
      },
      itemHoverStyle: {
        color: colors.offWhite
      }
    },
    series: [
      {
        name: "Nitrogen Oxides (NO<sub>x</sub>)",
        type: "column",
        yAxis: 0,
        data: [
          stateData[state].nox_residential,
          stateData[state].nox_commercial
        ],
        color: colors.nox,
        borderColor: colors.nox,
        dataLabels: {
          enabled: true,
          color: colors.dark,
          style: {
            fontSize: "13px"
          },
          formatter: function () {
            if (this.y === 0) {
              return this.y;
            } else if (this.y / 1000000000 >= 1) {
              return "$" + this.y / 1000000000 + "B";
            } else if (this.y / 1000000 >= 1) {
              return "$" + this.y / 1000000 + "M";
            } else {
              return "$" + this.y;
            }
          }
        }
      },
      {
        name: "Volatile Organic Compounds (VOCs)",
        type: "column",
        data: [
          stateData[state].voc_residential,
          stateData[state].voc_commercial
        ],
        yAxis: 0,
        color: colors.voc,
        borderColor: colors.voc,
        dataLabels: {
          enabled: true,
          color: colors.dark,
          style: {
            fontSize: "13px"
          },
          formatter: function () {
            if (this.y === 0) {
              return this.y;
            } else if (this.y / 1000000000 >= 1) {
              return "$" + this.y / 1000000000 + "B";
            } else if (this.y / 1000000 >= 1) {
              return "$" + this.y / 1000000 + "M";
            } else {
              return "$" + this.y;
            }
          }
        }
      }
    ]
  });
};

const drawCharts = (state) => {
  drawChartOne(state);
  drawChartTwo(state);
};

export default drawCharts;
