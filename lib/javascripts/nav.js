$(function() {

// TODO: fix the topic selection process here:
  // d3.select("#topic").html(text.name);


  $('button').on('click', function(e) {
    var chartState = e.target.value;
    $('button').removeClass('selected');
    $(e.target).addClass('selected');
    location.replace("#");
    $('#topic').text(chartState);
    display(dataSets[chartState]);
    console.log(dataSets.colors[chartState]);
    $('.bubble-node').addClass(dataSets.colors[chartState]);
  });

 });
