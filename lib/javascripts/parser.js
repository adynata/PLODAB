// 'use strict';

$.get("lib/data/rdf_first.xml",function(xmlData) {
      var str = $(xmlData).find('content').text();
      // console.log(xmlData);
      var items = xmlData.getElementsByTagName('Description');
      // console.log(items);
},'xml');


$.get("lib/data/vra_first.xml",function(xmlData_one) {
      var str = $(xmlData_one).find('content').text();
      // console.log(xmlData_one);
      var items = xmlData_one.getElementsByTagName('work');
      var author = xmlData_one.getElementsByTagName('agent');
      // console.log(items);
      console.log(author);
},'xml');
