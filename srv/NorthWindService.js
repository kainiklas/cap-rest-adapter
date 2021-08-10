const cds = require("@sap/cds");
const objectMapper = require("object-mapper");

module.exports = cds.service.impl(async function () {
  const { Categories } = this.entities;
  const service = await cds.connect.to("NorthWind");

  this.on("READ", Categories, async (req) => {
    // ?pagesize instead of OData $top
    if (req.req.query.pageSize) {
      req.query.SELECT.limit.rows = { val: parseInt(req.req.query.pageSize) };
    }

    // ?offeset instead of OData $skip
    if (req.req.query.offset) {
      req.query.SELECT.limit.offset = { val: parseInt(req.req.query.offset) };
    }

    // execute the query
    const categories = await service.tx(req).run(req.query);

    // multiple objects
    if (Array.isArray(categories)) {
      return categories.map((o) => transformObject(o));
    }

    // one object
    //return transformObject(categories);
    return mapObject(categories);
  });

  let transformObject = function (o) {
    // add field
    o.New = "Some value";

    // remove field
    delete o.Picture;

    // change field
    o.Description = "Legacy: " + o.Description;

    return o;
  };

  let mapObject = function (o) {
    let map = {
      CategoryID: "wrapper.categories.id",
      CategoryName: "wrapper.categories.name",
    };

    return objectMapper(o, map);
  };
});
