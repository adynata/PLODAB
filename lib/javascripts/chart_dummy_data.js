
// var subjects, technique, materials, locations;
var dataSets = {};

(function(){
  dataSets.subjects = [
          {name: "Feminism", count: 12},
          {name: "Emigration and Immigration", count: 5},
          {name: "Latin America", count: 10},
          {name: "Identity", count: 10},
          {name: "Gender Studies", count: 8},
          {name: "Public Opinion", count: 1},
          {name: "Music in Art", count: 3},
          {name: "Race in America", count: 2},
  ];

  dataSets.techniques = [
          {name: "Digital Imaging", count: 20},
          {name: "Screen Printing", count: 5},
          {name: "Relief", count: 1},
          {name: "Xerography", count: 3},
          {name: "Intaglio", count: 3},
          {name: "Illustration", count: 3},
          {name: "Letterpress", count: 3}
  ];

  dataSets.materials = [
          {name: "Rice Paper", count: 10},
          {name: "Cloth", count: 2},
          {name: "Found Objects", count: 4},
          {name: "Cardboard", count: 5},
          {name: "Paper", count: 12}
  ];

  dataSets.bindings = [
          {name: "Accordion", count: 5},
          {name: "Codex", count: 39},
          {name: "Scroll", count: 1},
          {name: "Pop-up Book", count: 1},
          {name: "Other", count: 5}
  ];

  dataSets.locations = [
          {name: "Fort Lauderdale, FL", count: 1},
          {name: "Los Angeles, CA", count: 1},
          {name: "Santa Cruz, CA", count: 1},
          {name: "Burlington, VT", count: 1},
          {name: "Rosendale, NY", count: 1},
          {name: "Mexico, DF", count: 1},
          {name: "Illinois", count: 1},
          {name: "Brooklyn, NY", count: 1},
          {name: "New Haven, CT", count: 1},
          {name: "Washington D.C.", count: 1},
          {name: "Pittsburgh, PA", count: 1},
          {name: "Wilmington, DE", count: 1},
          {name: "El Cerrito, CA", count: 1},
          {name: "North Bay, ON", count: 1},
          {name: "CA", count: 1}
    ];

    dataSets.colors = {
      "locations": "blue",
      "subjects": "red",
      "materials": "yellow",
      "techniques": "purple"
    };



    // TODO: export to module accessible by dummy chart (angular uses dependency injection)

})();
