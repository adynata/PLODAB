(function(){

function classes(root) {
  var _classes = [];
  console.log(root);
  function recurse(name, node) {
    if (node.children) node.children.forEach(function(child) {
      console.log(child);
      recurse(node.name, child); });
    else _classes.push({packageName: name, className: node.name, value: node.size});
    // console.log(_classes, name);
  }

  recurse(null, root);
  console.log({children: _classes});
  return {children: _classes};
}


subjects = [
      {name: "Wayne Enterprises", revenue: 3938, cost: 1423},
      {name: "Stark Industries", revenue: 3812, cost: 823},
      {name: "Acme Corp", revenue: 6714, cost: 2990},
      {name: "Dunder Mifflin", revenue: 743, cost: 1304}

        // {name: "Feminism", count: 12},
        // {name: "Emigration and Immigration", count: 5},
        // {name: "Latin America", count: 10},
        // {name: "Identity", count: 10},
        // {name: "Gender Studies", count: 8},
        // {name: "Public Opinion", count: 1},
        // {name: "Music in Art", count: 3},
        // {name: "Race in America", count: 2},
];

classes(subjects);
})();
