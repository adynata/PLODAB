var Bubbles, display;

(function(){
  var root, texts;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  Bubbles = function(max) {

    // list of all standard variables to be used within the Bubbles functions

    var chart, chartScale, clear, click, collide, collisionPadding, connectEvents, data, force, gravity, hashchange, height, idValue, jitter, label, margin, maxRadius, minCollisionRadius, mouseout, mouseover, node, rScale, rValue, textValue, tick, totalArea, transformData, update, updateActive, updateLabels, updateNodes, width;


    width = 980;
    height = 510;
    data = [];
    node = null;
    label = null;
    margin = {
      top: 5,
      right: 0,
      bottom: 0,
      left: 0
    };

    // largest size for the bubbles
    if (!max) {
      max = 90;
    }
    maxRadius = max;

    // scale for the chart nodes, changes if there are too many large nodes for the chart's size
    chartScale = 1;

    // scale used to size the bubbles
    console.log('rScale set');
    rScale = d3.scale.sqrt().range([10, maxRadius * chartScale]);

    // abstraction to generate the data value for sizing
    rValue = function(d) {
      return parseInt(d.count);
    };

    // function to define the id of an element to help in creating data for routing
    idValue = function(d) {
      return d.name;
    };

    // function to define what is displayed in each bubble
    textValue = function(d) {
      return d.name;
    };

    // constants to controll how collisions look and act
    collisionPadding = 14;
    minCollisionRadius = 32;

    // 0.5 is the amount of jitter recommended for a natural presentation.
    // Jitter is the constant that controlls the jumpiness of the visualization.
    jitter = 0.5;

    // for the previous chart this made sure that count returned as a number
    // for this chart we will probably have to change this
    transformData = function(rawData) {
      rawData.forEach(function(d) {
        d.count = parseInt(d.count);
        return rawData.sort(function() {
          return 0.5 - Math.random();
        });
      });
      return rawData;
    };

    // tick callback function will be executed for every
    // iteration of the force simulation
    // - moves force nodes towards their destinations
    // - deals with collisions of force nodes
    // - updates visual bubbles to reflect new force node locations
    tick = function(e) {
      var dampenedAlpha;

      dampenedAlpha = e.alpha * 0.1;

      // Most of the work is done by the gravity and collide functions.
      node.each(gravity(dampenedAlpha))
        .each(collide(jitter))
        .attr("transform", function(d) {
          return "translate(" + d.x + "," + d.y + ")";
      });

      // As the labels are created in raw html and not svg, we need
      // to ensure we specify the 'px' for moving based on pixels
      label.style("left", function(d) {
        return ((margin.left + d.x) - d.dx / 2) + "px";
      }).style("top", function(d) {
        return ((margin.top + d.y) - d.dy / 2) + "px";
      });

    };

    // The force variable is the force layout controlling the bubbles
    // here we disable gravity and charge as we implement custom versions
    // of gravity and collisions for this visualization
    force = d3.layout.force()
      .gravity(0)
      .charge(0)
      .size([width, height])
      .on("tick", tick);

    // this is the constructor of our visualization tool.
    // check (http://bost.ocks.org/mike/chart/ ) for reference.
    chart = function(selection) {
      return selection.each(function(rawData) {

        var maxDomainValue, svg, svgEnter;

        totalArea = 0;
        // get data into the right format
        data = transformData(rawData);

        // set up radius scale once you have that data
        maxDomainValue = d3.max(data, function(d) {
          return rValue(d);
        });

        rScale.domain([0, maxDomainValue]);

        // refactoring for semantic clarity
        svg = d3.select(this).selectAll("svg").data([data]);
        svgEnter = svg.enter().append("svg");

        svg.attr("width", width + margin.left + margin.right);
        svg.attr("height", height + margin.top + margin.bottom);

        // node is used to group the bubble elements
        node = svgEnter.append("g")
          .attr("id", "bubble-nodes")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // clickable background rect to clear the current selection
        node.append("rect")
          .attr("id", "bubble-background")
          .attr("width", width)
          .attr("height", height)
          .on("click", clear);

        label = d3.select(this)
          .selectAll("#bubble-labels")
          .data([data]).enter()
          .append("div")
          .attr("id", "bubble-labels");

        update();

        // used to see if url alread has an id
        hashchange();

        // automatically call hashchange when the url has changed
        d3.select(window).on("hashchange", hashchange);
      });
    };

    // update starts up the force directed layout and then
    // updates the nodes and labels
    update = function() {
      // adds a radius to data nodes for collision calculations
      // pads the minimum size for smaller spheres
      data.forEach(function(d, i) {
        d.forceR = Math.max(minCollisionRadius, rScale(rValue(d)));
        console.log('rValue(d): ', rValue(d), d);
      });
      // starts the force layout
      force.nodes(data).start();

      // calls the update methods
      updateNodes();
      return updateLabels();
    };

    // creates a new bubble for each item in the dataset
    updateNodes = function() {
      node = node.selectAll(".bubble-node").data(data, function(d) {
        // need to modify what is returned here to add additional information to the bubble
        return idValue(d);
      });

      // no nodes are being removed from the visualization, but if you wanted to for some reason, here is where you would do that.
      node.exit().remove();

      // nodes are links with svg circle elements inside.
      // this is the point where we can start adding semantic html for ADA req's.
      node.enter()
        .append("a")
        .attr("class", "bubble-node")
        .attr("xlink:href", function(d) {
          return "#" + (encodeURIComponent(idValue(d)));
        })
        .call(force.drag)
        .call(connectEvents)
        .append("circle")
        .attr("r", function(d) {
          var radius = rScale(rValue(d));
          totalArea += (Math.pow(radius, 2) * Math.PI );
          return rScale(rValue(d));
        });
    };

    // as in updateNodes, we use idValue to define what the unique id for each data
    // point is
    updateLabels = function() {
      var labelEnter;

      label = label.selectAll(".bubble-label")
        .data(data, function(d) {
          return idValue(d);
      });

      label.exit().remove();

      // labels are anchors with div's inside
      // labelEnter holds our enter selection so it is easier to append multiple elements to this selection
      labelEnter  = label.enter()
      .append("a")
      .attr("class", "bubble-label")
      .attr("href", function(d) {
        return "#" + (encodeURIComponent(idValue(d)));
      }).call(force.drag).call(connectEvents);

      labelEnter.append("div")
        .attr("class", "bubble-label-name")
        .text(function(d) {
          return textValue(d);
      });

      labelEnter.append("div")
        .attr("class", "bubble-label-value")
        .text( function(d) {
          return rValue(d);
      });

      // first set the font-size and cap the maximum width to enable word wrapping
      label.style("font-size", function (d) {
          return Math.max(14, rScale(rValue(d) / 12)) + "px";
        }).style("width", function (d) {
          return 0.2 * rScale(rValue(d)) + "px";
      });

      // now we need to adjust if the width set is too big for the text
      // do this using a temporary span
      label.append("span")
        .text(function (d) {
          return textValue(d);
        }).each(function (d) {
          d.dx = Math.max(2 * rScale(rValue(d)), this.getBoundingClientRect().width);
        }).remove();

      // reset the width of the label to the actual width
      label.style("width", function (d) {
          return d.dx + "px";
        });

      // compute 'dy' - the value to shift the text from the top
      //'this' inside of D3's each refers to the actual DOM element
      // connected to the data node
      label.each(function (d) {
        d.dy = this.getBoundingClientRect().height;
      });

    };


     // custom gravity function
    gravity = function(alpha) {
      var ax, ay, cx, cy;

      // start with the center of the display
      cx = width / 2;
      cy = height / 2;

      // use alpha to affect how much to push
      // towards the horizontal or vertical

      ax = alpha / 6;
      ay = alpha / 2;

      // return a function that will modify the
      // node's x and y values
      return function(d) {
        d.x += (cx - d.x) * ax;
        d.y += (cy - d.y) * ay;
      };
    };

      // custom collision function to prevent nodes from touching.
    collide = function(jitter) {

        // return a function that modifies the x and y of a node
      return function(d) {
        data.forEach( function(d2) {

          // check that we aren't comparing a node with itself
          if (d != d2) {
            // use distance formula to find distance between two nodes
            x = d.x - d2.x;
            y = d.y - d2.y;
            distance = Math.sqrt(x * x + y * y);
            // find current minimum space between two nodes
            // using the forceR that was set to match the
            // visible radius of the nodes
            minDistance = d.forceR + d2.forceR + collisionPadding;

            // if the current distance is less then the minimum
            // allowed then we need to push both nodes away from one another
            if (distance < minDistance) {
              // scale the distance based on the jitter variable
              distance = (distance - minDistance) / distance * jitter;
              // move our two nodes
              moveX = x * distance;
              moveY = y * distance;
              d.x -= moveX;
              d.y -= moveY;
              d2.x += moveX;
              d2.y += moveY;
            }
          }
        });
      };
    };

    // adds mouse events to element
    connectEvents = function(d) {
      d.on("click", click);
      d.on("mouseover", mouseover);
      d.on("mouseout", mouseout);
    };

    // clears currently selected bubble
    clear = function() {
      return location.replace("#");
    };

    // changes clicked bubble by modifying url
    // this function in the chart will have to be refactored once this is integrated with Angular's UI router.
    click = function(d) {
      location.replace("#" + encodeURIComponent(idValue(d)));
      return d3.event.preventDefault();
    };

      // called when url after the # changes
    hashchange = function() {
      var id;
      id = decodeURIComponent(location.hash.substring(1)).trim();
      return updateActive(id);
    };

    // activates new node
    // this could be a good place to requery the RDF for new datasets or change the chart.
    updateActive = function(id) {
      node.classed("bubble-selected", function(d) {
        return id === idValue(d);
      });
      if (id.length > 0) {
        return d3.select("#status").html("<h3>The word <span class=\"active\">" + id + "</span> is now active</h3>");
      } else {
        return d3.select("#status").html("<h3>No word is active</h3>");
      }
    };

    // hover events
    mouseover = function(d) {
      return node.classed("bubble-hover", function(p) {
        return p === d;
      });
    };

    mouseout = function(d) {
      return node.classed("bubble-hover", false);
    };

      // public getter/setters for variables
    chart.height = function(_) {
      if (!arguments.length) {
        return height;
      }
      height = _;
      return chart;
    };

    chart.width = function(_) {
      if (!arguments.length) {
        return width;
      }
      width = _;
      return chart;
    };

    chart.r = function(_) {
      if (!arguments.length) {
        return rValue;
      }
      rValue = _;
      return chart;
    };

    chart.getTotalArea = function() {
      return totalArea;
    };

    chart.chartScale = function(_) {
      if (!arguments.length) {
        return chartScale;
      }
      chartScale = _;
      return chart;
    };

    chart.maxRadius = function(_) {
      if (!arguments.length) {
        return maxRadius;
      }
      maxRadius = _;
      console.log(maxRadius);
      return chart;
    };

    return chart;
  };
  // ^ end of the Bubbles function

  // Helper function that simplifies the calling
  // of our chart with it's data and div selector
  // specified
  root.plotData = function(selector, data, chartFnc) {
    d3.select(selector + ' svg').remove();
    d3.select(selector + ' div').remove();
    var bubbleChart = d3.select(selector).datum(data).call(chartFnc);
    var bubblesArea = chartFnc.getTotalArea();
    var chartArea = chartFnc.width() * chartFnc.height();
    var difference = (chartArea - bubblesArea);

    // check to see if bubbles fit in total area, and how much over
    if ( difference < 150000) {
      var newMaX = chartFnc.maxRadius() * (difference / 190000);
      chartFnc = Bubbles(newMaX);
      d3.select(selector + ' svg').remove();
      d3.select(selector + ' div').remove();
      // console.log(chartFnc.maxRadius());
      // console.log(chartFnc);
      d3.select(selector).datum(data).call(chartFnc);

    }
  };


  // run on document ready
  $(function() {
    var key, chartFnc, text;

    // create a new Bubbles chart
    chartFnc = Bubbles();

    // this function is called once data is loaded
    display = function(data) {
      // console.log('display func, input data: ', data);
      return plotData("#vis", data, chartFnc);
    };

    // storing the current text in the search component for clarity
    key = decodeURIComponent(location.search).replace("?", "");
    // text = texts.filter(function(t) {
    //   return t.key === key;
    // })[0];

    // defaults to first selection
    // if (!text) {
    //   text = texts[0

    // }

    // selects the book title from the text name and displays it
    d3.select("#text-select").on("change", function(e) {
      key = $(this).val();
      location.replace("#");
      location.search = encodeURIComponent(key);
    });

    // d3.select("#book-title").html(text.name);

    // load the data!
  //   return d3.csv("/data/" + text.file, display);
  // });
     var bubbleChart = display( dataSets.subjects );

   });

})();
