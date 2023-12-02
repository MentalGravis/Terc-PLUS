# Terc-PLUS
Terc felhasználói felület javítása

**!! Tapasztalatlan programozó fércmunkája, az esetleges hibákért felelősséget nem tudok vállalni !!**

## Funkciók

1. Az *"Összes munkanem"* szöveg helyén az ajánlat teljes ára található, amit az *"Anyag összesen"* és *"Díj összesen"* számok összeadásából számol ki
1. A *"SZERKESZTÉS:{adott projekt címe}"* felkerül a fejlécbe
1. Az előbbi érdekében mind a Terc-etalon logó, mind a középső terc.hu-ra mutató hivatkozás, mind az email elrejtésre került
1. A cím helyére bekerültek azok a vezérlőgombok, melyek ettől jobbra helyezkednek el
1. Egy bal felső sarokban található gombbal elrejthető/megjeleníthető az *"Összesítők fedlapok"* és a *"Visszalépés"* gombokon kívüli vezérlőelemek

## Képek

**Minden menügombbal**<br>
<picture>
<img alt="Minden menügombbal" src="img/menu_with_buttons.png"><br>
</picture>
**Csak a Összesítők fedlapok és a Visszalépés gombokkal**<br>
<picture>
<img alt="Csak a Összesítők fedlapok és a Visszalépés gombokkal" src="img/menu_without_buttons.png">
</picture>

## Telepítés

A szkript a legtöbb modern böngészőre telepíthető.<br>

1. Telepítsd a **TamperMonkey** kiegészítőt az alábbi oldalak egyikéről:
    * [Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey)
    * [Google Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
    * [Legacy Microsoft Edge](https://www.microsoft.com/store/apps/9NBLGGH5162S)
    * [Új Microsoft Edge](https://microsoftedge.microsoft.com/insider-addons/detail/iikmkjmpaadaobahmlepeloendndfphd)
    * [Opera](https://addons.opera.com/en/extensions/details/tampermonkey-beta)
    * [Safari](https://apps.apple.com/us/app/tampermonkey/id1482490089)
1. Most már telepítheted a Terc-PLUS szkriptet. Ehhez [kattints ide](https://github.com/MentalGravis/Terc-PLUS/releases/latest/download/Terc.PLUS.user.js).
1. A megjelenő oldalon kattints az **Install** gombra.
1. Lépj be a Terc-etalon-ba, és használd egészséggel.

## Jelenleg ismert hibák

Ha új hibát észlelsz, vagy új funkció beépítésére szeretnél ajánlatot tenni, [itt megteheted](https://github.com/MentalGravis/Terc-PLUS/issues)

- [ ] [Néha a menüsor gombaji furcsán jelennek meg, és a fejlécbe lógnak](https://github.com/MentalGravis/Terc-PLUS/issues/2)
- [ ] [Néha több ajánlat megnyitása utána a címsor helye üresen megmarad, ami a fejléc szétcsúszásához vezet](https://github.com/MentalGravis/Terc-PLUS/issues/3)
- [ ] [(Opcionális) Ajánlat teljes árának pénzneme fekete, míg a sorban a többi mértékegység kék](https://github.com/MentalGravis/Terc-PLUS/issues/4)