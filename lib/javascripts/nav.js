$(function() {



  $('button').on('click', function(e) {
    var chartState = e.target.value;
    $('button').removeClass('selected');
    $(e.target).addClass('selected');
    location.replace("#");
    $('#topic').text(chartState);
    display(dataSets[chartState]);
    // $('.bubble-node').addClass(dataSets.colors[chartState]);

  });

 });
