// get the schema for enigma
// get the schema for enigma
(async () => {
  const data = await (
    await fetch("https://unpkg.com/enigma.js@2.7.0/schemas/12.612.0.json")
  ).json();

  const appId = "Cars.qvf";

  ///------------------------Integrate to QCS
  // const appId = "10b52015-0c1d-461a-a75b-c919b12738df";
  // const webIntegrationId = "EVJqMEB5nT6DAEoMCUdoy2tfNKkE82XF";
  // const res = await request("/api/v1/csrf-token", false);
  // const csrfToken = res.headers.get("qlik-csrf-token");

  // async function request(path, returnJson = true) {
  //   const res = await fetch(`https://playbox.eu.qlikcloud.com/${path}`, {
  //     mode: "cors",
  //     credentials: "include",
  //     redirect: "follow",
  //     headers: {
  //       // web integration is sent as a header:
  //       "qlik-web-integration-id": webIntegrationId,
  //     },
  //   });
  //   return returnJson ? res.json() : res;
  // }
  //---------------------------------------------------------------

  picasso.use(picassoQ);

  let config = {
    schema: data,
    url: `ws://localhost:4848/app/${appId}`,
    ///url: `wss://playbox.eu.qlikcloud.com/app/${appId}?qlik-web-integration-id=${webIntegrationId}&qlik-csrf-token=${csrfToken}`,
  };

  let barDef = {
    qInfo: {
      qType: "Bar Chart",
    },
    qHyperCubeDef: {
      qDimensions: [
        {
          qDef: {
            qFieldDefs: ["Country"],
            qSortCriterias: [
              {
                qSortByAscii: 1, //sort alphabetically ASC
              },
            ],
          },
        },
      ],
      qMeasures: [
        {
          qDef: {
            qDef: "=Avg(Weight)",
          },
          qSortby: {
            qSortByNumeric: -1, //sort by value DESC
          },
        },
      ],
      qInitialDataFetch: [
        {
          qTop: 0,
          qLeft: 0,
          qWidth: 2,
          qHeight: 50,
        },
      ],
      qInterColumnSortOrder: [1, 0],
    },
  };

  let session = enigma.create(config);

  (async () => {
    const qlik = await session.open();
    const app = await qlik.openDoc(appId);
    let objModel = await app.createSessionObject(barDef);

    // if (objModel) {
    console.log(objModel);
    renderBar("barchart", objModel);
    objModel.addListener("changed", () => renderBar("barchart", objModel));
    window.addEventListener("resize", () => renderBar("barchart", objModel));
  })();

  const renderBar = async (element, model) => {
    let layout = await model.getLayout();
    console.log(layout);
    let chart = picasso({
      renderer: {
        prio: ["svg"],
      },
    }).chart({
      element: document.getElementById(element),
    });
    console.log(chart);
    console.log(document.getElementById(element));
    chart.update({
      data: {
        key: "qlik",
        type: "q",
        data: layout.qHyperCube,
      },

      settings: {
        scales: {
          y: {
            data: { field: "qMeasureInfo/0" },
            invert: true,
            include: [0],
          },
          c: {
            data: { field: "qMeasureInfo/0" },
            type: "color",
          },
          t: {
            data: { extract: { field: "qDimensionInfo/0" } },
            padding: 0.3,
          },
        },
        components: [
          {
            type: "axis",
            dock: "left",
            scale: "y",
          },
          {
            type: "axis",
            dock: "bottom",
            scale: "t",
          },
          {
            key: "bars",
            type: "box",
            data: {
              extract: {
                field: "qDimensionInfo/0",
                props: {
                  start: 0,
                  end: { field: "qMeasureInfo/0" },
                },
              },
            },
            settings: {
              major: { scale: "t" },
              minor: { scale: "y" },
              box: {
                fill: { scale: "c", ref: "end" },
              },
            },
          },
        ],
      },
    });
  };
})();
