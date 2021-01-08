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
        runVisualization(activeTabUrl.slice(start,end));
        document.getElementById("store").innerHTML = currentCompany;
    });
    
    document.getElementById("searchBar").addEventListener("change", onSearch);
    function onSearch() {
      var x = document.getElementById("searchBar").value;
      // document.getElementById("demo").innerHTML = "You selected: " + x;
      var content = "";
      for (var key in DATA) {
        // check if the property/key is defined in the object itself, not in parent
        if (DATA.hasOwnProperty(key)) {           
            if (key.toLowerCase().indexOf(x.toLowerCase()) != -1) {
              content += "<p><strong>"+key+": </strong>"+DATA[key]["score"]+"</p>"
            }
        }
      }
      document.getElementById("results").innerHTML = content;
    }
  });
// var companyInfo;
// document.addEventListener('DOMContentLoaded', function () {
//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     var activeTab = tabs[0];
//     var activeTabUrl = activeTab.url;
//     if (activeTabUrl.indexOf("www") != -1) {
//       var start = activeTabUrl.indexOf("www.") + 4;
//       var end = activeTabUrl.indexOf(".", 12);
//     }
//     else {
//       var start = activeTabUrl.indexOf("://") + 3;
//       var end = activeTabUrl.indexOf(".");
//     }
//     document.getElementById("store").innerHTML = activeTabUrl.slice(start, end);
//     //this code sends a message to firebase to fetch a company name 
//     chrome.runtime.sendMessage({ command: "fetch", data: { company: activeTabUrl.slice(start, end) } }, (res) => {
//       companyInfo = res;
//       helperFunction(res)
//     });
  // });
// });

var currentCompany;

function runVisualization(company) {
  // console.log(company);
  var score;
    for (var key in DATA) {
      // check if the property/key is defined in the object itself, not in parent
      if (DATA.hasOwnProperty(key)) {       
          var formatCompany = key.toLowerCase();
          formatCompany = formatCompany.split(' ').join('')
          if (formatCompany.indexOf(company) != -1) {
            console.log(key);
            currentCompany = key;
            score = DATA[key]["score"]
            break;
            // console.log(DATA[key]["score"]);
          }
      }
    }
    var i = true;
    if(i) {
        drawPie([score/100, 1-(score/100.0)],"#graph");
        i = false;
    }
  }
// function runVisualization(score) {
//   var i = true;
//   score = isNaN(score) ? 5 : score;

//   if (i) {
//     drawPie([score / 100, 1 - (score / 100)], "#graph");
//     i = false;
//   }
// }

var width = 480,
  height = 250,
  radius = Math.min(width, height) / 2 - 10;

var arc = d3.arc().innerRadius(radius - 35)
  .outerRadius(radius)
  .outerRadius(radius);

var pie = d3.pie();

var drawPie = function (data, id) {
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
    .attr("fill", function (d, i) {
      if (i == 0) {
        return "#8ACB88"
      }
      else {
        return "#C0C0C0"
      }
    })
    .transition()
    .duration(2000)
    .attrTween("d", trans1)

  arcs.append("text")
    .style("text-anchor", "middle")
    .style("font-size", "30px")
    .style("fill", "black")
    .text((data[0] * 100).toFixed(0));
}

var trans1 = function (b) {
  b.innerRadius = 0;
  var i = d3.interpolate({ startAngle: 0, endAngle: 0 }, b);
  return function (t) { return arc(i(t)); };
}

//this is where we can get the returned data
var helperFunction = function (res) {
  console.log(res);
}
// let form = document.getElementById("signup");
// console.log(form);
// console.log("test console output");

// form.addEventListener('submit', function() {
//   let email = document.form.email;
//   let password = document.form.password;

//   firebase.auth().createUserWithEmailAndPassword(email, password)
//     .then((user) => {
//       // Signed in 
//       // ...
//       return true;
//     })
//     .catch((error) => {
//       var errorCode = error.code;
//       var errorMessage = error.message;
//       // ..
//       return false;
//     });
// });
//   runVisualization(parseInt(res.data.score));

//   document.getElementById("searchBar").addEventListener("change", onSearch);
//   function onSearch() {
//     var x = document.getElementById("searchBar").value;
//     document.getElementById("demo").innerHTML = "You selected: " + x;
//   }
// }
