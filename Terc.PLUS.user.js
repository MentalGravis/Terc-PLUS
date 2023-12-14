// ==UserScript==
// @name         Terc PLUS
// @namespace    http://tampermonkey.net/
// @version      2.3
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
    jQuery(document).ready(function(){

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

        var button = document.createElement("Button");
        button.innerHTML = "Menüsor";
        button.style = "top:0;left:0;position:absolute;z-index: 9999"
        document.body.appendChild(button);

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

        jQuery("button").click(function () {

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

        });

        setInterval(buttonRearrangement, 1000);

        /*<---------------------------------------------- MASS EXPORT -------------------------------------------------------------------------------->*/


        const massExportButton = document.createElement('button');
        massExportButton.textContent = 'Export Mind';

        // Set button styles
        massExportButton.style.position = 'absolute';
        massExportButton.style.top = '79px';
        massExportButton.style.left = '606px';
        massExportButton.style.zIndex = '9999';
        massExportButton.title = "Minden kijelölt elem exportálása"

        // Append the button to the body of the document
        document.body.appendChild(massExportButton);

        var massExport = function () {
            let ajanlatokLista = "#maindiv > div:nth-child(1) > div:nth-child(1) > form:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div";

            const selectedAjanlatIndex = [];
            const selectedAjanlatLink = [];

            document.querySelectorAll(ajanlatokLista).forEach((element, index) => {         // note selected items
                if(element.className.includes("selected")){
                    selectedAjanlatIndex.push(index);

                    selectedAjanlatIDLookup = (ajanlatokLista + ":nth-child(" + (index+1) + ")" + "> table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(4) > div:nth-child(1) > a").toString();
                
                    selectedAjanlatID = document.querySelector(selectedAjanlatIDLookup).onclick.toString().match(/(\d(\d?)*\d)/)[0].toString();

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
                button.style.visibility = "hidden";

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
                button.style.visibility = "visible";

                jQuery('.tu-header-cont > div:nth-child(6)').hide();                        // centerdiv
                jQuery('.tu-header-cont > div:nth-child(1) > img:nth-child(1)').hide();     // terc img

            }
            if ((lastPage == "innerPage") && (currentPage == "frontPage")) {            // belülről kifele váltás
                clearInterval(szumInterval);
                massExportButton.style.visibility = "visible";
                button.style.visibility = "hidden";

                jQuery('.tu-header-cont > div:nth-child(6)').hide();                        // centerdiv
                jQuery('.tu-header-cont > div:nth-child(1) > img:nth-child(1)').hide();     // terc img
            }

            //console.log("lastPage: " + lastPage + "  ||  currentPage: " + currentPage);
            lastPage = currentPage;


        }

        setInterval(freshPage, 1000);


    });
})();
