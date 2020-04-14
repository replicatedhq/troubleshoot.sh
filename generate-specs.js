const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");
const uniqWith = require("lodash/uniqWith");
const isEqual = require("lodash/isEqual");
const specDir = "./analyzer-specs";

const tags = [];
const categories = [];
const specs = [];
const slugList = [];

function validateSlug(slug, file) {
  // Validate slug is unique
  if (slugList.includes(slug)) {
    throw new Error(`The slug ${slug} in ${file} already exists, slugs must be unique`);
  }
  slugList.push(slug);

  // Validate slug does not have underscores or spaces
  if (!slug.match("^[A-Za-z0-9-]*$")) {
    throw new Error(`The slug ${slug} can only contain letters, numbers and dashes`);
  }
}

function validateCategory(category, file) {
  // Validate category does not have dashes or spaces
  if (!category.match("^[A-Za-z_]*$")) {
    throw new Error(`The category ${category} in ${file} can only contain letters and underscores`);
  }
}

function validateTag(tag, file) {
  // Validate tag does not have underscores or spaces
  if (!tag.match("^[A-Za-z0-9-]*$")) {
    throw new Error(`The tag ${tag} in ${file} can only contain letters, numbers and dashes`);
  }
}

fs.readdir(specDir, (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    // Load YAML file contents
    const doc = yaml.safeLoad(fs.readFileSync(path.resolve(specDir, file)));
    
    // Add all tags from spec to the tags array (will be filtered later)
    doc.metadata.annotations.tags.map(tag =>  {
      validateTag(tag, file);
      tags.push(tag)
    });

    // Build and add a category object to the categories array (will be filtered later)
    validateCategory(doc.metadata.annotations.category, file);
    let categoryObj = new Object();
    categoryObj.name = doc.metadata.annotations.category;
    const displayName = doc.metadata.annotations.category.charAt(0).toUpperCase() + doc.metadata.annotations.category.slice(1);
    categoryObj.display = displayName.replace("_", " ");
    categories.push(categoryObj);
    
    const slug = doc.metadata.name;
    validateSlug(slug, file);
    
    const contributorsArr = []
    if (doc.metadata.annotations.contributors) {
      doc.metadata.annotations.contributors.map(c => {
        contributorsArr.push({
          name: c.name,
          avatarUri: c.avatarUri || "/default-contributor@2x.jpg"
        })
      })
    } else {
      contributorsArr.push({
        name: "",
        avatarUri: "/default-contributor@2x.jpg"
      })
    }

    // Build the spec object
    let specObj = new Object();
    specObj.slug = slug;
    specObj.category = doc.metadata.annotations.category;
    specObj.title = doc.metadata.annotations.title;
    specObj.description = doc.metadata.annotations.description;
    specObj.iconUri = doc.metadata.annotations.iconUri || "/category-icons/default-category.svg";
    specObj.contributors = contributorsArr;
    specObj.tags = doc.metadata.annotations.tags;

    // Remove annotations before setting the yaml spec
    delete doc["metadata"]["annotations"];
    specObj.specYaml = yaml.safeDump(doc);

    // Add spec to specs array
    specs.push(specObj);

  });

  // Build JSON file with filtered tags and categories
  const jsonFile = {
    _comment: `This file is generated! Last generated on ${new Date()}. To regenerate run 'make generate-specs'`,
    tags: [...new Set(tags)],
    categories: uniqWith(categories, isEqual),
    specs
  };

  // Write finalized JSON file to static directory
  fs.writeFile("./static/specs-gen.json", JSON.stringify(jsonFile), (err) => {
    if (err) throw err;
    console.log("\x1b[34m%s\x1b[0m", "Tags generated: ", jsonFile.tags.length);
    console.log("\x1b[34m%s\x1b[0m", "Categories generated: ", jsonFile.categories.length);
    console.log("\x1b[34m%s\x1b[0m", "Specs generated: ", jsonFile.specs.length);
    console.log("\x1b[32m%s\x1b[0m", "Successfully generated specs-gen.json to the ./static directory");
  });
  
});



