const options = {
	chart: {
		type: "column"
	},

	title: {
		text: "Stacked column chart"
	},
	subtitle: {
		text: "aaaa"
	},
	xAxis: {
		categories: ["7日前", "6日前", "5日前", "4日前", "3日前", "2日前", "1日前"]
	},
	yAxis: {
		min: 0,
		title: {
			text: "積み上げ分数"
		},
		stackLabels: {
			enabled: true
		}
	},
	legend: {
		align: "right",
		x: -30,
		verticalAlign: "top",
		y: 25
	},
	tooltip: {
		headerFormat: "<b>{point.x}</b><br/>",
		pointFormat: "{series.name}: {point.y}<br/>Total: {point.stackTotal}"
	},
	plotOptions: {
		column: {
			stacking: "normal",
			dataLabels: {
				enabled: true
				// color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || "white"
			}
		}
	},
	series: [
		{
			name: "今日",
			data: [5, 3, 4, 7, 11, 1, 2]
		},
		{
			name: "合計",
			data: [2, 10, 15, 18, 20, 22, 25]
		}
	]
};

export default options;
