const fs = require("fs"),
  xml2js = require("xml2js");

module.exports.init = function() {
  const definition = {
    outline: {
      stroke: "#E54E7A"
    },
    outline_bg: {
      stroke: "#E54E7A"
    },
    land: {
      fill: "#E54E7A"
    },
    sun: {
        fill: "#E54E7A"
    }
  };

  function process(parent, key, value) {
    if (key == "id" && definition[value]) {
      const match = definition[value];
      Object.keys(match).forEach(v => {
        console.log("[SET - %s] %s=%s", value, v, match[v]);
        parent[v] = match[v];
      });
    }
  }

  function traverse(o, func) {
    for (var i in o) {
      func.apply(this, [o, i, o[i]]);
      if (o[i] !== null && typeof o[i] == "object") {
        traverse(o[i], func);
      }
    }
  }

  var builder = new xml2js.Builder();
  var parser = new xml2js.Parser();
  fs.readFile(__dirname + "/svg/logo.svg", function(err, data) {
    parser.parseString(data, function(err, result) {
      traverse(result.svg.g, process);
      var xml = builder.buildObject(result);
      fs.writeFileSync(__dirname + "/bin/logo.svg", xml);
    });
  });
};
