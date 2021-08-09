# SAP CAP OData to REST Adapter

This project demonstrates how to use SAP CAP to provide custom REST Services based on existing OData services.

Reasons why you want or need to create such an adapter:

- Specific architecture requirements, e.g., harmonization of how services look like accross the enterprise
- Access a service using different URL patterns, i.e., `ressource/{id}` instead of `ressource('{id}')`
- Change structure and content of the payload, e.g., delete, add, change, rename, combine attributes
- Change the standard OData query paramater names, e.g., pagination with `?pageSize` and `?offset` instead of `$top` and `$skip`
- Reuse existing services without re-implementing them, e.g., OData services but also classic non-compliant REST or WS Services

It contains these folders and files, following our recommended project layout:

| File or Folder | Purpose                                               |
| -------------- | ----------------------------------------------------- |
| `srv/`         | exposed curstom REST service and transformation logic |
| `srv/external` | imported OData .edmx metadata                         |
| `package.json` | project metadata and configuration                    |
| `.cdsrc.json`  | service destination configuration                     |

## Run the Demo

- Open a new terminal and run `cds watch`
- Open <http://localhost:4004/northwind/Categories>

## Related Blog Post

- Insert Link here

## Learn More

Learn more at https://cap.cloud.sap/docs/get-started/.
