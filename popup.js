document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0];
        var activeTabUrl = activeTab.url;
        if(activeTabUrl.indexOf("www") != -1) {
            var start = activeTabUrl.indexOf("www.") + 4;
            var end = activeTabUrl.indexOf(".",12);
        }
        else {
            var start = activeTabUrl.indexOf("://") +3;
            var end = activeTabUrl.indexOf(".");
        }
        document.getElementById("store").innerHTML = activeTabUrl.slice(start,end);
     });

     runVisualization();
});

function runVisualization() {
    var i = true;
    if(i) {
        drawPie([20/100, 1-.20],"#graph");
        i = false;
    }
}

var width = 480,
height = 250,
radius = Math.min(width, height) / 2 - 10;

var arc = d3.arc().innerRadius(radius-35)
.outerRadius(radius)
.outerRadius(radius);

var pie = d3.pie();

var drawPie = function(data,id){
  var svg = d3.select(id).append("svg")
    .datum(data)
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", "0 0 480 250")
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var arcs = svg.selectAll("g.arc")
    .data(pie)
    .enter().append("g")
    .attr("class", "arc");

  arcs.append("path")
    .attr("fill", function(d, i) {
      if (i == 0) {
        return "#add8e6"
        // return "#32CD32"
      }
      else{
        // return "#888888"
        return "#C0C0C0"
      }
    })
    .transition()
    .duration(2000)
    .attrTween("d", trans1)

  arcs.append("text")
    .style("text-anchor", "middle")
    .style("font-size","30px")
    .style("fill", "black")
    .text(data[0] * 100 + "%");
}

var trans1 = function(b) {
  b.innerRadius = 0;
  var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
  return function(t) { return arc(i(t)); };
}
