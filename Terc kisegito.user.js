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

    var zNode = document.createElement ('div');
    zNode.innerHTML = '<button id="myButton" type="button">'
                    + 'For Pete\'s sake, don\'t click me!</button>'
                    ;
    zNode.setAttribute ('id', 'myContainer');
    document.body.appendChild (zNode);

    //--- Activate the newly added button.
    document.getElementById ("myButton").addEventListener (
        "click", run, false
    );


    //jQuery("span.x-panel-header-text").append("bruh");

    var run = function(){
        let anyagOssz = Number(document.querySelector("div#tea-igrid.x-panel.grid-fit.x-grid-panel").children[0].children[0].children[4].textContent.split("\xA0").join(""));
        let dijOssz = Number(document.querySelector("div#tea-igrid.x-panel.grid-fit.x-grid-panel").children[0].children[0].children[6].textContent.split("\xA0").join(""));

        let teljesOssz = anyagOssz + dijOssz;

        let teljesOsszSzoveg = " | Teljes összeg: " + teljesOssz.toLocaleString() + " Ft";


        jQuery("span.x-panel-header-text").append(teljesOsszSzoveg);
    }

    //if (document.body.contains(jQuery("span.x-panel-header-text"))) {
    //    run
    //}
})();