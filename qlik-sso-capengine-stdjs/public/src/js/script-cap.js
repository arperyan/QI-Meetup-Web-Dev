const appId = "Cars.qvf";

let config = {
  host: "localhost",
  prefix: "/", //this should be the name of the virtual proxy. For example "/nodeexample/"
  port: "4848", //as of Sense version 2.0 this should be a string not an integer   ----443 for QE
  isSecure: window.location.protocol === "https:",
  rejectUnauthorized: false,
};

const URL_BASE =
  (config.isSecure ? "https://" : "http://") +
  config.host +
  (config.port ? ":" + config.port : "") +
  config.prefix +
  "resources";

require.config({
  baseUrl: URL_BASE,
  paths: {
    "js/qlik": URL_BASE + "/js/qlik",
  },
  config: {
    text: {
      useXhr() {
        return true;
      },
      createXhr: function () {
        const Xhr = new XMLHttpRequest();
        Xhr.withCredentials = true;
        return Xhr;
      },
    },
  },
});

require(["js/qlik"], function (qlik) {
  var app = qlik.openApp(appId, config);

  console.log(app);

  qlik.theme.apply("themeDark").then(function (result) {
    console.log("theme applied with result: " + result);
  });

  app.visualization
    .create("barchart", ["Country", "=Avg(Weight)"], {
      title: "Bar Chart",
    })
    .then(function (viz) {
      viz.show("barchart");
    });

  app.clearAll();
});
