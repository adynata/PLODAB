$(function() {

  // selects the book title from the text name and displays it
  d3.select("#text-select").on("change", function(e) {
    key = $(this).val();
    location.replace("#");
    location.search = encodeURIComponent(key);
    // NTS: read up on "location"
  });

// TODO: fix the topic selection process here:
  // d3.select("#topic").html(text.name);

  // load the data!
//   return d3.csv("/data/" + text.file, display);
// });



  $('button').on('click', function(e) {
    var chartState = e.target.value;
    $('button').removeClass('selected');
    $(e.target).addClass('selected');

    display(dataSets[chartState]);
    // display(locations);
  });

  //  display( subjects );

 });
