// ==UserScript==
// @name         Terc PLUS
// @namespace    http://tampermonkey.net/
// @version      2.4.2
// @description  Különböző funkciókkal bővíti a TERC-Etalon webalkalmazást
// @author       Mental Gravis
// @match        https://www.etalon.terc.hu/browser
// @run-at       document-end
// @icon         https://www.google.com/s2/favicons?sz=64&domain=terc.hu
// @require      https://code.jquery.com/jquery-3.6.4.min.js#sha256-oP6HI9z1XaZNBrJURtCoUT5SUnxFr8s3BzRl+cbzUq8=
// @updateURL    https://github.com/MentalGravis/Terc-PLUS/releases/latest/download/Terc.PLUS.user.js
// @grant        none
// ==/UserScript==

(function() {
    jQuery(document).ready(function(){

/*<---------------------------------- MENU ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------->*/
                    
        // Variables to store the initial mouse position and menu position
        let initialMouseX, initialMouseY, initialMenuX, initialMenuY;

        // Create a button to open the menu
        const openButton = document.createElement('button');
        openButton.textContent = 'Terc-PLUS menü';
        openButton.style.display = 'block';
        openButton.style.position = 'fixed';
        openButton.style.top = '10px';
        openButton.style.left = '10px';
        openButton.style.height = '30px';
        //openButton.style.fontSize = '14px';
        openButton.style.color = 'white';
        openButton.style.borderRadius = '0px';
        openButton.style.cursor = 'pointer';
        openButton.style.zIndex = '9998'; // Set a high z-index value for the button
        openButton.style.border = 'none';
        openButton.style.backgroundColor = '#14458e';
        openButton.addEventListener('click', function() {
            if(menuContainer.style.display == "none"){
                openMenu();
            } else if (menuContainer.style.display == "block") {
                closeMenu();
            }
        });

        // Create the menu container
        const menuContainer = document.createElement('div');
        menuContainer.id = 'terc-plus-menu';
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
        topRowDiv.appendChild(createLabelDiv('Terc-PLUS Menü'));

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
        const tab1 = createTab('Általános', 'altalanos');
        //const tab2 = createTab('Tab 2', 'content2');

        tabStripDiv.appendChild(tab1);
        //tabStripDiv.appendChild(tab2);

        // Add the tab strip div to the menu container
        menuContainer.appendChild(tabStripDiv);

        // Load checkbox states from local storage
        const defaultCheckboxState = loadCheckboxState('default_checkboxState');
        const userCheckboxState = loadCheckboxState('user_checkboxState');
        const defaultDropdownState = loadDropdownState('default_dropdownState');
        const userDropdownState = loadDropdownState('user_dropdownState');
        const defaultUserInputState = loadUserInputState('user_inputState');
        const userInputState = loadUserInputState('user_inputState');

        // console.log(userCheckboxState);
        
        // Create content divs for each tab with checkboxes---------------------------------------------------menüopciók---------------------------------------->
        const altalanos = createContentDiv('altalanos');
        createCheckbox(altalanos, 'Menügombok automatikus elrejtése', true); // Default value set to true
        createCheckbox(altalanos, 'Tételek csoportosításának elrejtése', true);
        createCheckbox(altalanos, '\"Export All\" lehetőség megjelenítése', true);
        createCheckbox(altalanos, 'Új költségvetés készítésénél alapértelmezett adatok beállítása', true);
        createCheckbox(altalanos, 'Jelleg:', true);        
        createDropdown(altalanos, 'Jelleg dropdown', ['Új', 'Felújítás'], 'Felújítás', 'Jelleg:');
        createCheckbox(altalanos, 'Építmény tulajdonsága:', true);
        let építményekTulList = ['Egylakásos lakóépület', 'Két és többlakásos lakóépület', 'Közösségi lakóépület', 'Szálloda', 'Hivatali épület', 'Nagy- és kiskereskedelmi épület', 'Közlekedési és hírközlési épület', 'Ipari épület, raktár', 'Szórakoztató célú épület', 'Közművelődési célú épület', 'Oktatási célú épület', 'Egészségügyi célú épület', 'Egyéb nem lakóépület', 'Út', 'Vasút', 'Komplex ipari létesítmény', 'Sport és üdülési célú építmény', 'Egyéb építmény'];
        createDropdown(altalanos, 'Építmény tulajdonsága dropdown', építményekTulList, 'Hivatali épület', 'Építmény tulajdonsága:');
        createCheckbox(altalanos, 'Rezsióradíj:', false);
        createNumberInput(altalanos, 'Rezsioradij input', '0', 'Rezsióradíj:');


        // const content2 = createContentDiv('content2');
        // createCheckbox(content2, 'Option A');
        // createCheckbox(content2, 'Option B');
        // createCheckbox(content2, 'Option C');

        // Create content divs for each tab
        // const content1 = createContentDiv('content1');
        // const content2 = createContentDiv('content2');

        // Add content divs to the menu container
        menuContainer.appendChild(altalanos);
        // menuContainer.appendChild(content2);

        // Append the button to the document body
        document.body.appendChild(openButton);

        // Append the menu container to the document body
        //document.body.appendChild(menuContainer);

        // Apply default states to checkboxes
        applyCheckboxState(defaultCheckboxState);

        // Append the menu container to the document body
        document.body.appendChild(menuContainer);

        // Function to create a checkbox
        function createCheckbox(container, label, defaultValue) {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = generateCheckboxID(container.id, label);
            //checkbox.style.marginLeft = '0px';
            const labelElement = document.createElement('label');
            labelElement.textContent = label;
            labelElement.htmlFor = checkbox.id;
            labelElement.style.padding = "5px 5px 5px 5px";
            labelElement.style.marginTop = "10px";
            const spacing = document.createElement('div');
            spacing.style.margin = 0;
            spacing.style.height = "10px";
            container.appendChild(checkbox);
            container.appendChild(labelElement);
            container.appendChild(document.createElement('br'));
            container.appendChild(spacing);

            // Check if user state is available, otherwise use default
            const isChecked = userCheckboxState[checkbox.id] !== undefined ? userCheckboxState[checkbox.id] : defaultValue;

            // Apply state to checkbox
            checkbox.checked = isChecked;

            // // Save default state
            defaultCheckboxState[checkbox.id] = defaultValue;

            // Add change event listener to save user state
            checkbox.addEventListener('change', function() {
                userCheckboxState[checkbox.id] = checkbox.checked;
                saveCheckboxState('user_checkboxState', userCheckboxState);
            });
        }

        // Function to generate checkbox ID based on container ID and label
        function generateCheckboxID(containerID, label) {
            const sanitizedLabel = label.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-').toLowerCase();
            return `${containerID}-${sanitizedLabel}`;
        }

        // Function to load checkbox state from local storage
        function loadCheckboxState(key) {
            const storedState = localStorage.getItem(key);
            return storedState ? JSON.parse(storedState) : {};
        }

        // Function to save checkbox state to local storage
        function saveCheckboxState(key, state) {
            localStorage.setItem(key, JSON.stringify(state));
        }

        // Function to apply checkbox state to checkboxes
        function applyCheckboxState(state) {
            for (const checkboxID in state) {
                const checkbox = document.getElementById(checkboxID);
                if (checkbox) {
                    checkbox.checked = state[checkboxID];
                }
            }
        }

        function createDropdown(container, label, options, defaultValue, checkboxLabel) {
            // Create the dropdown element
            const dropdown = document.createElement('select');
            dropdown.id = generateDropdownID(container.id, label);
        
            // Create and append options to the dropdown
            options.forEach(optionText => {
                const option = document.createElement('option');
                option.value = optionText;
                option.textContent = optionText;
                dropdown.appendChild(option);
            });
        
            // Check if user state is available, otherwise use default
            const selectedValue = userDropdownState[dropdown.id] !== undefined ? userDropdownState[dropdown.id] : defaultValue;
        
            // Set the selected value for the dropdown
            dropdown.value = selectedValue;
        
            // Save default value
            defaultDropdownState[dropdown.id] = defaultValue;
        
            // Add change event listener to save user state
            dropdown.addEventListener('change', function() {
                userDropdownState[dropdown.id] = dropdown.value;
                saveDropdownState('user_dropdownState', userDropdownState);
            });
        
            // Find the checkbox label element
            const checkboxLabelElement = findCheckboxLabelElement(container, checkboxLabel);
        
            if (checkboxLabelElement) {
                // Append the dropdown immediately after the checkbox label
                checkboxLabelElement.parentNode.insertBefore(dropdown, checkboxLabelElement.nextSibling);
            } else {
                // If checkbox label is not found, simply append the dropdown to the container
                container.appendChild(dropdown);
            }
        }
        
        // Function to find a checkbox label element based on its text content within a container
        function findCheckboxLabelElement(container, checkboxLabel) {
            const labels = container.querySelectorAll('label');
            for (const label of labels) {
                if (label.textContent.trim() === checkboxLabel.trim()) {
                    return label;
                }
            }
            return null;
        }

        // Function to generate dropdown ID based on container ID and label
        function generateDropdownID(containerID, label) {
            const sanitizedLabel = label.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-').toLowerCase();
            return `${containerID}-${sanitizedLabel}`;
        }
        
        // Function to load dropdown state from local storage
        function loadDropdownState(key) {
            const storedState = localStorage.getItem(key);
            return storedState ? JSON.parse(storedState) : {};
        }
        
        // Function to save dropdown state to local storage
        function saveDropdownState(key, state) {
            localStorage.setItem(key, JSON.stringify(state));
        }
        
        // Function to apply dropdown state to dropdowns
        function applyDropdownState(state) {
            for (const dropdownID in state) {
                const dropdown = document.getElementById(dropdownID);
                if (dropdown) {
                    dropdown.value = state[dropdownID];
                }
            }
        }

        function createNumberInput(container, label, defaultValue, checkboxLabel) {
            // Create the number input element
            const numberInput = document.createElement('input');
            numberInput.type = 'text';
            numberInput.pattern = '\\d*'; // Allow only numbers
            numberInput.id = generateInputID(container.id, label);
            numberInput.style.textAlign = 'right';
            numberInput.style.width = '80px';
            numberInput.style.paddingTop = '2px';
        
            // Check if user state is available, otherwise use default
            const inputValue = userInputState[numberInput.id] !== undefined ? userInputState[numberInput.id] : defaultValue;
        
            // Set the input value
            numberInput.value = inputValue;
        
            // Save default value
            defaultUserInputState[numberInput.id] = defaultValue;
        
            // Add input event listener to save user state
            numberInput.addEventListener('input', function() {
                userInputState[numberInput.id] = numberInput.value;
                saveUserInputState('user_inputState', userInputState);
            });
        
            // Find the checkbox label element
            const checkboxLabelElement = findCheckboxLabelElement(container, checkboxLabel);
        
            if (checkboxLabelElement) {
                // Append the number input immediately after the checkbox label
                checkboxLabelElement.parentNode.insertBefore(numberInput, checkboxLabelElement.nextSibling);
            } else {
                // If checkbox label is not found, simply append the number input to the container
                container.appendChild(numberInput);
            }
        }
        
        // Function to generate input ID based on container ID and label
        function generateInputID(containerID, label) {
            const sanitizedLabel = label.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-').toLowerCase();
            return `${containerID}-${sanitizedLabel}-input`;
        }
        
        // Function to load user input state from local storage
        function loadUserInputState(key) {
            const storedState = localStorage.getItem(key);
            return storedState ? JSON.parse(storedState) : {};
        }
        
        // Function to save user input state to local storage
        function saveUserInputState(key, state) {
            localStorage.setItem(key, JSON.stringify(state));
        }
        
        // Function to apply user input state to inputs
        function applyUserInputState(state) {
            for (const inputID in state) {
                const input = document.getElementById(inputID);
                if (input) {
                    input.value = state[inputID];
                }
            }
        }

        // Function to create a label div
        function createLabelDiv(label) {
            const labelDiv = document.createElement('div');
            labelDiv.textContent = label;
            labelDiv.style.fontFamily = 'Arial, Tahoma, Verdana, Helvetica'; // Set font type
            labelDiv.style.fontWeight = 'bold';
            labelDiv.style.color = '#15428b';
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
            tab.style.borderLeft = 'none';
            tab.style.borderBottom = 'none';
            tab.style.borderRight = '2px solid #2596be';
            tab.style.borderTop = '2px solid #2596be';
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

        // Function to open the menu and show tab1 content
        function openMenuAndShowTab1() {
            let firstOpen = 0;
            if(firstOpen == 0){
                jQuery('#terc-plus-menu > div:nth-child(2) > div:nth-child(1)').click();
                firstOpen++;
            }
            // menuContainer.style.display = 'block';
            // showContent('content1'); // Show the content of tab1
        }

        // Add a click event listener to tab1 to show its content and apply styles
        tab1.addEventListener('click', () => {
            showContent('altalanos');
            applyActiveStyles(tab1, altalanos);
        });

        // Add a click event listener to tab2 to show its content and apply styles
        // tab2.addEventListener('click', () => {
        //     showContent('content2');
        //     applyActiveStyles(tab2, content2);
        // });

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
            if (jQuery("#tea-igrid > div:nth-child(1) > span:nth-child(1) > span:nth-child(1)").text().search("Összes munkanem") >= 0) {
                let anyagOssz = Number(document.querySelector("#tea-igrid > div:nth-child(1) > span:nth-child(1) > span:nth-child(5)").textContent.split("\xA0").join(""));
                let dijOssz = Number(document.querySelector("#tea-igrid > div:nth-child(1) > span:nth-child(1) > span:nth-child(7)").textContent.split("\xA0").join(""));

                let teljesOssz = anyagOssz + dijOssz;

                let teljesOsszSzoveg = "<span><span style=\"font-weight: 400;\">Teljes összeg: </span><span style=\"color:black;\">" + teljesOssz.toLocaleString() + "<\span><span style=\"color:rgb(21 66 166);\">" + " Ft" + "<\span><\span>";

                document.querySelector("#tea-igrid > div:nth-child(1) > span:nth-child(1) > span:nth-child(1)").outerHTML = teljesOsszSzoveg;
            }
            //console.log("fut a szum");
        }

/*<---------------------------------- TOGGLE BUTTONS ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------->*/

        const showHideButton = document.createElement("button");
        showHideButton.textContent = "Menüsor";
        showHideButton.id = 'tercplusShowHideButton';

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

        var toggleRigtMenuRow = function(){
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

        let showHideCheckbox = document.querySelector('#altalanos-mengombok-automatikus-elrejtse');
        
        let tetelekCsoportositasaCheckbox = document.querySelector('#altalanos-ttelek-csoportostsnak-elrejtse')

        /*<---------------------------------------------- MASS EXPORT -------------------------------------------------------------------------------->*/


        const massExportButton = document.createElement('button');
        massExportButton.textContent = 'Export All';
        massExportButton.id = 'tercplusExportButton';

        // Set button styles
        massExportButton.style.position = 'relative';
        massExportButton.style.left = '411px';
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
        topKoltsKez.style.height = '20px';
        topKoltsKez.style.position = 'relative';
        topKoltsKez.appendChild(massExportButton);
        topKoltsKez.style.padding = "2px 0px";
        topKoltsKez.children[0].style.position = "absolute";
        topKoltsKez.children[0].style.top = "50%";
        topKoltsKez.children[0].style.transform = "translateY(-50%)";

        var massExport = function () {
            let ajanlatokLista = "#maindiv > div:nth-child(1) > div:nth-child(1) > form:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div";

            const selectedAjanlatIndex = [];
            const selectedAjanlatLink = [];

            document.querySelectorAll(ajanlatokLista).forEach((element, index) => {         // note selected items
                if(element.className.includes("selected")){
                    selectedAjanlatIndex.push(index);

                    let selectedAjanlatIDLookup = (ajanlatokLista + ":nth-child(" + (index+1) + ")" + "> table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(10) > div:nth-child(1) > a").toString();

                    let selectedAjanlatID = document.querySelector(selectedAjanlatIDLookup).onclick.toString().match(/(\d(\d?)*\d)/)[0].toString();

                    selectedAjanlatLink.push("https://www.etalon.terc.hu/file/dl/" + selectedAjanlatID + "/PDF/2/1/1/1/2/HUF/1/1/1/1/1/2/1/");
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

        massExportCheckbox = document.querySelector('#altalanos-export-all-lehetsg-megjelentse');
        
        
        // initializing massexportbutton
        let mx = 0;
        while (mx == 0) {
            if (massExportCheckbox.checked){
                massExportButton.style.display = 'inline-block';
            } else if (!massExportCheckbox.checked){
                massExportButton.style.display = 'none';
            }
            mx++;
        }

        massExportCheckbox.addEventListener('change', function() {
            if (massExportCheckbox.checked){
                massExportButton.style.display = 'inline-block';
            } else if (!massExportCheckbox.checked){
                massExportButton.style.display = 'none';
            }
        });

        /*<---------------------------------------- NEW BUDGET ESTIMATES AUTOFILL -------------------------------------------------------------------------------------->*/

        document.querySelector('#altalanos-jelleg').style.marginLeft = document.querySelector('#altalanos-ptmny-tulajdonsga').style.marginLeft = document.querySelector('#altalanos-rezsiradj').style.marginLeft = '40px';
        document.querySelector('#altalanos > label:nth-child(18)').style.marginRight = document.querySelector('#altalanos > label:nth-child(23)').style.marginRight = document.querySelector('#altalanos > label:nth-child(28)').style.marginRight = '5px';


        // Mutation observer
        function setupDOMObserver(targetClass, targetTextContent, callbackFunctions) {
            // Define the target node to observe
            const targetNode = document.body;
        
            // Options for the observer (specify which mutations to observe)
            const config = { attributes: true, childList: true, subtree: true, passive: true };
        
            // Callback function to execute when mutations are observed
            const callback = function(mutationsList, observer) {
                for (const mutation of mutationsList) {
                    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                        // Check for specific changes based on text content and class
                        const addedNode = mutation.addedNodes[0];
            
                        if (
                            addedNode.nodeType === 3 &&
                            addedNode.nodeValue.trim() === targetTextContent &&
                            (addedNode.parentElement && addedNode.parentElement.classList && addedNode.parentElement.classList.contains(targetClass))
                        ) {
                            // // Trigger each callback function with a delay
                            // callbackFunctions.forEach((func, index) => {
                            //     setTimeout(() => func(addedNode.parentElement), (index + 1) * 3000); // Adjust the delay (in milliseconds) between function calls
                            // });
                            callbackFunctions(addedNode.parentElement);
                        }
                    }
                }
            };
        
            // Create an observer instance linked to the callback function
            const observer = new MutationObserver(callback);
        
            // Start observing the target node for configured mutations
            observer.observe(targetNode, config);
        }
        
        var jelleg = function(elem) {
            // alert(elem.classList);
            var ujKoltsegAblak = elem.parentElement.parentElement.parentElement.parentElement.parentElement;
            if (document.querySelector("#altalanos-jelleg").checked) {
                var jellegUserValue = document.querySelector('#altalanos-jelleg-dropdown').value.toString();
                var jellegDropdown = ujKoltsegAblak.children[1].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[6].children[1].children[0].children[1];
                if (jellegDropdown.value != jellegUserValue) {
                    jellegDropdown.addEventListener('click', function() {
                        document.querySelectorAll("body > div:nth-last-child(1) > div:nth-child(1) > div").forEach((element)=>{
                            if(element.innerHTML == jellegUserValue){
                                element.click();
                            }
                        }, {passive: true});
                    });
                    jellegDropdown.click();
                }                
            }
            if (document.querySelector("#altalanos-ptmny-tulajdonsga").checked) {
                var epitmenyUserValue = document.querySelector("#altalanos-ptmny-tulajdonsga-dropdown").value.toString();
                var epitmenyDropdown = ujKoltsegAblak.children[1].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[7].children[1].children[0].children[1];
                if (epitmenyDropdown.value != epitmenyUserValue) {
                    epitmenyDropdown.addEventListener('click', function() {
                        document.querySelectorAll("body > div:nth-last-child(1) > div:nth-child(1) > div").forEach((element)=>{
                            if(element.innerHTML == epitmenyUserValue){
                                element.click();
                            }
                        }, {passive: true});
                    });
                    epitmenyDropdown.click();
                }
            }
        };
        
        // var csinald = function(elem) {
        //     console.log('jellegValasztasClick fired off ' + elem)
        // };

        // var epitmenyClick = function () {
        //     alert('Callback function 3');
        // };

        // var epitmenyValasztas = function () {
        //     alert('Callback function 4');
        // };

        // var letrehozasClick = function () {
        //     alert('Callback function 5');
        // };

        // var letrehozasClick = function (elem) {
        //     var ujKoltsegAblak = elem.parentElement.parentElement.parentElement.parentElement.parentElement;
        //     alert(ujKoltsegAblak.className);
        // };

        setupDOMObserver('x-window-header-text', 'Új költségvetés létrehozása', jelleg);



        
        /*<---------------------------------------- FRESH PAGE -------------------------------------------------------------------------------------->*/

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

                showHideButton.style.display = "none";
                topKoltsKez.style.padding = "2px 0px";

                jQuery('.tu-header-cont > div:nth-child(6)').hide();                        // centerdiv
                jQuery('.tu-header-cont > div:nth-child(1) > img:nth-child(1)').hide();     // terc img
            }

            //var szumInterval;

            if ((lastPage == "frontPage") && (currentPage == "innerPage")){             // kívülről befele váltás
                

                openButton.style.display = 'none';

                buttonRearrangement();

                //let leftPanelTetelekCsoportositasa = jQuery('#maindiv > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1)');


                if ((tetelekCsoportositasaCheckbox.checked) && !(jQuery('#ext-comp-1077 > b:nth-child(1)').is(':visible'))){
                    jQuery('#maindiv > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)').click();
                }


                if ((showHideCheckbox.checked) && (showHideButton.style.display == "none")){
                    showHideButton.style.display = 'block';                        
                    toggleRigtMenuRow();
                } else if (!showHideCheckbox.checked){
                    showHideButton.style.display = 'none';
                }

                jQuery('.tu-header-cont > div:nth-child(6)').hide();                        // centerdiv
                jQuery('.tu-header-cont > div:nth-child(1) > img:nth-child(1)').hide();     // terc img
            }
            if ((lastPage == "innerPage") && (currentPage == "frontPage")) {            // belülről kifele váltás

                showHideButton.style.display = "none";

                jQuery('.tu-header-cont > div:nth-child(6)').hide();                        // centerdiv
                jQuery('.tu-header-cont > div:nth-child(1) > img:nth-child(1)').hide();     // terc img
            
                openButton.style.display = 'block';
            }

            if ((lastPage == "innerPage") && (currentPage == "innerPage")) {
                szumOfAll();
                buttonRearrangement();
            }
            // console.log("lastPage: " + lastPage + "  ||  currentPage: " + currentPage);
            lastPage = currentPage;


        }

        setInterval(freshPage, 750);

    });
})();