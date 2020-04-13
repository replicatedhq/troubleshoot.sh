const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");
const specDir = "./analyzer-specs";

let tags = [];
let categories = [];
let specs = [];

fs.readdir(specDir, (err, files) => {
  files.forEach(file => {
    const doc = yaml.safeLoad(fs.readFileSync(path.resolve(specDir, file)));
    tags.push(doc.metadata.annotations.tags);

    let categoryObj = new Object();
    categoryObj.name = doc.metadata.annotations.category
    const displayName = doc.metadata.annotations.category.charAt(0).toUpperCase() + doc.metadata.annotations.category.slice(1)
    categoryObj.display = displayName.replace("_", " ");
    categories.push(categoryObj);
    
    let specObj = new Object();
    specObj.slug = doc.metadata.name,
    specObj.category = doc.metadata.annotations.category,
    specObj.title = doc.metadata.annotations.title,
    specObj.description = doc.metadata.annotations.description,
    specObj.iconUri = doc.metadata.annotations.iconUri,
    specObj.contributors = doc.metadata.annotations.contributors,
    specObj.tags = doc.metadata.annotations.tags

    // Remove annotations before setting the yaml spec
    delete doc["metadata"]["annotations"];
    specObj.specYaml = yaml.safeDump(doc);

    specs.push(specObj);

  });
  const jsonFile = {
    _comment: `This file is generated! Last generated on ${new Date()}. To regenerate run 'make generate-specs'`,
    tags: [...new Set(tags)],
    categories: [...new Set(categories)],
    specs
  }

  fs.writeFile("./static/specs-gen.json", JSON.stringify(jsonFile), (err) => {
    if (err) throw err;
    console.log("\x1b[34m%s\x1b[0m", "Tags generated: ", jsonFile.tags.length);
    console.log("\x1b[34m%s\x1b[0m", "Categories generated: ", jsonFile.categories.length);
    console.log("\x1b[34m%s\x1b[0m", "Specs generated: ", jsonFile.specs.length);
    console.log("\x1b[32m%s\x1b[0m", "Successfully generated specs to the ./static directory");
  })
  
});



