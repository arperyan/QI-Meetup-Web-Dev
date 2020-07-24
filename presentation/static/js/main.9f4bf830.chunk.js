(this["webpackJsonpspectacle-tutorial"]=this["webpackJsonpspectacle-tutorial"]||[]).push([[0],{24:function(e,n,t){e.exports=t(54)},29:function(e,n,t){},54:function(e,n,t){"use strict";t.r(n);var a=t(0),l=t.n(a),r=t(14),o=t.n(r),i=(t(29),{colors:{primary:"white",secondary:"#26a0a7"},fonts:{header:'"Helvetica Neue", Helvetica, Arial, sans-serif'},fontSizes:{h1:"82px",h2:"64px",h3:"52px",bodyCopy:"28px"},size:{maxCodePaneHeight:480}}),c=t(1),s=function(){return l.a.createElement(c.f,{justifyContent:"space-between",position:"absolute",bottom:0,width:1},l.a.createElement(c.b,{padding:"0 1em"},l.a.createElement(c.g,null)),l.a.createElement(c.b,{padding:"1em"},l.a.createElement(c.p,null)))},m="url(./img/pic.jpg)",u="./img/confused.png",p="./img/CreateMashup.png",d="./img/Mashup.png",E="./img/url.jpg",h="./img/ID.jpg",f=Object(c.y)('\nconst appId = "<id>" /// eg. Cars.qvf ;\n\nlet config = {\n  host: "localhost", /// eg. or your url\n  prefix: "/", // eg. "/abc/" forQSE\n  port: "4848", // eg. "443" for QSE\n  isSecure: window.location.protocol === "https:"\n};\n\nconst URL_BASE =  \n  (config.isSecure ? "https://" : "http://") +\n  config.host +\n  (config.port ? ":" + config.port : "") +\n  config.prefix +\n  "resources";\n\nrequire.config({\n  baseUrl: URL_BASE, /// provided above\n  paths: {\n    "js/qlik": URL_BASE + "/js/qlik",\n  },\n  config: {\n    text: {\n      useXhr() {\n        return true;\n      },\n      createXhr: function () {\n        const Xhr = new XMLHttpRequest();\n        Xhr.withCredentials = true;\n        return Xhr;\n      },\n    },\n  },\n});\n\nrequire(["js/qlik"], function (qlik) {\n  var app = qlik.openApp(appId, config);\n\n  ///---- works in QSE and dev-hub\n  qlik.theme.apply("themeDark").then(function (result) {});\n\n  app.getObject("barchart","EjmXZVz")\n  \n});\n\n\n///----------------  Add to the index.html file\n<link rel="stylesheet" href="<your url eg. localhost:4848>/resources/autogenerated/qlik-styles.css">\n<script src="<your url eg. localhost:4848>/resources/assets/external/requirejs/require.js"><\/script>\n<script src="<location><scriptname>.js"><\/script>\n'),g=Object(c.y)('\n//------- qApp.js\nlet allResources;\n\nconst resources = async () => {\n  if (allResources) {\n    await allResources;\n    return;\n  }\n\n  const SCRIPT = document.createElement("script");\n  SCRIPT.type = "text/javascript";\n  SCRIPT.src = URL_BASE + "/assets/external/requirejs/require.js";\n  document.head.appendChild(SCRIPT);\n  SCRIPT.loaded = new Promise((resolved) => (SCRIPT.onload = () => resolved()));\n\n  const LINK = document.createElement("link");\n  LINK.rel = "stylesheet";\n  LINK.href = URL_BASE + "/autogenerated/qlik-styles.css";\n  document.head.appendChild(LINK);\n  LINK.loaded = new Promise((resolved) => {\n    LINK.onload = () => resolved();\n  });\n\n  allResources = Promise.all([SCRIPT.loaded, LINK.loaded]);\n  await allResources;\n};\n\nconst qApp = async () => {\n  await resources();\n\n  window.require.config({\n    baseUrl: URL_BASE,\n    paths: {\n      "js/qlik": URL_BASE + "/js/qlik",\n    },\n    config: {\n      text: {\n        useXhr() {\n          return true;\n        },\n        createXhr: function () {\n          const Xhr = new XMLHttpRequest();\n          Xhr.withCredentials = true;\n          return Xhr;\n        },\n      },\n    },\n  });\n\n  return new Promise((resolve) => {\n    window.require(["js/qlik"], (qlik) => {\n      let app = qlik.openApp(configEnv.app.id, config);\n\n      resolve(app);\n    });\n  });\n};\n\nexport default qApp;\n\n\n///-------------- App.js \nimport React, { useEffect, useState } from "react";\n\nimport qApp from "./qApp";\nimport BarChart from "./components/barchart";\n\nimport "./App.css";\n\nconst App = () => {\n  const [qlik, setQlik] = useState(); ///Returns a stateful value\n  useEffect(() => { ////run after the render is committed to the screen.\n    const render = async () => {\n      const app = await qApp();\n      setQlik(app);\n    };\n    render();\n  }, []);\n\n  return (\n    <div className="main">\n      <BarChart app={qlik} />\n    </div>\n  );\n};\n\nexport default App;\n\n///-----------------------Bar chart component\nimport React, { useEffect } from "react";\n\nconst Barchart = ({ app }) => {\n  useEffect(() => {\n    if (!app) return;\n    app.getObject("barchart", "EjmXZVz");\n  }, [app]);\n\n  return <div style={{ height: 300, width: 700 }} id="barchart" />;\n};\n\nexport default Barchart;\n'),b=Object(c.y)('\n  (async () => {\n  const data = await (\n    await \n    fetch(\n    "https://unpkg.com/enigma.js@2.7.0/schemas/12.612.0.json")\n  ).json();\n\n  const appId = "<app name>";\n\n  ///------------------------Integrate to QCS\n  // const appId = "10b52015-0c1d-461a-a75b-c919b12738df";\n  // const webIntegrationId = "EVJqMEB5nT6DAEoMCUdoy2tfNKkE82XF";\n  // const res = await request("/api/v1/csrf-token", false);\n  // const csrfToken = res.headers.get("qlik-csrf-token");\n\n  // async function request(path, returnJson = true) {\n  //   const res = await fetch("https://playbox.eu.qlikcloud.com/path", {\n  //     mode: "cors",\n  //     credentials: "include",\n  //     redirect: "follow",\n  //     headers: {\n  //       // web integration is sent as a header:\n  //       "qlik-web-integration-id": webIntegrationId,\n  //     },\n  //   });\n  //   return returnJson ? res.json() : res;\n  // }\n  //---------------------------------------------------------------\n  picasso.use(picassoQ);\n\n  let config = {\n    schema: data,\n    url: "ws://localhost:4848/app/<appId>",\n    ///url: "wss://<QSC>/app/<appid>\n    //?qlik-web-integration-id=webIntegrationId&qlik-csrf-token=csrfToken",\n  };\n\n  ///---- HyperCube Def\n  let barDef = {\n    qInfo: {\n      qType: "Bar Chart",\n    },\n    qHyperCubeDef: {\n      qDimensions: [\n        {\n          qDef: {\n            qFieldDefs: ["Country"],\n            qSortCriterias: [\n              {\n                qSortByAscii: 1, //sort alphabetically ASC\n              },\n            ],\n          },\n        },\n      ],\n      qMeasures: [\n        {\n          qDef: {\n            qDef: "=Avg(Weight)",\n          },\n          qSortby: {\n            qSortByNumeric: -1, //sort by value DESC\n          },\n        },\n      ],\n      qInitialDataFetch: [\n        {\n          qTop: 0,\n          qLeft: 0,\n          qWidth: 2,\n          qHeight: 50,\n        },\n      ],\n      qInterColumnSortOrder: [1, 0],\n    },\n  };\n\n  let session = enigma.create(config);\n\n  (async () => {\n    const qlik = await session.open();\n    const app = await qlik.openDoc(appId);\n    let objModel = await app.createSessionObject(barDef);\n\n    renderBar("barchart", objModel);\n    objModel.addListener("changed", () => renderBar("barchart", objModel));\n    window.addEventListener("resize", () => renderBar("barchart", objModel));\n  })();\n\n  const renderBar = async (element, model) => {\n    let layout = await model.getLayout();\n    console.log(layout);\n    let chart = picasso({\n      renderer: {\n        prio: ["svg"],\n      },\n    }).chart({\n      element: document.getElementById(element),\n    });\n    console.log(chart);\n    console.log(document.getElementById(element));\n    chart.update({\n      data: {\n        key: "qlik",\n        type: "q",\n        data: layout.qHyperCube,\n      },\n\n      settings: {\n        scales: {\n          y: {\n            data: { field: "qMeasureInfo/0" },\n            invert: true,\n            include: [0],\n          },\n          c: {\n            data: { field: "qMeasureInfo/0" },\n            type: "color",\n          },\n          t: {\n            data: { extract: { field: "qDimensionInfo/0" } },\n            padding: 0.3,\n          },\n        },\n        components: [\n          {\n            type: "axis",\n            dock: "left",\n            scale: "y",\n          },\n          {\n            type: "axis",\n            dock: "bottom",\n            scale: "t",\n          },\n          {\n            key: "bars",\n            type: "box",\n            data: {\n              extract: {\n                field: "qDimensionInfo/0",\n                props: {\n                  start: 0,\n                  end: { field: "qMeasureInfo/0" },\n                },\n              },\n            },\n            settings: {\n              major: { scale: "t" },\n              minor: { scale: "y" },\n              box: {\n                fill: { scale: "c", ref: "end" },\n              },\n            },\n          },\n        ],\n      },\n    });\n  };\n})();'),k=Object(c.y)('\nimport enigma from "enigma.js";\nimport usePromise from "react-use-promise";\nimport { configEnv, config } from "./config";\nimport BarChart from "./BarChart";\n\nconst useGlobal = (session) => usePromise(() => session.open(), [session]);\n\nconst useSessionApp = (global) => {\n  const [sessionApp] = usePromise(async () => {\n    if (!global) return null;\n    const app = await global.openDoc(configEnv.app.id);\n    return app;\n  }, [global]);\n  return sessionApp;\n};\n\nfunction App() {\n  const session = useMemo(() => enigma.create(config), []);\n  const [global] = useGlobal(session);\n  const app = useSessionApp(global);\n\n  return (\n    <div className="App">\n      <header className="App-header"></header>\n      <BarChart app={app} />\n    </div>\n  );\n}\n\nexport default App;\n\n///------Barchart.jsx\nimport React, { useEffect, useRef } from "react";\nimport picasso from "picasso.js";\nimport picassoQ from "picasso-plugin-q";\nimport { useModel, useLayout, usePicasso } from "hamus.js";\n\nimport { barDef } from "./data";\nimport { settings } from "./settings";\n\npicasso.use(picassoQ);\n\nconst BarChart = ({ app }) => {\n  const element = useRef(null);\n  const [barModel] = useModel(app, barDef);\n  const [barLayout] = useLayout(barModel);\n\n  const pic = usePicasso(element, settings, barLayout);\n\n  useEffect(() => {\n    if (!app && !pic) return;\n    console.log(app);\n  }, [app, pic]);\n\n  return <div className="barchart" ref={element} />;\n};\n\nexport default BarChart;\n\n'),S="#4d6474",y=function(){return l.a.createElement(c.e,{theme:i,template:s,transitionEffect:"fade"},l.a.createElement(c.r,{transitionEffect:"fade",backgroundColor:S,backgroundImage:m,backgroundOpacity:"0.09"},l.a.createElement(c.f,{height:"100%",flexDirection:"column"},l.a.createElement(c.i,{margin:"0px",fontSize:"h1"},l.a.createElement("i",null,"My Journey")),l.a.createElement(c.i,{margin:"0px",fontSize:"h3"},"Mashups & Web Apps"),l.a.createElement(c.w,null,"Ryan Arpe"))),l.a.createElement(c.r,{transitionEffect:"slide",backgroundColor:S,backgroundImage:m,backgroundOpacity:"0.09"},l.a.createElement(c.i,null,"About Me"),l.a.createElement(c.x,{fontSize:32},l.a.createElement(c.l,null,"7 years Qlik experience"),l.a.createElement(c.l,null,"2 Years web experience specifically using the Qlik APIs"),l.a.createElement(c.l,null,"Currently a Senior Qlik Sense Developer at HSBC"),l.a.createElement(c.l,null,"Been using vanilla JavaScript, React.js and Svelte"))),l.a.createElement(c.r,{transitionEffect:"slide",backgroundColor:S,backgroundImage:m,backgroundOpacity:"0.09"},l.a.createElement(c.i,null,"Topic"),l.a.createElement(c.o,{fontSize:32},l.a.createElement(c.a,null,l.a.createElement(c.l,null,"Training with Nick Webster and Websy Academy")),l.a.createElement(c.a,{elementNum:0},l.a.createElement(c.l,null,"First experience with Mashups")),l.a.createElement(c.a,{elementNum:1},l.a.createElement(c.l,null,"Created a Web App using JavaScript")),l.a.createElement(c.a,{elementNum:2},l.a.createElement(c.l,null,"Created a Web App using React.js")),l.a.createElement(c.a,{elementNum:3},l.a.createElement(c.l,null,"What am I currently using and the future")))),l.a.createElement(c.r,{transitionEffect:"slide",backgroundColor:S},l.a.createElement(c.f,{height:"100%"},l.a.createElement(c.i,null,"So, where to start...."),l.a.createElement(c.j,{src:u,width:500}))),l.a.createElement(c.r,{transitionEffect:"slide",backgroundColor:S,backgroundImage:m,backgroundOpacity:"0.09"},l.a.createElement(c.i,null,"Install NodeJS and NPM"),l.a.createElement(c.o,{fontSize:32},l.a.createElement(c.a,null,l.a.createElement(c.l,null,"Navigate to https://nodejs.org/en/download/ - includes NPM")),l.a.createElement(c.a,{elementNum:0},l.a.createElement(c.l,null,"Verify Installation by going to CMD")),l.a.createElement(c.a,{elementNum:1},l.a.createElement(c.l,null,"Type node \u2013v and npm -v")),l.a.createElement(c.a,{elementNum:2},l.a.createElement(c.l,null,"If NPM doesn't work, then add the npm location in the Environment Variables in System Properties")),l.a.createElement(c.a,{elementNum:3},l.a.createElement(c.l,null,"To use in VSC, press Ctrl+Shift+P and type Select Default Shell - Select Command Prompt")))),l.a.createElement(c.r,{transitionEffect:"slide",backgroundColor:S,backgroundImage:m,backgroundOpacity:"0.09"},l.a.createElement(c.i,null,"Mashups vs Web apps"),l.a.createElement(c.h,{gridTemplateColumns:"1fr 1fr",gridColumnGap:15},l.a.createElement(c.x,{fontSize:32},l.a.createElement(c.a,null,l.a.createElement(c.l,null,"Mashups use the Qlik Capability APIs")),l.a.createElement(c.a,{elementNum:0},l.a.createElement(c.l,null,"Internal AngularJS and RequireJS interact with the web app")),l.a.createElement(c.a,{elementNum:1},l.a.createElement(c.l,null,"Embed Qlik native visualization")),l.a.createElement(c.a,{elementNum:2},l.a.createElement(c.l,null,l.a.createElement(c.k,{fontSize:32,margin:0,href:"https://help.qlik.com/en-US/sense-developer/June2020/Subsystems/APIs/Content/Sense_ClientAPIs/capability-apis-reference.htm"},"Capability APIs Link")))),l.a.createElement(c.x,{fontSize:32},l.a.createElement(c.a,{elementNum:3},l.a.createElement(c.l,null,"Web apps use the Engine APIs")),l.a.createElement(c.a,{elementNum:4},l.a.createElement(c.l,null,"EngimaJS communicates with the Qlik QIX Engine via a WebSocket")),l.a.createElement(c.a,{elementNum:5},l.a.createElement(c.l,null,"Create any visualization using any framework")),l.a.createElement(c.a,{elementNum:6},l.a.createElement(c.l,null,l.a.createElement(c.k,{fontSize:32,margin:0,href:"https://help.qlik.com/en-US/sense-developer/February2019/apis/EngineAPI/index.html"},"Engine APIs Link"))),l.a.createElement(c.a,{elementNum:7},l.a.createElement(c.l,null,"NebulaJS......use native and any framework \ud83c\udf89"))))),l.a.createElement(c.r,{transitionEffect:"slide",backgroundColor:S},l.a.createElement(c.h,{gridTemplateRows:"1fr"},l.a.createElement(c.i,null,"Capabilities - Dev Hub")),l.a.createElement(c.h,{gridTemplateRows:"1fr 1fr",gridTemplateColumns:"1fr 1fr",gridColumnGap:15},l.a.createElement(c.j,{src:p,width:500}),l.a.createElement(c.j,{src:d,width:600,height:500}))),l.a.createElement(c.r,{transitionEffect:"slide",backgroundColor:S},l.a.createElement(c.i,null,"Capabilities - JavaScript"),l.a.createElement(c.s,{defaultValue:[1,1],values:[[3,8],[17,34],[36,51],[37,37],[40,40],[42,42],[48,50]]},(function(e,n){return l.a.createElement(c.h,{gridTemplateColumns:"1fr 1fr",gridColumnGap:15},l.a.createElement(c.b,{position:"relative"},l.a.createElement(c.c,{highlightStart:e[0],highlightEnd:e[1],fontSize:18,language:"cpp",autoFillHeight:!0},f),l.a.createElement(c.b,{position:"absolute",bottom:"0rem",left:"0rem",right:"0rem",bg:"black"})),l.a.createElement(c.b,null,n>=-1&&n<4&&l.a.createElement(c.x,{fontSize:32},l.a.createElement(c.a,null,l.a.createElement(c.l,null,'Provide the App ID - "Name" Desktop or "ID" QSE and QSC'),l.a.createElement(c.b,{bottom:"0rem",left:"0rem",right:"0rem",marginTop:"10px"},l.a.createElement(c.j,{src:E,width:500}))),l.a.createElement(c.a,{elementNum:0},l.a.createElement(c.l,null,"Define the actual Qlik engine connection")),l.a.createElement(c.a,{elementNum:1},l.a.createElement(c.l,null,"Define where the Qlik Sense client side software should be loaded from")),l.a.createElement(c.a,{elementNum:2},l.a.createElement(c.l,null,"RequireJS is used as a module loader")),l.a.createElement(c.a,{elementNum:3},l.a.createElement(c.l,null,"Connect to the App"))),n>3&&l.a.createElement(c.x,{fontSize:32},l.a.createElement(c.a,{elementNum:3},l.a.createElement(c.l,null,"Apply a theme - doesn't work using Desktop")),l.a.createElement(c.a,{elementNum:5},l.a.createElement(c.l,null,'Use the id="barchart" in the div tag and the object ID provided by Qlik Sense by qlik',l.a.createElement(c.b,{bottom:"0rem",left:"0rem",right:"0rem",marginTop:"10px"},l.a.createElement(c.j,{src:h,width:300})))),l.a.createElement(c.a,{elementNum:6},l.a.createElement(c.l,null,"Add to the index.html file")))))}))),l.a.createElement(c.r,{transitionEffect:"slide",backgroundColor:S},l.a.createElement(c.i,null,"Capabilities - ReactJS"),l.a.createElement(c.s,{defaultValue:[2,59],values:[[52,52],[63,87],[71,78],[82,82],[90,101],[95,95]]},(function(e,n){return l.a.createElement(c.h,{gridTemplateColumns:"1fr 1fr",gridColumnGap:15},l.a.createElement(c.b,{position:"relative"},l.a.createElement(c.c,{highlightStart:e[0],highlightEnd:e[1],fontSize:18,language:"cpp",autoFillHeight:!0},g),l.a.createElement(c.b,{position:"absolute",bottom:"0rem",left:"0rem",right:"0rem",bg:"black"})),l.a.createElement(c.b,null,l.a.createElement(c.x,{fontSize:32},l.a.createElement(c.a,null,l.a.createElement(c.l,null,"Similar setup as previous example, but save it in a separate file eg. qApp.js")),l.a.createElement(c.a,{elementNum:0},l.a.createElement(c.l,null,"Importing the config.js with ID and config values")),l.a.createElement(c.a,{elementNum:2},l.a.createElement(c.l,null,"Use hooks to connect to the Qlik app")),l.a.createElement(c.a,{elementNum:3},l.a.createElement(c.l,null,"Add the updated state to the Barchart component")),l.a.createElement(c.a,{elementNum:5},l.a.createElement(c.l,null,"Use app to get the object")))))}))),l.a.createElement(c.r,{transitionEffect:"slide",backgroundColor:S},l.a.createElement(c.i,null,"Engine - JavaScript"),l.a.createElement(c.s,{defaultValue:[2,6],values:[[10,28],[29,29],[39,76],[78,89],[83,83],[86,87],[90,91],[103,107],[112,112],[121,121]]},(function(e,n){return l.a.createElement(c.h,{gridTemplateColumns:"1fr 1fr",gridColumnGap:15},l.a.createElement(c.b,{position:"relative"},l.a.createElement(c.c,{highlightStart:e[0],highlightEnd:e[1],fontSize:18,language:"cpp",autoFillHeight:!0},b),l.a.createElement(c.b,{position:"absolute",bottom:"0rem",left:"0rem",right:"0rem",bg:"black"})),l.a.createElement(c.b,null,n>=-1&&n<5&&l.a.createElement(c.x,{fontSize:32},l.a.createElement(c.a,null,l.a.createElement(c.l,null,"Fetch data from engima which provides the APIs")),l.a.createElement(c.a,{elementNum:0},l.a.createElement(c.l,null,"Code to connect to QSC")),l.a.createElement(c.a,{elementNum:1},l.a.createElement(c.l,null,"Use Picasso and PicassoQ")),l.a.createElement(c.a,{elementNum:2},l.a.createElement(c.l,null,"Create a HyperCube")),l.a.createElement(c.a,{elementNum:3},l.a.createElement(c.l,null,"Create a session using EngimaJS using the config")),l.a.createElement(c.a,{elementNum:4},l.a.createElement(c.l,null,"Create a Session Object using barDef (hypercubeDef)"))),n>3&&l.a.createElement(c.x,{fontSize:32},l.a.createElement(c.a,{elementNum:5},l.a.createElement(c.l,null,"Add an Event Lister so it re-renders on resize and on change")),l.a.createElement(c.a,{elementNum:6},l.a.createElement(c.l,null,"In renderBar function use model to get the layout - data")),l.a.createElement(c.a,{elementNum:7},l.a.createElement(c.l,null,"Add the data to Picasso")),l.a.createElement(c.a,{elementNum:8},l.a.createElement(c.l,null,"Add the standard Picasso")),l.a.createElement(c.a,{elementNum:8},l.a.createElement(c.l,null,"Add the Dimension and Measure values")))))}))),l.a.createElement(c.r,{transitionEffect:"slide",backgroundColor:S},l.a.createElement(c.i,null,"Engine - ReactJS"),l.a.createElement(c.s,{defaultValue:[1,4],values:[[6,7],[8,15],[18,21],[25,25],[33,37],[36,36],[45,49],[50,54]]},(function(e,n){return l.a.createElement(c.h,{gridTemplateColumns:"1fr 1fr",gridColumnGap:15},l.a.createElement(c.b,{position:"relative"},l.a.createElement(c.c,{highlightStart:e[0],highlightEnd:e[1],fontSize:18,language:"cpp",autoFillHeight:!0},k),l.a.createElement(c.b,{position:"absolute",bottom:"0rem",left:"0rem",right:"0rem",bg:"black"})),l.a.createElement(c.b,null,l.a.createElement(c.x,{fontSize:32},l.a.createElement(c.a,null,l.a.createElement(c.l,null,"Import various libraries/component")),l.a.createElement(c.a,{elementNum:0},l.a.createElement(c.l,null,"Create Hooks")),l.a.createElement(c.a,{elementNum:2},l.a.createElement(c.l,null,"The Hooks are used to create the Session App")),l.a.createElement(c.a,{elementNum:3},l.a.createElement(c.l,null,"Add the app to the Barchart component")),l.a.createElement(c.a,{elementNum:4},l.a.createElement(c.l,null,"Use the HamusJS Hooks to get the model, layout and to create a Picasso chart")),l.a.createElement(c.a,{elementNum:7},l.a.createElement(c.l,null,"UseEffect to wait for app and usePicasso")))))}))),l.a.createElement(c.r,{transitionEffect:"slide",backgroundColor:S,backgroundImage:m,backgroundOpacity:"0.09"},l.a.createElement(c.i,null,"Useful Links"),l.a.createElement(c.x,{fontSize:32},l.a.createElement(c.l,null,l.a.createElement(c.k,{fontSize:32,margin:0,href:"https://websy.academy/"},"Websy Academy")),l.a.createElement(c.l,null,l.a.createElement(c.k,{fontSize:32,margin:0,href:"https://github.com/qlik-oss/hamus.js/tree/master/example"},"HamusJS example")),l.a.createElement(c.l,null,l.a.createElement(c.k,{fontSize:32,margin:0,href:"https://qlik.dev/"},"Developers Portal")),l.a.createElement(c.l,null,l.a.createElement(c.k,{fontSize:32,margin:0,href:"https://github.com/websy85/qlik-sso-enigmajs"},"Nick Webster JavaScript example")),l.a.createElement(c.l,null,l.a.createElement(c.k,{fontSize:32,margin:0,href:"https://sstoichev.eu/p/e487aba2-192f-4457-ad48-175247d0014c/"},"EngimaJS - mixins")))),l.a.createElement(c.r,{transitionEffect:"slide",backgroundColor:S,backgroundImage:m,backgroundOpacity:"0.09"},l.a.createElement(c.i,null,"Exercise - use NodeJS to run these slides"),l.a.createElement(c.w,null,l.a.createElement("i",null,"hint: npm start"))),l.a.createElement(c.r,{transitionEffect:"slide",backgroundColor:S,backgroundImage:m,backgroundOpacity:"0.09"},l.a.createElement(c.i,null,"Thank you!")))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(y,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[24,1,2]]]);
//# sourceMappingURL=main.9f4bf830.chunk.js.map