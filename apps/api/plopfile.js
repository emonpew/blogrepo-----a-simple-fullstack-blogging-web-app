// plopfile.js (still CommonJS)
module.exports = function (plop) {
  plop.setGenerator("express-route-ts", {
    description: "Generate TypeScript Express route",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Route name (e.g., user, auth):",
      },
      {
        type: "confirm",
        name: "addValidation",
        message: "Add validation?",
        default: true,
      },
    ],
    actions: (answers) => {
      const actions = [
        {
          type: "add",
          path: "src/routes/{{name}}.routes.ts",
          templateFile: "plop-templates/route.hbs",
        },
        {
          type: "add",
          path: "src/controllers/{{name}}.controller.ts",
          templateFile: "plop-templates/controller.hbs",
        },
      ];
      if (answers.addValidation) {
        actions.push({
          type: "add",
          path: "src/validators/{{name}}.validator.ts",
          templateFile: "plop-templates/validator.hbs",
        });
        actions.push({
          type: "add",
          path: "src/types/{{name}}.type.ts",
          templateFile: "plop-templates/type.hbs",
        });
      }
      return actions;
    },
  });
};
