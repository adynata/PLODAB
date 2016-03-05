var chartState = {};
$(function() {
  chartState.displayedSubjects = ["subjects"];
  chartState.data = [];

  chartState.chartData = function() {
    // reset data and iterate through the display collection to recompile data for the chart
    chartState.data = [];

    this.displayedSubjects.forEach(function(d) {
      console.log("what's this", d);
      // console.log("data", dataSets[d]);
      // console.log("cahrtstaedata", chartState.data);
      chartState.data = chartState.data.concat(dataSets[d]);
      // console.log("cahrtstaedata", chartState.data);
      displayBubbleChart(chartState.data);

    });
    displayBubbleChart(chartState.data);

    return chartState;
  };

  chartState.display = function(_) {
    if (!arguments.length) {
      this.chartData();
      return this.displayedSubjects;
    }
    this.displayedSubjects.push(_);
    this.chartData();
    return chartState;
  };

  chartState.removeSubj = function(_) {
    if (!arguments.length) {
      this.chartData();
      return this.displayedSubjects;
    }
    // remove key from displayedSubjects
    var index = -1;

    for (var i = this.displayedSubjects.length - 1; i >= 0; --i) {
      if (this.displayedSubjects[i] === _) {
        index = i;
        break;
      }
    }

    if (index >= 0) {
      this.displayedSubjects.splice(index, 1);
      console.log("after splice, subjects :", this.displayedSubjects);
      this.chartData();
    }
    return chartState;
  };

  function includes(arr, k) {
    for(var i=0; i < arr.length; i++){
      if( arr[i] === k || ( arr[i] !== arr[i] && k !== k ) ){
        return true;
      }
    }
    return false;
  }


  $('button').on('click', function(e) {
    var newState = e.target.value;
    // location.replace("#");

    if (includes(chartState.displayedSubjects, newState)) {
      // remove topic from displayed set, rework data
      $(e.target).removeClass('selected');
      // console.log('newstate in chartState.displayedSubjects is TRUE');
      chartState.removeSubj(newState);
      // displayBubbleChart(chartState.data);
    } else {
      // add the data and call the chart
      $(e.target).addClass('selected');
      chartState.display(newState);
      // displayBubbleChart(chartState.data);
    }

    // $('.bubble-node').addClass(dataSets.colors[chartState]);

  });

 });
