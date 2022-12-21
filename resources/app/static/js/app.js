/*
  This handles the miner
 */
let app = {
  init: function () {
    asticode.loader.init();
    asticode.modaler.init();
    asticode.notifier.init();

    shared.bindExternalLinks();
    //   app.setupChart();

    if (shared.isMac()) {
      $(".minimize").hide();
      $(".exit").hide();
      $(".settings").css("right", "15px");
      $(".help").css("right", "45px");
    }

    // Wait for the ready signal
    document.addEventListener("astilectron-ready", function () {
      // Start the miner on start
      astilectron.sendMessage(
        {
          name: "start",
          payload: "",
        },
        function (message) {
          app.addLog("Initialized Successfully")
         }
      );
      //  app.bindEvents();
      app.listen();
    });
  },
  addLog: function (log) {
    console.log(log)
    let pane = document.getElementById("logspace");
    let div = document.createElement("div");
    let a = document.createElement("a");
    a.text = "Result: ";
    a.style = "color:#f79797;width:100px;padding-left: 15px;";
    let b = document.createElement("a");
    b.text = log;
    b.style = "color:white";
    let span = document.createElement("span");
    span.style = "white-space:pre;display:block;"
    span.append(a);
    span.append(b);
    div.append(span);
    pane.append(div);
    console.log("Logs added successfully");
  },
  addLogHtml: function (log) {
    console.log(log)
    let pane = document.getElementById("logspace");
    let div = document.createElement("div");
    let span = document.createElement("span");
    span.style = "white-space:pre;display:block;"
    span.innerHTML = log
    div.append(span);
    pane.append(div);
    console.log("Logs added successfully");
  },
  notify: function (html) {
    let c = document.createElement("div");
    c.innerHTML = html;
    asticode.modaler.setContent(c);
    asticode.modaler.show();
  },
  listen: function () {
    var errorCount = 0;
    astilectron.onMessage(function (message) {
      switch (message.name) {
        case "fatal_error":
          shared.showError(message.payload);
          app.addLog("Initialized Successfully");
          return { payload: "Recieved" };
        case "initokay":
          app.addLog("Initialized Successfully");
          asticode.notifier.success("Initialized Successfully");
          return { payload: "Recieved" };
        case "log":
          app.addLog(message.payload);
          return { payload: "Recieved" };
        case "valuesrequired":
          app.addLog("Required values for the attack are missing");
          return { payload: "Recieved" };
        case "result":
          app.addLog(message.payload);
          return { payload: "Recieved" };
        case "startedattack":
          asticode.notifier.success(ih)
          let pq = document.getElementById("protoheader")
          app.addLog("Started " + pq + " attack successfully");
          var parsed = message.payload;
          console.log(parsed);
          let ih ="Started " + pq + " Attack";
          app.addLog(ih);
          return { payload: "Recieved" };
        case "stoppedattack":
          let d = document.getElementById("protoheader").value;
          app.addLog("Stopped " + d + " attack");
          var parsed = message.payload;
          console.log(parsed);
          let pa = document.createElement("div");
          pa.innerHTML =
            '<h2 style="color:maroon">STRONGARM</h2>' +
            "<p>Stopped " +
            d +
            " Attack</p>" +
            "</div>";
          asticode.modaler.setContent(pa);
          asticode.modaler.show();
          return { payload: "Recieved" };
        case "jlog":
          var parsed = JSON.parse(message.payload);
          parsed.forEach((element) => {
            app.addLog(element);
          });
          break;
        case "annhtml":
            var parsed = message.payload;
            let html2 = "<h2>NOTICE</h2>" +
            "<div>" +
            message.payload +
            "</div>";
            console.log(parsed);
            let annDiv2 = document.createElement("div");
            annDiv.innerHTML = html2;
            asticode.modaler.setContent(annDiv2);
            app.addLog(message.payload)
            asticode.modaler.show();
            return { payload: "Finally" };
        case "ann":
          var parsed = message.payload;
          let html = "<h2>NOTICE</h2>" +
          "<span>" +
          message.payload +
          "</span>" +
          "</div>";
          console.log(parsed);
          let annDiv = document.createElement("div");
          annDiv.innerHTML = html;
          asticode.modaler.setContent(annDiv);
          app.addLog(message.payload)
          asticode.modaler.show();
          return { payload: "Finally" };
      }
    });
  },
};
