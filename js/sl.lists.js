
/*******************************************************************************
 * Lists
 ******************************************************************************/
SL.Lists = {
  elm : $id("lists"),
  name: "Lists",
  nextView: "Items",
  store: DB_STORE_LISTS,
  obj: {},
  loaded: false,
  init: function() {
    SL.view = this.name;
    SL.show("lists");

    //Check install button
    if (typeof navigator.mozApps != "undefined") {
      var request = navigator.mozApps.checkInstalled(MANIFEST);
      request.onsuccess = function() {
        // If the App is not installed
        if (request.result == null) {
          $id("install").style.display = "block";
        }
      }
    }
  },
  close: function() {
    SL.view = "";
    SL.hide("lists");
  },
  add: function(aList) {
    DB.store(aList, this);
    SL.display(aList, this);
    this.updateUI();
  },
  new: function() {
    var name = $id('listName').value;
    $id('listName').value = "";
    var date = new Date();

    // Remove line-endings
    name = name.replace(/(\r\n|\n|\r)/gm,"");
    if (!name || name === undefined) {
      SL.displayStatus("msg-name");
      return;
    }
    SL.Lists.add({ guid: SL.guid(),
                   name: name,
                   date: date.getTime(),
                   items:{}
    });
  },
  edit: function (aList, elm) {
    aList.done = elm.getElementsByTagName("input")[0].checked;
    aList.name = elm.getElementsByTagName("a")[0].textContent;

    // Delete the list, add the updated one
    DB.deleteFromDB(aList.guid, this);
    DB.store(aList, this);
  },
  display: function(aList) {
    SL.display(aList, this);
  },

  // Update displayed list after all view.obj were populated
  updateUI: function() {
    if (!SL.Lists.loaded) {
      SL.Lists.loaded = true;
      this.init();
    }

    // Set the view only if it is currently open
    if (this.elm.style.display == "block") {
      SL.view = this.name;
    }
    SL.clear();

    // For each list, count items and calculate total
    for(var aList in this.obj) {
      var total = 0;
      var nb = 0;

      // Display it
      SL.display(this.obj[aList], this);
      for(var aItem in SL.Items.obj) {
        if (SL.Items.obj[aItem].list == aList) {
          nb += parseInt(SL.Items.obj[aItem].nb);
          if (typeof SL.Items.obj[aItem].price != "undefined") {
            total += parseFloat(SL.Items.obj[aItem].price * SL.Items.obj[aItem].nb);
          }
        }
      }
      // Get nodes
      var elm = this.elm.querySelector('li[data-listkey="'+aList+'"]');
      elm = elm.getElementsByTagName("p")[1];
      var elmCount = elm.getElementsByTagName("a")[0];
      var elmTotal = elm.getElementsByTagName("a")[1];

      // Set items count
      elmCount.setAttribute("data-l10n-id", "nb-items");
      elmCount.setAttribute("data-l10n-args", '{"n":'+nb+'}');
      elmCount.textContent = _("nb-items", {"n":nb});

      // Display total with the right currency at the right position
      SL.setPrice(elmTotal, "total-list", total);
    }
  }
};
