import * as d3 from "d3";
import { randomIntFromInterval } from '../../math/math'

export const makeViz = (planets) => {
    // d3.json(planets, (planets) => {

        planets.map((planet) => {
            planet.key = planet.name;
            // planet.radius = planet.diameter;
            planet.radius = planet.diameter / 2;
            planet.orbital_period = "" + randomIntFromInterval(1, 3);
            console.log(planet.orbital_period);
            return planets;
        })

        if(document.querySelector('#viz')) {
            document.querySelector('#viz').innerHTML = '';
            document.querySelector('#viz').innerHTML = '<svg></svg>';
            drawOrbit(planets)
        }
    // });
}
  
export const drawOrbit = (_data) => {

    d3.layout.orbit = function() {
        var currentTickStep = 0;
        var orbitNodes;
        var orbitSize = [1,1];
        var nestedNodes;
        var flattenedNodes = [];
        var tickRadianStep = 0.004363323129985824;
        var orbitDispatch = d3.dispatch('tick');
        var tickInterval;
        var orbitalRings = [];
        var orbitDepthAdjust = function() {return 2.95};
        var childrenAccessor = function(d) {return d.children};
        var tickRadianFunction = function() {return 1};
        var fixedOrbitArray = [99];
        var orbitMode = "flat";
    
    
        function _orbitLayout() {
    
            return _orbitLayout;
        }
    
        _orbitLayout.mode = function(_mode) {
            //Atomic, Solar, other?
            if (!arguments.length) return orbitMode;
            fixedOrbitArray = [1]
            orbitMode = _mode;
            if (Array.isArray(_mode)) {
                fixedOrbitArray = _mode;
                orbitMode = "custom";
            }
            return this
        }
    
        _orbitLayout.start = function() {
            //activate animation here
            tickInterval = setInterval(
                function() {
                currentTickStep++;
                flattenedNodes.forEach(function(_node){
                    if (_node.parent) {
                        _node.x = _node.parent.x + ( (_node.ring) * Math.sin( _node.angle + (currentTickStep * tickRadianStep * tickRadianFunction(_node))) );
                        _node.y = _node.parent.y + ( (_node.ring) * Math.cos( _node.angle + (currentTickStep * tickRadianStep * tickRadianFunction(_node))) );
                    }
                })
                orbitalRings.forEach(function(_ring) {
                    _ring.x = _ring.source.x;
                    _ring.y = _ring.source.y;
                })
                orbitDispatch.tick();
            }, 
            10);
        }
    
        _orbitLayout.stop = function() {
            //deactivate animation here
            clearInterval(tickInterval);
        }
    
        _orbitLayout.speed = function(_degrees) {
            if (!arguments.length) return tickRadianStep / (Math.PI / 360);
            tickRadianStep = tickRadianStep = _degrees * (Math.PI / 360);
            return this;
        }
    
        _orbitLayout.size = function(_value) {
            if (!arguments.length) return orbitSize;
            orbitSize = _value;
            return this;
            //change size here
        }
    
        _orbitLayout.revolution = function(_function) {
            //change ring size reduction (make that into dynamic function)
            if (!arguments.length) return tickRadianFunction;
            tickRadianFunction = _function;
            return this
        }
    
        _orbitLayout.orbitSize = function(_function) {
            //change ring size reduction (make that into dynamic function)
            if (!arguments.length) return orbitDepthAdjust;
            orbitDepthAdjust = _function;
            return this
        }
    
        _orbitLayout.orbitalRings = function() {
            //return an array of data corresponding to orbital rings
            if (!arguments.length) return orbitalRings;
            return this;
        }
    
        _orbitLayout.nodes = function(_data) {
            if (!arguments.length) return flattenedNodes;
            nestedNodes = _data;
            calculateNodes();
            return this;
        }
    
        _orbitLayout.children = function(_function) {
            if (!arguments.length) return childrenAccessor;
            
            //Probably should use d3.functor to turn a string into an object key
            childrenAccessor = _function;
            return this;
    
    
        }
    
        d3.rebind(_orbitLayout, orbitDispatch, "on");
    
        return _orbitLayout;
        function calculateNodes() {
            orbitalRings = [];
            var _data = nestedNodes; 
        //If you have an array of elements, then create a root node (center)
            //In the future, maybe make a binary star kind of thing?
            if (!childrenAccessor(_data)) {
                orbitNodes = {key: "root", values: _data}
                childrenAccessor(orbitNodes).forEach(function (_node) {
                    _node.parent = orbitNodes;
                })
            }
            //otherwise assume it is an object with a root node
            else {
                orbitNodes = _data;
            }
                orbitNodes.x = orbitSize[0] / 2;
                orbitNodes.y = orbitSize[1] / 2;
                orbitNodes.ring = orbitSize[0] / 2;
                orbitNodes.depth = 0;
    
                flattenedNodes.push(orbitNodes);
    
                    traverseNestedData(orbitNodes);
    
            function traverseNestedData(_node) {
                if(childrenAccessor(_node)) {
                    var y = 0;
                    var totalChildren = childrenAccessor(_node).length;
                    var _rings = 0;
                    var _total_positions = 0;
                    var _p = 0;
                    while (_total_positions < totalChildren) {
                        if (fixedOrbitArray[_p]) {
                            _total_positions += fixedOrbitArray[_p];
                        }
                        else {
                            _total_positions += fixedOrbitArray[fixedOrbitArray.length - 1];						
                        }
                        _p++;
                        _rings++;
                    }
    
                    while (y < totalChildren) {
                        var _pos = 0;
                        var _currentRing = 0;
                        var _p = 0;
                        var _total_positions = 0;
    
                    while (_total_positions <= y) {
                        if (fixedOrbitArray[_p]) {
                            _total_positions += fixedOrbitArray[_p];
                        }
                        else {
                            _total_positions += fixedOrbitArray[fixedOrbitArray.length-1];						
                        }
    
                            _p++;
                            _currentRing++;
                    }
    
                    var ringSize = fixedOrbitArray[fixedOrbitArray.length-1];
    
                    if (fixedOrbitArray[_currentRing-1]) {
                        ringSize = fixedOrbitArray[_currentRing-1];
                    }
    
                        if (_node.parent) {
                            var _ring = {source: _node, x: _node.x, y: _node.y, r: _node.parent.ring / orbitDepthAdjust(_node) * (_currentRing / _rings)};
                        }
                        else {
                            var _ring = {source: _node, x: _node.x, y: _node.y, r: (orbitSize[0] / 2) * (_currentRing / _rings)};
                        }
    
    
                        var thisPie = d3.layout.pie().value(function(d) {return childrenAccessor(d) ? 4 : 1});
                        var piedValues = thisPie(childrenAccessor(_node).filter(function(d,i) {return i >= y && i <= y+ringSize-1}));
    
                        for (var x = y; x<y+ringSize && x<totalChildren;x++) {
                            childrenAccessor(_node)[x].angle = ((piedValues[x - y].endAngle - piedValues[x - y].startAngle) / 2) + piedValues[x - y].startAngle;
    
                            childrenAccessor(_node)[x].parent = _node;
                            childrenAccessor(_node)[x].depth = _node.depth + 1;
    
                            childrenAccessor(_node)[x].x = childrenAccessor(_node)[x].parent.x + ( (childrenAccessor(_node)[x].parent.ring / 2) * Math.sin( childrenAccessor(_node)[x].angle ) );
                            childrenAccessor(_node)[x].y = childrenAccessor(_node)[x].parent.y + ( (childrenAccessor(_node)[x].parent.ring / 2) * Math.cos( childrenAccessor(_node)[x].angle ) );
    
                            childrenAccessor(_node)[x].ring = _ring.r;
    
                            flattenedNodes.push(childrenAccessor(_node)[x]);
                            traverseNestedData(childrenAccessor(_node)[x]);
                        }
                        orbitalRings.push(_ring);
                        y+=ringSize;
                    }
    
                }
            }
    
        }
    
    }
  
    let orbitScale = d3.scale.linear().domain([1, 3]).range([3.8, 1.5]).clamp(true);
    let radiusScale = d3.scale.linear().domain([210.64,2500,10000,71492.68]).range([2,4,8,16]);
  
    // let planetColors = {Mercury: "gray", Venus: "#d6bb87", Earth: "#677188", Mars: "#7c5541", Jupiter: "#a36a3e", Saturn: "#e9ba85", Uranus: "#73cbf0", Neptune: "#6383d1"}
  
  
    let orbit = d3.layout.orbit().size([900,900])
        .children(function(d) {return d.values})
        .revolution(function(d) {return 1 / d.orbital_period})
        .orbitSize(function(d) {return orbitScale(d.depth)})
        .speed(1)
        .mode("solar")
        .nodes(_data);
  
    d3.select("svg")
        .append("g")
        .attr("class", "viz")
        .attr("transform", "translate(50,50)")
        .selectAll("g.node").data(orbit.nodes())
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", function(d) {return "translate(" +d.x +"," + d.y+")"})
        .on("mouseover", nodeOver)
        .on("mouseout", nodeOut)
  
    d3.selectAll("g.node")
        .append("circle")
        .attr("r", function(d) {return d.radius ? radiusScale(d.radius) : 20})
        // .style("fill", function(d) {return d.depth === 0 ? "#FFCC00" : d.depth === 1 ? planetColors[d.key] : "lightgray"});
        .style("fill", function(d) {return d.depth === 0 ? "#FFCC00" : '#'+(Math.random()*0xFFFFFF<<0).toString(16); });
  
    d3.selectAll("g.node").filter(function(d) {return d.depth === 1})
        .append("text")
        .text(function(d) {return d.depth === 0 ? "Sun" : d.key})
        .attr("y", 20)
        .style("text-anchor", "middle")
  
    d3.select("g.viz")
        .selectAll("circle.ring")
        .data(orbit.orbitalRings())
        .enter()
        .insert("circle", "g")
        .attr("class", "ring")
        .attr("r", function(d) {return d.r})
        .attr("cx", function(d) {return d.x})
        .attr("cy", function(d) {return d.y})
  
    // d3.select("#buttons").append("button").html("solar").on("click", function() {newMode("solar")})
    // d3.select("#buttons").append("button").html("flat").on("click", function() {newMode("flat")})
    // d3.select("#buttons").append("button").html("atomic").on("click", function() {newMode("atomic")})
    // d3.select("#buttons").append("button").html("custom").on("click", function() {newMode([4,4])})
  
    orbit.on("tick", function() {
      d3.selectAll("g.node")
        .attr("transform", function(d) {return "translate(" +d.x +"," + d.y+")"});
  
      d3.selectAll("circle.ring")
      .attr("cx", function(d) {return d.x})
      .attr("cy", function(d) {return d.y});
    });
  
    orbit.start();
  
    // let newMode = (_mode) => {
    //   orbit.mode(_mode)
    //   .nodes(_data);
  
    //     d3.select("g.viz")
    //     .selectAll("circle.ring")
    //     .data(orbit.orbitalRings())
    //     .exit()
    //     .transition()
    //     .duration(500)
    //     .style("stroke-opacity", 0)
    //     .style("stroke-width", 3)
    //     .remove();
    
    //     d3.select("g.viz")
    //     .selectAll("circle.ring")
    //     .data(orbit.orbitalRings())
    //     .enter()
    //     .insert("circle", "g")
    //     .attr("class", "ring");
        
    //     d3.selectAll("circle.ring")
    //     .attr("r", function(d) {return d.r})
    //     .attr("cx", function(d) {return d.x})
    //     .attr("cy", function(d) {return d.y});
  
    // }
  
    function nodeOver(d) {
      orbit.stop();
  
      if (d.depth === 2) {
        d3.select(this).append("text").text(d.label || d.key).style("text-anchor", "middle")
        .attr("y", 15)
        .attr("class", "moon");
      }
      d3.select(this).select("circle").style("stroke", "white").style("stroke-width", 3);
    }
  
    function nodeOut() {
        orbit.start();
        d3.selectAll("text.moon").remove();
        d3.selectAll("g.node > circle").style("stroke", "white").style("stroke-width", 0);    
    }
  
  
  }
