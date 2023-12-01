// ==UserScript==
// @name         Terc kisegito
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Kiírja a teljes összeget mindig, nem kell kikattintani
// @author       You
// @match        https://www.etalon.terc.hu/browser
// @run-at       document-end
// @icon         https://www.google.com/s2/favicons?sz=64&domain=terc.hu
// @require      https://code.jquery.com/jquery-3.6.4.min.js#sha256-oP6HI9z1XaZNBrJURtCoUT5SUnxFr8s3BzRl+cbzUq8=
// @grant        none
// ==/UserScript==

(function() {
    jQuery(document).ready(function(){

        jQuery("#tu-header > div > div:nth-child(1) > img").hide();
        //document.getElementById ("myButton").addEventListener ("click", run, false);


        jQuery("#tu-header > div > div:nth-child(1)").append("<button id=\"myButton\" type=\"button\">Teljes összeg</button>")

    //jQuery("span.x-panel-header-text").append("bruh");

        var run = function(){
            let anyagOssz = Number(document.querySelector("#tea-igrid > div:nth-child(1) > span:nth-child(1) > span:nth-child(5)").textContent.split("\xA0").join(""));
            let dijOssz = Number(document.querySelector("#tea-igrid > div:nth-child(1) > span:nth-child(1) > span:nth-child(7)").textContent.split("\xA0").join(""));

            let teljesOssz = anyagOssz + dijOssz;

            let teljesOsszSzoveg = "<span>Teljes összeg: " + teljesOssz.toLocaleString() + " Ft<\span>";



            document.querySelector("#tea-igrid > div:nth-child(1) > span:nth-child(1) > span:nth-child(1)").outerHTML = teljesOsszSzoveg;
        }
        document.getElementById ("myButton").addEventListener ("click", run, false);
    //if (document.body.contains(jQuery("span.x-panel-header-text"))) {
    //    run
    //}
    });
})();
