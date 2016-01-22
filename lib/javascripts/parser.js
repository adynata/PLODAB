// 'use strict';

$.get("lib/data/rdf_first.xml",function(xmlData) {
      var str = $(xmlData).find('content').text();
      console.log(xmlData);
      var items = xmlData.getElementsByTagName('Description');
      console.log(items);
},'xml');
