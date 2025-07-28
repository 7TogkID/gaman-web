import { defineRoutes } from "@gaman/core/routes";

export default defineRoutes(() => ({
  "/": () => {
    return Res.render("index", {
      title: "GamanJS | Web Application Framework",
      year: new Date().getFullYear(),
    });
  },
}));
