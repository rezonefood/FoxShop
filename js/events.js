

// Add the eventListeners to buttons, etc.
function addEventListeners() {


  /*****************************************************************************
   * Status
   ****************************************************************************/
  // Display a notification to the user during 3s
  SL.id("status").addEventListener("animationend", SL.hideStatus, false);


  /*****************************************************************************
   * Lists
   ****************************************************************************/
  // Add list when the user click the button…
  SL.id("add-list").addEventListener("click", function() {
    SL.Lists.new();
  });
  // …or if he hit enter key
  SL.id("listName").onkeyup = function (e) {
    if (e.keyCode == 13) {
      SL.Lists.new();
    }
  };

  // Button to clear the form
  SL.Lists.elm.querySelector('button[type="reset"]').addEventListener("click",
  function() {
      SL.id("listName").textContent = "";
  });

  // Button to cross out all the lists
  SL.Lists.elm.getElementsByClassName("icon-complete")[0].addEventListener("click",  function() {
    SL.completeall();
  });
   
  // Init event for edit view
  SL.Lists.elm.getElementsByClassName('edit')[0].addEventListener("click",
  function() {
    SL.editMode.init(SL.Lists);
    SL.hide("lists");
  });

  // Install the Web App
  SL.id('install').addEventListener('click', function(e){
    navigator.mozApps.install(MANIFEST).onsuccess = function () {
      SL.id("install").style.display = "none";
    };
  });

  // MoreItems
  SL.Lists.elm.getElementsByClassName("icon-more")[0].addEventListener("click",
  function() {
    SL.hide("lists");
    SL.show("moreLists");
  });

  // Settings
  SL.Lists.elm.getElementsByClassName("icon-settings")[0].addEventListener("click",
  function() {
    SL.Settings.openedFrom = SL.Lists.name;
    SL.hide("lists");
    SL.show("settingsPanel");
  });


  /*****************************************************************************
   * editMode
   ****************************************************************************/
  var header = SL.editMode.elm.getElementsByTagName("header")[0];

  // Close
  header.getElementsByTagName("button")[0].addEventListener("click", function() {
    SL.hide("editMode");
    SL.show(SL[SL.editMode.openedFrom].elm.id);
  });

  // Delete Selected
  header.getElementsByTagName("button")[1].addEventListener("click", function() {
    SL.editMode.deleteSelected();
  });

  var menu = SL.editMode.elm.getElementsByTagName("menu")[1];

  // Select All
  menu.getElementsByTagName("button")[0].addEventListener("click", function() {
    SL.editMode.selectAll();
  });
  // Deselect All
  menu.getElementsByTagName("button")[1].addEventListener("click", function() {
    SL.editMode.deselectAll();
  });


  /*****************************************************************************
   * Items
   ****************************************************************************/
  // Add item when the user click the button…
  SL.id("add-item").addEventListener("click", function() {
    SL.Items.new();
  });
  // …or if he hit enter key
  SL.id("itemName").onkeyup = function (e) {
    if (e.keyCode == 13) {
      SL.Items.new();
    }
  }
  SL.id("itemQty").onkeyup = function (e) {
    if (e.keyCode == 13) {
      SL.Items.new();
    }
  }

  // Button to clear the form
  SL.Items.elm.querySelector('button[type="reset"]').addEventListener("click",
  function() {
      SL.id("itemName").textContent = "";
      SL.id("itemQty").textContent = "1";
  });

  // Button to cross out all the items
  SL.Items.elm.getElementsByClassName("icon-complete")[0].addEventListener("click",  function() {
    SL.completeall();
  });

  // Display buttons
  SL.Items.elm.getElementsByClassName("back")[0].addEventListener("click",
  function() {
    SL.hide("items");
    SL.show("lists");
    SL.view = "Lists";
  });

  var send = SL.Items.elm.getElementsByClassName("send")[0];
  send.addEventListener("click", function() {
    SL.hide("items");
    SL.show("enterEmail");
  });

  // Init event for edit view
  SL.Items.elm.getElementsByClassName('edit')[0].addEventListener("click",
  function() {
    SL.hide("items");
    SL.editMode.init(SL.Items);
  });

  // MoreItems
  SL.Items.elm.getElementsByClassName("icon-more")[0].addEventListener("click",
  function() {
    SL.hide("items");
    SL.show("moreItems");
  });

  // Settings
  SL.Items.elm.getElementsByClassName("icon-settings")[0].addEventListener("click",
  function() {
    SL.Settings.openedFrom = SL.Items.name;
    SL.hide("items");
    SL.show("settingsPanel");
  });

  // Edit List name
  SL.id("editList").addEventListener("click", function() {
    SL.Items.openEditListName();
  });

  SL.id("saveList").addEventListener("click", function() {
    SL.Items.saveListName();
  });

  /*****************************************************************************
   * itemView
   ****************************************************************************/
  SL.ItemView.elm.getElementsByClassName("icon-back")[0].parentNode.addEventListener("click",
    function() {
      SL.hide("itemView");
      SL.show("items");
      SL.view = "Items";
    });

  SL.id("saveItem").addEventListener("click", function() {
      //Switch views
      SL.hide("itemView");
      SL.show("items");
      SL.view = "Items";
      SL.ItemView.save();
  });

  SL.id("alarm-delete").addEventListener("click",
    function() {
      SL.hide("itemView");
      SL.show("deleteItem");
    });

  SL.id("plusOne").addEventListener("click", function() {
    SL.ItemView.plusOne();
  });
  SL.id("lessOne").addEventListener("click", function() {
    SL.ItemView.lessOne();
  });


  /*****************************************************************************
   * deleteItem
   ****************************************************************************/

    SL.id("deleteItem").getElementsByTagName("button")[1].addEventListener("click",
    function() {
      var guid = SL.ItemView.item.guid;
      SL.hide("deleteItem");
      SL.removeElement(SL.Items.elm.querySelector('li[data-listkey="'+guid+'"]'));
      SL.show("items");
      DB.deleteFromDB(guid, SL.Items);
    });

    SL.id("deleteItem").getElementsByTagName("button")[0].addEventListener("click",
    function() {
      SL.hide("deleteItem");
      SL.show("itemView");
    });


  /*****************************************************************************
   * send e-mail views
   ****************************************************************************/
  // Add event listeners to buttons

  //Cancel
  SL.enterEmail.elm.getElementsByClassName("cancel")[0].addEventListener("click",
    function() {
      SL.hide("enterEmail");
      SL.show("items");
    });
  SL.id("sendEmail").getElementsByClassName("cancel")[0].addEventListener("click",
    function() {
      SL.hide("sendEmail");
      SL.show("enterEmail");
    });


  // Button to clear the form
  SL.enterEmail.elm.querySelector('button[type="reset"]').addEventListener("click",
  function() {
      SL.id("email").textContent = "";
  });

  // Send
  SL.enterEmail.elm.getElementsByClassName("send")[0].addEventListener("click",
    function() {
      SL.enterEmail.sendAddress();
    });
  // …or if he hit enter key
  SL.id("email").onkeyup = function (e) {
    if (e.keyCode == 13) {
      SL.enterEmail.sendAddress();
    }
  }



  /*****************************************************************************
   * More List
   ****************************************************************************/
  SL.id("moreLists").getElementsByClassName("cancel")[0].addEventListener("click",
    function() {
      SL.hide("moreLists");
      SL.show("lists");
    });

    SL.id("removeDoneLists").addEventListener("click",
    function() {
      SL.removeDone("Lists");
      SL.hide("moreLists");
      SL.show("lists");
    });

  /*****************************************************************************
   * More Items
   ****************************************************************************/
  SL.id("moreItems").getElementsByClassName("cancel")[0].addEventListener("click",
    function() {
      SL.hide("moreItems");
      SL.show("items");
    });

  SL.id("removeDoneItems").addEventListener("click",
    function() {
      SL.removeDone("Items");
      SL.hide("moreItems");
      SL.show("items");
    });

  SL.id("cloneList").addEventListener("click", function() {
    SL.Items.clone();
    SL.hide("items");
    SL.hide("moreItems");
    SL.show("lists");
  })


  /*****************************************************************************
   * Settings
   ****************************************************************************/
  SL.Settings.elm.getElementsByClassName("icon-back")[0].parentNode.addEventListener("click", function() {
    SL.hide("settingsPanel");
    SL.show(SL[SL.Settings.openedFrom].elm.id);
  });

  /*
   * Language
   */
  document.querySelector('select[name="language"]').addEventListener("change", function() {
    var selected = this.options[this.selectedIndex];
    // Save setting
    SL.Settings.save("language", selected.value);
    SL.id("language").textContent = selected.textContent;

    // Change language
    document.webL10n.setLanguage(selected.value);
  });

  /*
   * Currency settings
   */
  // Show position & currency panel
  SL.id("currency").addEventListener("click", function() {
    SL.hide("settingsPanel");
    SL.show("editCurrency");
  });

  // Hide currency panel
  SL.id("cEditCurrency").addEventListener("click", function() {
    SL.hide("editCurrency");
    SL.show("settingsPanel");
  });
  SL.id("setEditCurrency").addEventListener("click", function() {
    SL.hide("editCurrency");
    SL.show("settingsPanel");

    // Save settings
    if (SL.id("userCurrency").value != "") {
      SL.Settings.save("userCurrency", SL.id("userCurrency").value);
    }

    var selected = SL.getCheckedRadioId("position");
    SL.Settings.save("currencyPosition", selected);
  });

  // Switches
  SL.id("prices-enable").addEventListener("click", function() {
    if(this.checked) {
      SL.id("currency").removeAttribute("disabled");
    } else {
      SL.id("currency").setAttribute("disabled", "");
    }
    // Update the obj before refreshing Lists view
    if (typeof SL.Settings.obj["prices-enable"] == "undefined") {
      SL.Settings.obj["prices-enable"] = {value:""};
    }
    SL.Settings.obj["prices-enable"].value = this.checked;
    SL.Lists.updateUI();

    SL.Settings.save("prices-enable", this.checked);
  });

  /*
   * About panel
   */
  SL.id("about").addEventListener("click", function() {
    SL.hide("settingsPanel");
    SL.show("aboutPanel");
  });
  SL.id("aboutBack").addEventListener("click", function() {
    SL.hide("aboutPanel");
    SL.show("settingsPanel");
  });
}
 