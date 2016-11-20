/*****
* CONFIGURATION
*/
    //Main navigation
    $.navigation = $('nav > ul.nav');

	$.panelIconOpened = 'icon-arrow-up';
	$.panelIconClosed = 'icon-arrow-down';

	//Default colours
	$.brandPrimary =  '#20a8d8';
	$.brandSuccess =  '#4dbd74';
	$.brandInfo =     '#63c2de';
	$.brandWarning =  '#f8cb00';
	$.brandDanger =   '#f86c6b';

	$.grayDark =      '#2a2c36';
	$.gray =          '#55595c';
	$.grayLight =     '#818a91';
	$.grayLighter =   '#d1d4d7';
	$.grayLightest =  '#f8f9fa';

'use strict';

/****
* MAIN NAVIGATION
*/

$(document).ready(function($){

	// Add class .active to current link
	$.navigation.find('a').each(function(){

		var cUrl = String(window.location);

		if (cUrl.substr(cUrl.length - 1) == '#') {
			cUrl = cUrl.slice(0,-1);
		}

		if ($($(this))[0].href==cUrl) {
			$(this).addClass('active');

			$(this).parents('ul').add(this).each(function(){
			    $(this).parent().addClass('nt').addClass('open');
			});
		}
	});

	// Dropdown Menu
	$.navigation.on('click', 'a', function(e){

		if ($.ajaxLoad) {
			e.preventDefault();
		}

        if ($(this).hasClass('nav-dropdown-toggle')) {
			$(this).parent().removeClass('nt').toggleClass('open');
		}

	});

	function resizeBroadcast() {

		var timesRun = 0;
		var interval = setInterval(function(){
			timesRun += 1;
			if(timesRun === 5){
				clearInterval(interval);
			}
			window.dispatchEvent(new Event('resize'));
		}, 62.5);
	}

	/* ---------- Main Menu Open/Close, Min/Full ---------- */
	$('.navbar-toggler').click(function(){

		var bodyClass = localStorage.getItem('body-class');

		if ($(this).hasClass('layout-toggler') && $('body').hasClass('sidebar-off-canvas')) {
			$('body').toggleClass('sidebar-opened').parent().toggleClass('sidebar-opened');
			//resize charts
			resizeBroadcast();

		} else if ($(this).hasClass('layout-toggler') && ($('body').hasClass('sidebar-nav') || bodyClass == 'sidebar-nav')) {
			$('body').toggleClass('sidebar-nav');
			localStorage.setItem('body-class', 'sidebar-nav');
			if (bodyClass == 'sidebar-nav') {
				localStorage.clear();
			}
			//resize charts
			resizeBroadcast();
		} else {
			$('body').toggleClass('mobile-open');
		}
	});

	$('.aside-toggle').click(function(){
		$('body').toggleClass('aside-menu-open');

		//resize charts
		resizeBroadcast();
	});

	$('.sidebar-close').click(function(){
		$('body').toggleClass('sidebar-opened').parent().toggleClass('sidebar-opened');
	});

	/* ---------- Disable moving to top ---------- */
	$('a[href="#"][data-top!=true]').click(function(e){
		e.preventDefault();
	});

});

/****
* CARDS ACTIONS
*/

$(document).on('click', '.card-actions a', function(e){
	e.preventDefault();

	if ($(this).hasClass('btn-close')) {
		$(this).parent().parent().parent().fadeOut();
	} else if ($(this).hasClass('btn-minimize')) {
		var $target = $(this).parent().parent().next('.card-block');
		if (!$(this).hasClass('collapsed')) {
			$('i',$(this)).removeClass($.panelIconOpened).addClass($.panelIconClosed);
		} else {
			$('i',$(this)).removeClass($.panelIconClosed).addClass($.panelIconOpened);
		}

	} else if ($(this).hasClass('btn-setting')) {
		$('#myModal').modal('show');
	}

});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function init(url) {

	/* ---------- Tooltip ---------- */
	$('[rel="tooltip"],[data-rel="tooltip"]').tooltip({"placement":"bottom",delay: { show: 400, hide: 200 }});

	/* ---------- Popover ---------- */
	$('[rel="popover"],[data-rel="popover"],[data-toggle="popover"]').popover();

}


$(function (){
    'use strict';

    var randomScalingFactor = function(){ return Math.round(Math.random()*100)};
    var lineChartData = {
        labels : ['January','February','March','April','May','June','July'],
        datasets : [
            {
                label: 'My First dataset',
                backgroundColor : 'rgba(220,220,220,0.2)',
                borderColor : 'rgba(220,220,220,1)',
                pointBackgroundColor : 'rgba(220,220,220,1)',
                pointBorderColor : '#fff',
                data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
            },
            {
                label: 'My Second dataset',
                backgroundColor : 'rgba(151,187,205,0.2)',
                borderColor : 'rgba(151,187,205,1)',
                pointBackgroundColor : 'rgba(151,187,205,1)',
                pointBorderColor : '#fff',
                data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
            }
        ]
    }

    var ctx = document.getElementById('canvas-1');
    var chart = new Chart(ctx, {
        type: 'line',
        data: lineChartData,
        options: {
            responsive: true
        }
    });


    var randomScalingFactor = function(){ return Math.round(Math.random()*100)};
    var barChartData = {
        labels : ['January','February','March','April','May','June','July'],
        datasets : [
            {
                backgroundColor : 'rgba(220,220,220,0.5)',
                borderColor : 'rgba(220,220,220,0.8)',
                highlightFill: 'rgba(220,220,220,0.75)',
                highlightStroke: 'rgba(220,220,220,1)',
                data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
            },
            {
                backgroundColor : 'rgba(151,187,205,0.5)',
                borderColor : 'rgba(151,187,205,0.8)',
                highlightFill : 'rgba(151,187,205,0.75)',
                highlightStroke : 'rgba(151,187,205,1)',
                data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
            }
        ]
    }
    var ctx = document.getElementById('canvas-2');
    var chart = new Chart(ctx, {
        type: 'bar',
        data: barChartData,
        options: {
            responsive: true
        }
    });


    var doughnutData = {
        labels: [
            'Red',
            'Green',
            'Yellow'
        ],
        datasets: [{
            data: [300, 50, 100],
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
            ]
        }]
    };
    var ctx = document.getElementById('canvas-3');
    var chart = new Chart(ctx, {
        type: 'doughnut',
        data: doughnutData,
        options: {
            responsive: true
        }
    });


    var radarChartData = {
        labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
        datasets: [
            {
                label: 'My First dataset',
                backgroundColor: 'rgba(220,220,220,0.2)',
                borderColor: 'rgba(220,220,220,1)',
                pointBackgroundColor: 'rgba(220,220,220,1)',
                pointBorderColor: '#fff',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(220,220,220,1)',
                data: [65,59,90,81,56,55,40]
            },
            {
                label: 'My Second dataset',
                backgroundColor: 'rgba(151,187,205,0.2)',
                borderColor: 'rgba(151,187,205,1)',
                pointBackgroundColor: 'rgba(151,187,205,1)',
                pointBorderColor: '#fff',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(151,187,205,1)',
                data: [28,48,40,19,96,27,100]
            }
        ]
    };
    var ctx = document.getElementById('canvas-4');
    var chart = new Chart(ctx, {
        type: 'radar',
        data: radarChartData,
        options: {
            responsive: true
        }
    });


    var pieData = {
        labels: [
            'Red',
            'Green',
            'Yellow'
        ],
        datasets: [{
            data: [300, 50, 100],
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
            ]
        }]
    };
    var ctx = document.getElementById('canvas-5');
    var chart = new Chart(ctx, {
        type: 'pie',
        data: pieData,
        options: {
            responsive: true
        }
    });


    var polarData = {
        datasets: [{
            data: [
                11,
                16,
                7,
                3,
                14
            ],
            backgroundColor: [
                '#FF6384',
                '#4BC0C0',
                '#FFCE56',
                '#E7E9ED',
                '#36A2EB'
            ],
            label: 'My dataset' // for legend
        }],
        labels: [
            'Red',
            'Green',
            'Yellow',
            'Grey',
            'Blue'
        ]
    };
    var ctx = document.getElementById('canvas-6');
    var chart = new Chart(ctx, {
        type: 'polarArea',
        data: polarData,
        options: {
            responsive: true
        }
    });
});

$(function(){
    'use strict';

    //convert Hex to RGBA
    function convertHex(hex,opacity){
        hex = hex.replace('#','');
        var r = parseInt(hex.substring(0,2), 16);
        var g = parseInt(hex.substring(2,4), 16);
        var b = parseInt(hex.substring(4,6), 16);

        var result = 'rgba('+r+','+g+','+b+','+opacity/100+')';
        return result;
    }

    //Cards with Charts
    var labels = ['January','February','March','April','May','June','July'];
    var data = {
        labels: labels,
        datasets: [
            {
                label: 'My First dataset',
                backgroundColor: $.brandPrimary,
                borderColor: 'rgba(255,255,255,.55)',
                data: [65, 59, 84, 84, 51, 55, 40]
            },
        ]
    };
    var options = {
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                gridLines: {
                    color: 'transparent',
                    zeroLineColor: 'transparent'
                },
                ticks: {
                    fontSize: 2,
                    fontColor: 'transparent',
                }

            }],
            yAxes: [{
                display: false,
                ticks: {
                    display: false,
                    min: Math.min.apply(Math, data.datasets[0].data) - 5,
                    max: Math.max.apply(Math, data.datasets[0].data) + 5,
                }
            }],
        },
        elements: {
            line: {
                borderWidth: 1
            },
            point: {
                radius: 4,
                hitRadius: 10,
                hoverRadius: 4,
            },
        }
    };
    var ctx = $('#card-chart1');
    var cardChart1 = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });

    var data = {
        labels: labels,
        datasets: [
            {
                label: 'My First dataset',
                backgroundColor: $.brandInfo,
                borderColor: 'rgba(255,255,255,.55)',
                data: [1, 18, 9, 17, 34, 22, 11]
            },
        ]
    };
    var options = {
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                gridLines: {
                    color: 'transparent',
                    zeroLineColor: 'transparent'
                },
                ticks: {
                    fontSize: 2,
                    fontColor: 'transparent',
                }

            }],
            yAxes: [{
                display: false,
                ticks: {
                    display: false,
                    min: Math.min.apply(Math, data.datasets[0].data) - 5,
                    max: Math.max.apply(Math, data.datasets[0].data) + 5,
                }
            }],
        },
        elements: {
            line: {
                tension: 0.00001,
                borderWidth: 1
            },
            point: {
                radius: 4,
                hitRadius: 10,
                hoverRadius: 4,
            },
        }
    };
    var ctx = $('#card-chart2');
    var cardChart2 = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });

    var options = {
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                display: false
            }],
            yAxes: [{
                display: false
            }],
        },
        elements: {
            line: {
                borderWidth: 2
            },
            point: {
                radius: 0,
                hitRadius: 10,
                hoverRadius: 4,
            },
        }
    };
    var data = {
        labels: labels,
        datasets: [
            {
                label: 'My First dataset',
                backgroundColor: 'rgba(255,255,255,.2)',
                borderColor: 'rgba(255,255,255,.55)',
                data: [78, 81, 80, 45, 34, 12, 40]
            },
        ]
    };
    var ctx = $('#card-chart3');
    var cardChart3 = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });

    //Random Numbers
    function random(min,max) {
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    var elements = 16;
    var labels = [];
    var data = [];

    for (var i = 2000; i <= 2000 + elements; i++) {
        labels.push(i);
        data.push(random(40,100));
    }

    var options = {
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                display: false,
                barPercentage: 0.6,
            }],
            yAxes: [{
                display: false,
            }]
        },

    };
    var data = {
        labels: labels,
        datasets: [
            {
                backgroundColor: 'rgba(255,255,255,.3)',
                borderColor: 'transparent',
                data: data
            },
        ]
    };
    var ctx = $('#card-chart4');
    var cardChart4 = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
    });

    //Main Chart
    var elements = 27;
    var data1 = [];
    var data2 = [];
    var data3 = [];

    for (var i = 0; i <= elements; i++) {
        data1.push(random(50,200));
        data2.push(random(80,100));
        data3.push(65);
    }

    var data = {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F', 'S', 'S'],
        datasets: [
            {
                label: 'My First dataset',
                backgroundColor: convertHex($.brandInfo,10),
                borderColor: $.brandInfo,
                pointHoverBackgroundColor: '#fff',
                borderWidth: 2,
                data: data1
            },
            {
                label: 'My Second dataset',
                backgroundColor: 'transparent',
                borderColor: $.brandSuccess,
                pointHoverBackgroundColor: '#fff',
                borderWidth: 2,
                data: data2
            },
            {
                label: 'My Third dataset',
                backgroundColor: 'transparent',
                borderColor: $.brandDanger,
                pointHoverBackgroundColor: '#fff',
                borderWidth: 1,
                borderDash: [8, 5],
                data: data3
            }
        ]
    };

    var options = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                gridLines: {
                    drawOnChartArea: false,
                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(250 / 5),
                    max: 250
                }
            }]
        },
        elements: {
            point: {
                radius: 0,
                hitRadius: 10,
                hoverRadius: 4,
                hoverBorderWidth: 3,
            }
        },
    };
    var ctx = $('#main-chart');
    var mainChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });


    //Social Box Charts
    var labels = ['January','February','March','April','May','June','July'];

    var options = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            display: false,
        },
        scales: {
            xAxes: [{
                display:false,
            }],
            yAxes: [{
                display:false,
            }]
        },
        elements: {
            point: {
                radius: 0,
                hitRadius: 10,
                hoverRadius: 4,
                hoverBorderWidth: 3,
            }
        }
    };

    var data1 = {
        labels: labels,
        datasets: [{
            backgroundColor: 'rgba(255,255,255,.1)',
            borderColor: 'rgba(255,255,255,.55)',
            pointHoverBackgroundColor: '#fff',
            borderWidth: 2,
            data: [65, 59, 84, 84, 51, 55, 40]
        }]
    };
    var ctx = $('#social-box-chart-1');
    var socialBoxChart1 = new Chart(ctx, {
        type: 'line',
        data: data1,
        options: options
    });

    var data2 = {
        labels: labels,
        datasets: [
            {
                backgroundColor: 'rgba(255,255,255,.1)',
                borderColor: 'rgba(255,255,255,.55)',
                pointHoverBackgroundColor: '#fff',
                borderWidth: 2,
                data: [1, 13, 9, 17, 34, 41, 38]
            }
        ]
    };
    var ctx = $('#social-box-chart-2').get(0).getContext('2d');
    var socialBoxChart2 = new Chart(ctx, {
        type: 'line',
        data: data2,
        options: options
    });

    var data3 = {
        labels: labels,
        datasets: [
            {
                backgroundColor: 'rgba(255,255,255,.1)',
                borderColor: 'rgba(255,255,255,.55)',
                pointHoverBackgroundColor: '#fff',
                borderWidth: 2,
                data: [78, 81, 80, 45, 34, 12, 40]
            }
        ]
    };
    var ctx = $('#social-box-chart-3').get(0).getContext('2d');
    var socialBoxChart3 = new Chart(ctx, {
        type: 'line',
        data: data3,
        options: options
    });

    var data4 = {
        labels: labels,
        datasets: [
            {
                backgroundColor: 'rgba(255,255,255,.1)',
                borderColor: 'rgba(255,255,255,.55)',
                pointHoverBackgroundColor: '#fff',
                borderWidth: 2,
                data: [35, 23, 56, 22, 97, 23, 64]
            }
        ]
    };
    var ctx = $('#social-box-chart-4').get(0).getContext('2d');
    var socialBoxChart4 = new Chart(ctx, {
        type: 'line',
        data: data4,
        options: options
    });



    //Sparkline Charts
    var labels = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

    var options = {
        legend: {
            display: false,
        },
        scales: {
            xAxes: [{
                display:false,
            }],
            yAxes: [{
                display:false,
            }]
        },
        elements: {
            point: {
                radius: 0,
                hitRadius: 10,
                hoverRadius: 4,
                hoverBorderWidth: 3,
            }
        },
    };

    var data1 = {
        labels: labels,
        datasets: [
            {
                backgroundColor: 'transparent',
                borderColor: $.brandPrimary,
                borderWidth: 2,
                data: [35, 23, 56, 22, 97, 23, 64]
            }
        ]
    };
    var ctx = $('#sparkline-chart-1');
    var sparklineChart1 = new Chart(ctx, {
        type: 'line',
        data: data1,
        options: options
    });

    var data2 = {
        labels: labels,
        datasets: [
            {
                backgroundColor: 'transparent',
                borderColor: $.brandDanger,
                borderWidth: 2,
                data: [78, 81, 80, 45, 34, 12, 40]
            }
        ]
    };
    var ctx = $('#sparkline-chart-2');
    var sparklineChart2 = new Chart(ctx, {
        type: 'line',
        data: data2,
        options: options
    });

    var data3 = {
        labels: labels,
        datasets: [
            {
                backgroundColor: 'transparent',
                borderColor: $.brandWarning,
                borderWidth: 2,
                data: [35, 23, 56, 22, 97, 23, 64]
            }
        ]
    };
    var ctx = $('#sparkline-chart-3');
    var sparklineChart3 = new Chart(ctx, {
        type: 'line',
        data: data3,
        options: options
    });

    var data4 = {
        labels: labels,
        datasets: [
            {
                backgroundColor: 'transparent',
                borderColor: $.brandSuccess,
                borderWidth: 2,
                data: [78, 81, 80, 45, 34, 12, 40]
            }
        ]
    };
    var ctx = $('#sparkline-chart-4');
    var sparklineChart4 = new Chart(ctx, {
        type: 'line',
        data: data4,
        options: options
    });

    var data5 = {
        labels: labels,
        datasets: [
            {
                backgroundColor: 'transparent',
                borderColor: '#d1d4d7',
                borderWidth: 2,
                data: [35, 23, 56, 22, 97, 23, 64]
            }
        ]
    };
    var ctx = $('#sparkline-chart-5');
    var sparklineChart5 = new Chart(ctx, {
        type: 'line',
        data: data5,
        options: options
    });

    var data6 = {
        labels: labels,
        datasets: [
            {
                backgroundColor: 'transparent',
                borderColor: $.brandInfo,
                borderWidth: 2,
                data: [78, 81, 80, 45, 34, 12, 40]
            }
        ]
    };
    var ctx = $('#sparkline-chart-6');
    var sparklineChart6= new Chart(ctx, {
        type: 'line',
        data: data6,
        options: options
    });

});

$(function(){
    'use strict';

    //convert Hex to RGBA
    function convertHex(hex,opacity){
        hex = hex.replace('#','');
        var r = parseInt(hex.substring(0,2), 16);
        var g = parseInt(hex.substring(2,4), 16);
        var b = parseInt(hex.substring(4,6), 16);

        var result = 'rgba('+r+','+g+','+b+','+opacity/100+')';
        return result;
    }

    //Cards with Charts
    var labels = ['January','February','March','April','May','June','July'];
    var data = {
        labels: labels,
        datasets: [
            {
                label: 'My First dataset',
                backgroundColor: $.brandPrimary,
                borderColor: 'rgba(255,255,255,.55)',
                data: [65, 59, 84, 84, 51, 55, 40]
            },
        ]
    };
    var options = {
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                gridLines: {
                    color: 'transparent',
                    zeroLineColor: 'transparent'
                },
                ticks: {
                    fontSize: 2,
                    fontColor: 'transparent',
                }

            }],
            yAxes: [{
                display: false,
                ticks: {
                    display: false,
                    min: Math.min.apply(Math, data.datasets[0].data) - 5,
                    max: Math.max.apply(Math, data.datasets[0].data) + 5,
                }
            }],
        },
        elements: {
            line: {
                borderWidth: 1
            },
            point: {
                radius: 4,
                hitRadius: 10,
                hoverRadius: 4,
            },
        }
    };
    var ctx = $('#card-chart1');
    var cardChart1 = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });

    var data = {
        labels: labels,
        datasets: [
            {
                label: 'My First dataset',
                backgroundColor: $.brandInfo,
                borderColor: 'rgba(255,255,255,.55)',
                data: [1, 18, 9, 17, 34, 22, 11]
            },
        ]
    };

    var options = {
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                gridLines: {
                    color: 'transparent',
                    zeroLineColor: 'transparent'
                },
                ticks: {
                    fontSize: 2,
                    fontColor: 'transparent',
                }

            }],
            yAxes: [{
                display: false,
                ticks: {
                    display: false,
                    min: Math.min.apply(Math, data.datasets[0].data) - 5,
                    max: Math.max.apply(Math, data.datasets[0].data) + 5,
                }
            }],
        },
        elements: {
            line: {
                tension: 0.00001,
                borderWidth: 1
            },
            point: {
                radius: 4,
                hitRadius: 10,
                hoverRadius: 4,
            },
        }
    };
    var ctx = $('#card-chart2');
    var cardChart2 = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });

    var options = {
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                display: false
            }],
            yAxes: [{
                display: false
            }],
        },
        elements: {
            line: {
                borderWidth: 2
            },
            point: {
                radius: 0,
                hitRadius: 10,
                hoverRadius: 4,
            },
        }
    };
    var data = {
        maintainAspectRatio: false,
        labels: labels,
        datasets: [
            {
                label: 'My First dataset',
                backgroundColor: 'rgba(255,255,255,.2)',
                borderColor: 'rgba(255,255,255,.55)',
                data: [78, 81, 80, 45, 34, 12, 40]
            },
        ]
    };
    var ctx = $('#card-chart3');
    var cardChart3 = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });

    //Random Numbers
    function random(min,max) {
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    var elements = 16;
    var labels = [];
    var data = [];

    for (var i = 2000; i <= 2000 + elements; i++) {
        labels.push(i);
        data.push(random(40,100));
    }


    var options = {
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                display: false,
                barPercentage: 0.7,
            }],
            yAxes: [{
                display: false,
            }]
        },

    };
    var data = {
        labels: labels,
        datasets: [
            {
                backgroundColor: 'rgba(255,255,255,.3)',
                borderColor: 'transparent',
                data: data
            },
        ]
    };
    var ctx = $('#card-chart4');
    var cardChart4 = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
    });


    var elements = 15;
    var labels = [];
    var data = [];

    for (var i = 0; i <= elements; i++) {
        labels.push(i);
        data.push(random(40,100));
    }

    var options = {
        responsive: false,
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                display: false
            }],
            yAxes: [{
                display: false
            }]
        }
    };
    var data = {
        labels: labels,
        datasets: [
            {
                backgroundColor: $.brandPrimary,
                borderColor: 'transparent',
                borderWidth: 1,
                data: data
            },
        ]
    };
    var ctx = $('#chart-1');
    var Chart1 = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
    });


    var elements = 15;
    var labels = [];
    var data = [];

    for (var i = 0; i <= elements; i++) {
        labels.push(i);
        data.push(random(40,100));
    }

    var options = {
        responsive: false,
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                display: false
            }],
            yAxes: [{
                display: false
            }]
        }
    };
    var data = {
        labels: labels,
        datasets: [
            {
                backgroundColor: $.brandWarning,
                borderColor: 'transparent',
                borderWidth: 1,
                data: data
            },
        ]
    };
    var ctx = $('#chart-2');
    var Chart2 = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
    });


    var elements = 15;
    var labels = [];
    var data = [];

    for (var i = 0; i <= elements; i++) {
        labels.push(i);
        data.push(random(40,100));
    }

    var options = {
        responsive: false,
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                display: false
            }],
            yAxes: [{
                display: false
            }]
        }
    };
    var data = {
        labels: labels,
        datasets: [
            {
                backgroundColor: $.brandSuccess,
                borderColor: 'transparent',
                borderWidth: 1,
                data: data
            },
        ]
    };
    var ctx = $('#chart-3');
    var Chart3 = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
    });

    var options = {
        responsive: false,
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                display: false
            }],
            yAxes: [{
                display: false
            }]
        },
        elements: { point: { radius: 0 } }
    };
    var data = {
        labels: ['January','February','March','April','May','June','July'],
        datasets: [
            {
                backgroundColor: 'transparent',
                borderColor: $.brandInfo,
                borderWidth: 2,
                data: [65, 59, 84, 84, 51, 55, 40]
            },
        ]
    };
    var ctx = $('#chart-4');
    var Chart4 = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });


    var options = {
        responsive: false,
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                display: false
            }],
            yAxes: [{
                display: false
            }]
        },
        elements: { point: { radius: 0 } }
    };
    var data = {
        labels: ['January','February','March','April','May','June','July'],
        datasets: [
            {
                backgroundColor: 'transparent',
                borderColor: $.brandSuccess,
                borderWidth: 2,
                data: [65, 59, 84, 84, 51, 55, 40]
            },
        ]
    };
    var ctx = $('#chart-5');
    var Chart5 = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });


    var options = {
        responsive: false,
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                display: false
            }],
            yAxes: [{
                display: false
            }]
        },
        elements: { point: { radius: 0 } }
    };
    var data = {
        labels: ['January','February','March','April','May','June','July'],
        datasets: [
            {
                backgroundColor: 'transparent',
                borderColor: $.brandDanger,
                borderWidth: 2,
                data: [65, 59, 84, 84, 51, 55, 40]
            },
        ]
    };
    var ctx = $('#chart-6');
    var Chart6 = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });

    var options = {
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                display:false,
                points:false,
            }],
            yAxes: [{
                display:false,
            }]
        },
        elements: { point: { radius: 0 } }
    };
    var data = {
        labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        datasets: [
            {
                backgroundColor: 'transparent',
                borderColor: 'rgba(255,255,255,.55)',
                borderWidth: 2,
                data: [4, 18, 9, 17, 34, 22, 11, 3, 15, 12, 18, 9]
            },
        ]
    };
    var ctx = $('.chart-7');
    var Chart7 = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });

    var ctx = $('.chart-7-2');
    var Chart72 = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });

    var ctx = $('.chart-7-3');
    var Chart73 = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });

    var ctx = $('.chart-7-4');
    var Chart74 = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });


    var options = {
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                display:false,
                barPercentage: 0.6,
            }],
            yAxes: [{
                display:false,
                ticks: {
                    beginAtZero: true,
                }
            }]
        },
    };
    var data = {
        labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        datasets: [
            {
                backgroundColor: 'rgba(0,0,0,.2)',
                data: [4, 18, 9, 17, 34, 22, 11, 3, 15, 12, 18, 9]
            },
        ]
    };
    var ctx = $('.chart-8');
    var Chart8 = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
    });

    var ctx = $('.chart-8-2');
    var Chart82 = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
    });

    var ctx = $('.chart-8-3');
    var Chart83 = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
    });

    var ctx = $('.chart-8-4');
    var Chart84 = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
    });


    var options = {
        responsive: false,
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                gridLines: {
                    color: 'transparent',
                    zeroLineColor: 'transparent',
                },
                ticks: {
                    fontSize: 10,
                    maxRotation: 0,
                },
                barPercentage: 0.6,
            }],
            yAxes: [{
                display:false,
                ticks: {
                    beginAtZero: true,
                }
            }]
        }
    };
})
