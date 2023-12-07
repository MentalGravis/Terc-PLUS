// ==UserScript==
// @name         Terc PLUS
// @namespace    http://tampermonkey.net/
// @version      2.21
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

        //jQuery("#tu-header > div > div:nth-child(1) > img").hide();

        //jQuery("#tu-header > div > div:nth-child(1)").append("<button id=\"myButton\" type=\"button\">Teljes összeg</button>")

        var run = function(){
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

        setInterval(run, 1000)

/*<-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------->*/

        var button = document.createElement("Button");
        button.innerHTML = "Menüsor";
        button.style = "top:0;left:0;position:absolute;z-index: 9999"
        document.body.appendChild(button);



        // if (!(jQuery('#ext-comp-1077 > b:nth-child(1)').is(':visible'))){

        //     let rightMenuRow = document.querySelectorAll('#maindiv > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td');

        // }

        var buttonRearrangement = function(){

            if (!(jQuery('#ext-comp-1077 > b:nth-child(1)').is(':visible'))){
                if ((jQuery('.tu-header-cont > div:nth-child(6)').is(':visible')) || (jQuery('.tu-header-cont > div:nth-child(1) > img:nth-child(1)').is(':visible')) || (jQuery('#tu-header-login').is(':visible'))){

                    jQuery('.tu-header-cont > div:nth-child(6)').hide();                        // centerdiv
                    jQuery('.tu-header-cont > div:nth-child(1) > img:nth-child(1)').hide();     // terc img
                    jQuery('#tu-header-login').hide();                                          // email

                }

                //let topLeftIconspace = document.querySelector('.tu-header-cont > div:nth-child(1)');

                if(!document.querySelector('.tu-header-cont > div:nth-child(1)').innerHTML.includes('SZERKESZTÉS:')){
                    let leftMenu = jQuery('#maindiv > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1)');
                    leftMenu.detach().prependTo('.tu-header-cont > div:nth-child(1)');
                    // if(!document.querySelector('td.x-toolbar-left:nth-child(2)').innerHTML.includes('SZERKESZTÉS:')){
                    //     jQuery('td.x-toolbar-left:nth-child(2)').remove();
                    // }
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

                //jQuery(rightMenuRow(0).toString()).hide();

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

            // for (let i = 1; i <= 13; i++) {
            //     if((i==7) || (i==8) || (i==13)){
            //         if(jQuery(rightMenuRow(i).toString()).is(':visible')){
            //             jQuery(rightMenuRow(i).toString()).show()
            //         }
            //     }else{
            //         jQuery(rightMenuRow(i).toString()).toggle();
            //     }
            // }
        });

        setInterval(buttonRearrangement, 1000);

        /*<------------------------------------------------------------------------------------------------------------------------------>*/

        var massExportButton = document.createElement("Button");
        massExportButton.innerHTML = "Kijelölt ajánlatok exportja";
        massExportButton.style = "top:0;left:0;position:absolute;z-index: 9999"
        massExportButton.body.appendChild(button);

        var massExport = function () {
            let ajanlatokLista = "#maindiv > div:nth-child(1) > div:nth-child(1) > form:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div";

            var downArrow = jQuery.Event("keydown");
            downArrow.which = downArrow.keyCode = 40; // # Some key code value

            var enterButton = jQuery.Event("enter");
            downArrow.which = downArrow.keyCode = 13;
            // e.keyCode = 50;
            // $("input").trigger(e);

            jQuery(ajanlatokLista).each(function(index){
                if (jQuery(this).className.includes("selected")){

                    let konkretAjanlat = ajanlatokLista + ":nth-child(" + (index+1).toString() + ") > table > tbody > tr > td:nth-child(4) > div > div> div > input";

                    let exportOption = "";

                    jQuery(konkretAjanlat).click().trigger(downArrow).trigger(downArrow)
                
                    jQuery("body > div").each(function(index){
                        if(jQuery(this).attr('class').includes("x-combo-list")){
                            console.log(index)
                        }
                    });

                }
            });
        }





        /*<------------------------------------------------------------------------------------------------------------------------------>*/
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

            if ((lastPage == "frontPage") && (currentPage == "innerPage")){
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
            }

            //console.log("lastPage: " + lastPage + "  ||  currentPage: " + currentPage);
            lastPage = currentPage;


        }

        setInterval(freshPage, 2000);


    });
})();
