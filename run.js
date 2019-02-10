const fs = require("fs"),
  xml2js = require("xml2js"),
  jsonfile = require("jsonfile"),
  builder = new xml2js.Builder(),
  parser = new xml2js.Parser();

module.exports.init = function() {
  function process(global, parent, key, value) {
    if (key == "id" && global[value]) {
      const match = global[value];
      Object.keys(match).forEach(v => {
        console.log("[%s] %s=%s", value, v, match[v]);
        parent[v] = match[v];
      });
    }
  }

  function traverse(o, func, global) {
    for (var i in o) {
      func.apply(this, [global, o, i, o[i]]);
      if (o[i] !== null && typeof o[i] == "object") {
        traverse(o[i], func, global);
      }
    }
  }

  function execute(parameters, file, output) {
    fs.readFile(file, function(err, data) {
      parser.parseString(data, function(err, result) {
        traverse(result.svg.g, process, parameters);
        const xml = builder.buildObject(result);
        fs.writeFileSync(output, xml);
      });
    });
  }

  function exec(file, source) {
    jsonfile.readFile(file, function(err, obj) {
      if (err) console.error(err);

      console.log(`[INFO] ${obj.name}`);
      const variants = Object.keys(obj.variants);
      variants.forEach((key, index) => {
        const params = obj.variants[key];
        console.log(`[INFO] index:${index}`);
        execute(params, source, __dirname + `/bin/${obj.name}-${key}.svg`);
      });
    });
  }

  exec(__dirname + "/svg/photos/definition.json", __dirname + `/svg/photos/logo.svg`);
};
