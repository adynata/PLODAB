'use strict';


// $( ".test" ).load( "../data/rdf_first.xml", function(data) {
//   alert( "Load was performed." );
//   console.log(data);
// });

$.get("lib/data/rdf_first.xml",function(xmlData) {
      var str = $(xmlData).find('content').text();
      console.log(xmlData);
      var items = xmlData.getElementsByTagName('Description');
      // console.log(xmlData.getElementsByTagName('author'));

      console.log(items);
},'xml');
