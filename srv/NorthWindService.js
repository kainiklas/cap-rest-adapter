const cds = require("@sap/cds");

module.exports = cds.service.impl(async function () {
  const { Categories } = this.entities;
  const service = await cds.connect.to("NorthWind");

  this.on("READ", Categories, async (req) => {
    const categories = await service.tx(req).run(req.query);

    let transformedCategories;

    if (Array.isArray(categories)) {
      transformedCategories = transformObjectArray(categories);
    } else {
      transformedCategories = transformObject(categories);
    }

    return transformedCategories;
  });

  let transformObject = function (o) {
    let keys = Object.keys(o);
    var transformedObject = {};

    keys.forEach((key) => {
      transformedObject[key.toLowerCase()] = o[key];
    });

    return transformedObject;
  };

  let transformObjectArray = function (arr) {
    let transArr = [];
    arr.forEach((o) => {
      transArr.push(transformObject(o));
    });

    return transArr;
  };
});
