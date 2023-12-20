// ==UserScript==
// @name         Terc PLUS
// @namespace    http://tampermonkey.net/
// @version      2.3.1
// @description  Különböző funkciókkal bővíti a TERC-ETALON webalkalmazást
// @author       Mental Gravis
// @match        https://www.etalon.terc.hu/browser
// @run-at       document-end
// @icon         https://www.google.com/s2/favicons?sz=64&domain=terc.hu
// @require      https://code.jquery.com/jquery-3.6.4.min.js#sha256-oP6HI9z1XaZNBrJURtCoUT5SUnxFr8s3BzRl+cbzUq8=
// @updateURL    https://github.com/MentalGravis/Terc-PLUS/releases/latest/download/Terc.PLUS.user.js
// @grant        none
// ==/UserScript==

(function() {

    'use strict';

    jQuery(document).ready(function(){

/*<---------------------------------- SUM OF MONEY ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------->*/

            
        // Variables to store the initial mouse position and menu position
        let initialMouseX, initialMouseY, initialMenuX, initialMenuY;

        // Create a button to open the menu
        const openButton = document.createElement('button');
        openButton.textContent = 'Open Menu';
        openButton.style.position = 'fixed';
        openButton.style.top = '10px';
        openButton.style.left = '10px';
        openButton.style.zIndex = '9998'; // Set a high z-index value for the button
        openButton.addEventListener('click', openMenu);

        // Create the menu container
        const menuContainer = document.createElement('div');
        menuContainer.style.position = 'absolute'; // Change to absolute positioning
        menuContainer.style.top = '50px';
        menuContainer.style.left = '50px';
        menuContainer.style.width = '450px'; // Set fixed width
        menuContainer.style.height = '490px'; // Set fixed height
        menuContainer.style.backgroundColor = '#c1d5f0'; // Set background color
        menuContainer.style.border = '1px solid #ccc';
        menuContainer.style.display = 'none';
        menuContainer.style.zIndex = '9999'; // Set a higher z-index value for the menu container
        menuContainer.style.userSelect = 'none'; // Disable text selection
        menuContainer.style.font = 'normal 11px Arial, Tahoma, Helvetica, sans-serif'; // Set font styles

        // Create the top row div
        const topRowDiv = document.createElement('div');
        topRowDiv.style.backgroundColor = '#c1d5f0'; // Set background color for the top row
        topRowDiv.style.padding = '5px'; // Set padding for the top row
        topRowDiv.style.height = '26px'; // Set height for the top row
        topRowDiv.style.marginBottom = '0'; // Set bottom margin to 0
        topRowDiv.style.display = 'flex'; // Use flexbox for vertical centering
        topRowDiv.style.alignItems = 'center'; // Center items vertically
        topRowDiv.style.cursor = 'grab'; // Set cursor to grab when not hovering
        topRowDiv.style.font = 'normal 11px Arial, Tahoma, Helvetica, sans-serif'; // Set font styles

        // Add event listeners for dragging
        topRowDiv.addEventListener('mousedown', startDrag);
        document.addEventListener('mousemove', dragMenu);
        document.addEventListener('mouseup', stopDrag);

        // Add the label to the top row
        topRowDiv.appendChild(createLabelDiv('Menu'));

        // Create a div for the close button and position it on the right
        const closeButtonDiv = document.createElement('div');
        closeButtonDiv.style.marginLeft = 'auto'; // Move close button to the right
        closeButtonDiv.appendChild(createCloseButton());
        topRowDiv.appendChild(closeButtonDiv);

        // Add the top row div to the menu container
        menuContainer.appendChild(topRowDiv);

        // Create the tab strip div
        const tabStripDiv = document.createElement('div');
        tabStripDiv.style.display = 'flex';
        tabStripDiv.style.backgroundColor = '#d7e4f3'; // Set background color for the tab strip
        tabStripDiv.style.padding = '10px 0 0 0'; // Set top padding to 10
        tabStripDiv.style.font = 'normal 11px Arial, Tahoma, Helvetica, sans-serif'; // Set font styles

        // Add tabs
        const tab1 = createTab('Tab 1', 'content1');
        const tab2 = createTab('Tab 2', 'content2');

        tabStripDiv.appendChild(tab1);
        tabStripDiv.appendChild(tab2);

        // Add the tab strip div to the menu container
        menuContainer.appendChild(tabStripDiv);

        // Create content divs for each tab with checkboxes
        const content1 = createContentDiv('content1');
        createCheckbox(content1, 'Option 1');
        createCheckbox(content1, 'Option 2');
        createCheckbox(content1, 'Option 3');

        const content2 = createContentDiv('content2');
        createCheckbox(content2, 'Option A');
        createCheckbox(content2, 'Option B');
        createCheckbox(content2, 'Option C');

        // Create content divs for each tab
        // const content1 = createContentDiv('content1');
        // const content2 = createContentDiv('content2');

        // Add content divs to the menu container
        menuContainer.appendChild(content1);
        menuContainer.appendChild(content2);

        // Append the button to the document body
        document.body.appendChild(openButton);

        // Append the menu container to the document body
        document.body.appendChild(menuContainer);

        // Function to create a label div
        function createLabelDiv(label) {
            const labelDiv = document.createElement('div');
            labelDiv.textContent = label;
            labelDiv.style.fontFamily = 'Arial, Tahoma, Verdana, Helvetica'; // Set font type
            return labelDiv;
        }

        // Function to create a close button
        function createCloseButton() {
            const closeButton = document.createElement('button');
            closeButton.textContent = '✕'; // Red "X" character
            closeButton.style.backgroundColor = 'red';
            closeButton.style.border = 'none';
            closeButton.style.color = 'white';
            closeButton.style.fontSize = '18px';
            closeButton.style.cursor = 'pointer';
            closeButton.style.height = '26px'; // Set height
            closeButton.style.width = '26px'; // Set width
            closeButton.addEventListener('click', closeMenu);
            return closeButton;
        }

        // Function to create a tab
        function createTab(label, contentId) {
            const tab = document.createElement('div');
            tab.textContent = label;
            tab.style.padding = '10px';
            tab.style.cursor = 'pointer';
            tab.style.border = '2px solid #d7e4f3'; // Set border color and thickness for inactive tab
            tab.style.borderRadius = '0'; // Set border radius to 0
            tab.style.marginRight = '0'; // Set right margin to 0
            return tab;
        }

        // Function to create a content div
        function createContentDiv(id) {
            const contentDiv = document.createElement('div');
            contentDiv.id = id;
            contentDiv.style.display = 'none';
            contentDiv.style.padding = '10px';
            contentDiv.style.border = 'none'; // Remove border
            contentDiv.style.borderRadius = '0'; // Set border radius to 0
            contentDiv.style.backgroundColor = 'transparent'; // Set background to transparent
            contentDiv.style.marginTop = '0'; // Remove top margin
            return contentDiv;
        }
        
        // Function to create a checkbox
        function createCheckbox(container, label) {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = label.replace(/\s+/g, '-').toLowerCase(); // Convert label to lowercase and replace spaces with hyphens
            const labelElement = document.createElement('label');
            labelElement.textContent = label;
            labelElement.htmlFor = checkbox.id;
            container.appendChild(checkbox);
            container.appendChild(labelElement);
            container.appendChild(document.createElement('br')); // Add line break for spacing
        }
        
        // Function to open the menu and show tab1 content
        function openMenuAndShowTab1() {
            menuContainer.style.display = 'block';
            showContent('content1'); // Show the content of tab1
        }

        // Add a click event listener to tab1 to show its content and apply styles
        tab1.addEventListener('click', () => {
            showContent('content1');
            applyActiveStyles(tab1, content1);
        });

        // Add a click event listener to tab2 to show its content and apply styles
        tab2.addEventListener('click', () => {
            showContent('content2');
            applyActiveStyles(tab2, content2);
        });

        // Function to apply styles to the active tab and content
        function applyActiveStyles(activeTab, activeContent) {
            // Reset styles for all tabs and contents
            const allTabs = tabStripDiv.querySelectorAll('div');
            const allContents = menuContainer.querySelectorAll('[id^=content]');
            allTabs.forEach(tab => {
                tab.style.backgroundColor = '';
                tab.style.border = '1px solid #ccc';
            });
            allContents.forEach(content => {
                content.style.backgroundColor = '';
                content.style.border = '1px solid #ccc';
                content.style.height = '0'; // Reset height
            });

            // Apply styles to the active tab and content
            activeTab.style.backgroundColor = '#c1d5f0';
            activeTab.style.border = 'none';

            activeContent.style.backgroundColor = '#c1d5f0';
            activeContent.style.border = 'none';
            activeContent.style.height = '375px'; // Set height to 375 pixels
        }

        // Add the openMenuAndShowTab1 function to the openButton click event
        openButton.addEventListener('click', openMenuAndShowTab1);

        // Function to open the menu
        function openMenu() {
            menuContainer.style.display = 'block';
        }

        // Function to close the menu
        function closeMenu() {
            menuContainer.style.display = 'none';
        }

        // Function to start the drag
        function startDrag(event) {
            initialMouseX = event.clientX;
            initialMouseY = event.clientY;
            initialMenuX = menuContainer.offsetLeft;
            initialMenuY = menuContainer.offsetTop;
            menuContainer.style.opacity = '0.8'; // Set transparency to 80%
            document.body.style.cursor = 'move'; // Set cursor to move
        }

        // Function to drag the menu
        function dragMenu(event) {
            if (initialMouseX !== undefined) {
                const offsetX = event.clientX - initialMouseX;
                const offsetY = event.clientY - initialMouseY;
                menuContainer.style.left = initialMenuX + offsetX + 'px';
                menuContainer.style.top = initialMenuY + offsetY + 'px';
            }
        }

        // Function to stop the drag
        function stopDrag() {
            initialMouseX = undefined;
            menuContainer.style.opacity = '1.0'; // Reset transparency
            document.body.style.cursor = ''; // Reset cursor
        }

        // Function to show content based on tab
        function showContent(contentId) {
            // Hide all content divs
            const contentDivs = menuContainer.querySelectorAll('[id^=content]');
            contentDivs.forEach(div => {
                div.style.display = 'none';
            });

            // Show the selected content div
            const selectedContent = document.getElementById(contentId);
            if (selectedContent) {
                selectedContent.style.display = 'block';
            }
        }


/*<---------------------------------- SUM OF MONEY ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------->*/

        var szumOfAll = function(){
            if (!(jQuery('#ext-comp-1077 > b:nth-child(1)').is(':visible'))){

                if (jQuery("#tea-igrid > div:nth-child(1) > span:nth-child(1) > span:nth-child(1)").text().search("Összes munkanem") >= 0) {
                    let anyagOssz = Number(document.querySelector("#tea-igrid > div:nth-child(1) > span:nth-child(1) > span:nth-child(5)").textContent.split("\xA0").join(""));
                    let dijOssz = Number(document.querySelector("#tea-igrid > div:nth-child(1) > span:nth-child(1) > span:nth-child(7)").textContent.split("\xA0").join(""));

                    let teljesOssz = anyagOssz + dijOssz;

                    let teljesOsszSzoveg = "<span><span style=\"font-weight: 400;\">Teljes összeg: </span><span style=\"color:black;\">" + teljesOssz.toLocaleString() + "<\span><span style=\"color:rgb(21 66 166);\">" + " Ft" + "<\span><\span>";

                    document.querySelector("#tea-igrid > div:nth-child(1) > span:nth-child(1) > span:nth-child(1)").outerHTML = teljesOsszSzoveg;
                }

            }
        }

        var szumInterval = setInterval(szumOfAll, 500);

/*<---------------------------------- TOGGLE BUTTONS ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------->*/

        const showHideButton = document.createElement("button");
        showHideButton.textContent = "Menüsor";

        showHideButton.style.position = 'absolute';
        showHideButton.style.top = "0";
        showHideButton.style.left = "0";
        showHideButton.style.zIndex = "9999";
        showHideButton.style.title = "Megmutatja vagy elrejti a kevésbé használt gombokat";

        document.body.appendChild(showHideButton);

        var buttonRearrangement = function(){

            if (!(jQuery('#ext-comp-1077 > b:nth-child(1)').is(':visible'))){
                if ((jQuery('.tu-header-cont > div:nth-child(6)').is(':visible')) || (jQuery('.tu-header-cont > div:nth-child(1) > img:nth-child(1)').is(':visible')) || (jQuery('#tu-header-login').is(':visible'))){

                    jQuery('.tu-header-cont > div:nth-child(6)').hide();                        // centerdiv
                    jQuery('.tu-header-cont > div:nth-child(1) > img:nth-child(1)').hide();     // terc img
                    jQuery('#tu-header-login').hide();                                          // email

                }

                if(!document.querySelector('.tu-header-cont > div:nth-child(1)').innerHTML.includes('SZERKESZTÉS:')){
                    let leftMenu = jQuery('#maindiv > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1)');
                    leftMenu.detach().prependTo('.tu-header-cont > div:nth-child(1)');
                }

                if(!(jQuery('.tu-header-cont').css('position') == "relative")){    // relative position for title's parent element so title can go absolute
                    jQuery('.tu-header-cont').css('position', 'relative');
                }

                if(!(jQuery('.tu-header-cont > div:nth-child(1)').css('position') == "absolute") || !(jQuery('.tu-header-cont > div:nth-child(1)').css('top') == '50%')){    // absolute position for title, or fucked top title row
                    jQuery('.tu-header-cont > div:nth-child(1)').css('position', 'absolute').css('top','50%');
                }

                if(document.querySelector('#maindiv > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1)').align == "right"){
                    document.querySelector('#maindiv > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1)').align = "left";
                }

            }
        }

        let rightMenuRow = function(num){
            return '#maindiv > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(' + num + ')';
        }

        let toggleRigtMenuRow = function(){
            jQuery(rightMenuRow(1).toString()).toggle();
            jQuery(rightMenuRow(2).toString()).toggle();
            jQuery(rightMenuRow(3).toString()).toggle();
            jQuery(rightMenuRow(4).toString()).toggle();
            jQuery(rightMenuRow(5).toString()).toggle();
            jQuery(rightMenuRow(6).toString()).toggle();
            jQuery(rightMenuRow(9).toString()).toggle();
            jQuery(rightMenuRow(10).toString()).toggle();
            jQuery(rightMenuRow(11).toString()).toggle();
            jQuery(rightMenuRow(12).toString()).toggle();
        }

        showHideButton.addEventListener('click', toggleRigtMenuRow);

        setInterval(buttonRearrangement, 1000);

        /*<---------------------------------------------- MASS EXPORT -------------------------------------------------------------------------------->*/


        const massExportButton = document.createElement('button');
        massExportButton.textContent = 'Export All';

        // Set button styles
        massExportButton.style.position = 'relative';
        massExportButton.style.left = '276px';
        massExportButton.style.zIndex = "9999";
        massExportButton.style.cursor = "pointer";
        massExportButton.style.fontSize = "11px";
        massExportButton.style.background = "transparent";
        massExportButton.style.padding = "4px 8px";
        massExportButton.style.border = "none";
        massExportButton.style.fontFamily = "arial, tahoma, verdana, helvetica";
        massExportButton.style.color = "#333";
        massExportButton.style.transition = 'background-color 0s ease-in-out';
        massExportButton.title = "Minden kijelölt elem exportálása";

        // Append the button to the body of the document
        let topKoltsKez = document.querySelector('#maindiv > div:nth-child(1) > div:nth-child(1) > form:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)');
        topKoltsKez.appendChild(massExportButton);

        var massExport = function () {
            let ajanlatokLista = "#maindiv > div:nth-child(1) > div:nth-child(1) > form:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div";

            const selectedAjanlatIndex = [];
            const selectedAjanlatLink = [];

            document.querySelectorAll(ajanlatokLista).forEach((element, index) => {         // note selected items
                if(element.className.includes("selected")){
                    selectedAjanlatIndex.push(index);

                    let selectedAjanlatIDLookup = (ajanlatokLista + ":nth-child(" + (index+1) + ")" + "> table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(4) > div:nth-child(1) > a").toString();
                
                    let selectedAjanlatID = document.querySelector(selectedAjanlatIDLookup).onclick.toString().match(/(\d(\d?)*\d)/)[0].toString();

                    selectedAjanlatLink.push("https://www.etalon.terc.hu/file/dl/" + selectedAjanlatID + "/PDF/2/1/1/1/2/HUF/1/1/1/1/1/2/1/");
                    
                    //window.open(selectedAjanlatLink);
                }
            });

            var interval = setInterval(download, 300, selectedAjanlatLink);

            function download(urls) {
                var url = urls.pop();

                var a = document.createElement("a");
                a.setAttribute('href', url);
                a.setAttribute('download', '');
                a.setAttribute('target', '_blank');
                a.click();

                if (urls.length == 0) {
                    clearInterval(interval);
                }
            }
        }

        massExportButton.addEventListener('mouseover', function(){
            massExportButton.style.backgroundColor = "#dcefff";
            massExportButton.style.textDecoration = "underline";
        });

        massExportButton.addEventListener('mouseout', function() {
            massExportButton.style.backgroundColor = "transparent";
            massExportButton.style.textDecoration = "none";
        });

        massExportButton.addEventListener('mousedown', function() {
            massExportButton.style.backgroundColor = '#495055';
        });

        massExportButton.addEventListener('mouseup', function() {
            massExportButton.style.backgroundColor = 'transparent';
        });


        massExportButton.addEventListener('click', massExport);



        /*<---------------------------------------- HIDE ON OPEN -------------------------------------------------------------------------------------->*/
 

        var currentPage = "";
        var lastPage = "";

        var freshPage = function () {

            var isTitleRowVisible = jQuery('#ext-comp-1077 > b:nth-child(1)').is(':visible');


            if((isTitleRowVisible == true) && (currentPage != "frontPage")){
                currentPage = "frontPage";
            }
            if ((isTitleRowVisible == false) && (currentPage != "innerPage")){
                currentPage = "innerPage";
            }

            if ((lastPage == "") && (currentPage == "frontPage")){
                massExportButton.style.visibility = "visible";
                showHideButton.style.visibility = "hidden";
                topKoltsKez.style.padding = "2px 0px";

                jQuery('.tu-header-cont > div:nth-child(6)').hide();                        // centerdiv
                jQuery('.tu-header-cont > div:nth-child(1) > img:nth-child(1)').hide();     // terc img
            }

            if ((lastPage == "frontPage") && (currentPage == "innerPage")){             // kívülről befele váltás
                if (!(jQuery('#ext-comp-1077 > b:nth-child(1)').is(':visible')) && jQuery(rightMenuRow(6).toString()).is(':visible')){
                    jQuery(rightMenuRow(1).toString()).hide();
                    jQuery(rightMenuRow(2).toString()).hide();
                    jQuery(rightMenuRow(3).toString()).hide();
                    jQuery(rightMenuRow(4).toString()).hide();
                    jQuery(rightMenuRow(5).toString()).hide();
                    jQuery(rightMenuRow(6).toString()).hide();
                    jQuery(rightMenuRow(9).toString()).hide();
                    jQuery(rightMenuRow(10).toString()).hide();
                    jQuery(rightMenuRow(11).toString()).hide();
                    jQuery(rightMenuRow(12).toString()).hide();
                }

                let leftPanelTetelekCsoportositasa = jQuery('#maindiv > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1)');

                if (!(jQuery('#ext-comp-1077 > b:nth-child(1)').is(':visible')) && leftPanelTetelekCsoportositasa.is(':visible')){

                    jQuery('#maindiv > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)').click();

                };

                szumInterval

                massExportButton.style.visibility = "hidden";
                showHideButton.style.visibility = "visible";

                jQuery('.tu-header-cont > div:nth-child(6)').hide();                        // centerdiv
                jQuery('.tu-header-cont > div:nth-child(1) > img:nth-child(1)').hide();     // terc img

            }
            if ((lastPage == "innerPage") && (currentPage == "frontPage")) {            // belülről kifele váltás
                clearInterval(szumInterval);
                massExportButton.style.visibility = "visible";
                showHideButton.style.visibility = "hidden";
                topKoltsKez.style.padding = "2px 0px";

                jQuery('.tu-header-cont > div:nth-child(6)').hide();                        // centerdiv
                jQuery('.tu-header-cont > div:nth-child(1) > img:nth-child(1)').hide();     // terc img
            }


            if ((lastPage == "innerPage") && (currentPage == "innerPage")) {
                szumInterval;
            }
            //console.log("lastPage: " + lastPage + "  ||  currentPage: " + currentPage);
            lastPage = currentPage;


        }

        setInterval(freshPage, 1000);


    });
})();
