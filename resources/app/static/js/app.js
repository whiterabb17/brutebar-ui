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
          app.addLog("okay")
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
    a.style = "color:red";
    let b = document.createElement("a");
    b.text = log;
    b.style = "color:white";
    let span = document.createElement("span");
    span.style = "white-space:pre;display:block;"
    span.append(a);
    span.innerHTML = "&emsp;&emsp;"
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
          break;
        case "initokay":
          app.addLog("Initialized Successfully");
          asticode.notifier.success("Initialized Successfully");
          break;
        case "log":
          app.addLog(message.payload);
          break;
        case "valuesrequired":
          app.addLog("Required values for the attack are missing");
          break;
        case "result":
          app.addLog(message.payload);
          break;
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
  // Bind to UI events using jQuery
  bindEvents: function () {
    $("#start_stop").bind("click", function (e) { });

    $(".header-button.settings").bind("click", function () {
      app.loadSettings();
    });
    $(".header-button.help").bind("click", function () {
      $("#help").toggleClass("dn");
    });
    $(".header-button.minimize").bind("click", function () {
      remote.getCurrentWindow().minimize();
    });
    $(".header-button.exit").bind("click", function () {
      remote.getCurrentWindow().close();
    });

    $(document).on("click", "#change_pool", function () {
      app.loadSettings();
    });

    // TODO: Part of the show more pools hack
    $(document).on("click", "#show_pool_list", function () {
      $(this).hide();
      $("#pool_list_bottom").slideDown();
    });

    $(".close-settings").bind("click", function () {
      $("#settings").toggleClass("dn");
    });

    $(".close-help").bind("click", function () {
      $("#help").toggleClass("dn");
    });

    $(document).on("click", ".pool", function () {
      $(".pool").removeClass("selected");
      $(this).addClass("selected");
    });

    $("#update").bind("click", function () {
      var configData = {
        address: $("#settings_mining_address").val(),
        pool: $("#pool_list").find(".selected").data("id"),
        threads: parseInt($("#threads option:selected").attr("value")),
        max_cpu: parseInt($("#max_cpu option:selected").attr("value")),
      };
      if (configData.address == "") {
        alert("You must enter your address");
        return false;
      }
      // Just make sure they're not using integrated addresses or
      // invalid ones
      if (shared.validateWalletAddress(configData.address) == false) {
        alert("Please enter a valid Torque address starting with 'Se' or 'SE'");
        return false;
      }

      $("#update").html("Updating...");
      astilectron.sendMessage(
        { name: "reconfigure", payload: configData },
        function (message) {
          $(".current .pool h3").html("Updating...");
          $("#settings").toggleClass("dn");
          $("#update").html("Update");
          $("#miner_address").html("Updating");
          app.resetMinerStats();
          asticode.notifier.success("Miner reconfigured");
        }
      );
    });
  },
};
