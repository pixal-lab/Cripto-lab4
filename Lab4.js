/* global CryptoJS */
// ==UserScript==
// @name         Cripto Lab 4
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Pablo Ahumada
// @match        https://cripto.tiiny.site/
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js#sha512=a+SUDuwNzXDvz4XrIcXHuCf089/iJAoN4lmrXJg18XnduKK6YlDHNRalv4yd1N40OKI80tFidF+rqTFKGPoWFQ==
// ==/UserScript==

(function() {
    'use strict';

    // Parte 1
    var key = document.querySelector('body > p').textContent.match(/[A-Z]/g).join("");
    console.log("La llave es: " + key);

    // Parte 2
    var divs = document.querySelectorAll('div');
    var n = divs.length
    console.log('Los mensajes cifrados son: ', n);


    // Parte 3
    var keyP = CryptoJS.enc.Utf8.parse(key);
    var config = { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 };

    divs.forEach(function(div, index) {
        var divId = div.id;
        var enc = { ciphertext: CryptoJS.enc.Base64.parse(divId) }
        var decrypted = CryptoJS.TripleDES.decrypt( enc , keyP , config ).toString(CryptoJS.enc.Utf8);
        console.log(divId , decrypted);

        var p = document.createElement('p');
        p.textContent = decrypted;
        div.appendChild(p);

    });
})();