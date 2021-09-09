# Aplikace TableTime

*Semestrální práce pro předmět KAJ, ČVUT v Praze*

Autor: **Dominik Kouba**

## Specifikace

Jedná se o single-page aplikaci, která uživateli umožní tvorbu vlastního rozvhu.

### Funkční požadavky

**Systém umožní uživateli:**

* Vytvořit (nejen) školní rozvrh
 * Volně přidávat rozvrhové lístky
  * Atributy lístku: název, den, čas od, čas do, popř. doba trvání, popis (poznámka), místo, přiložený soubor
* Zobrazit celý rozvrh (0-23, PO-NE)
* Zobrazit detail rozvrhového lístku se všemi atributy
* Přidat k právě vytvářené události místo automaticky na základě své vlastní polohy
* Měnit rozsah zobrazované části rozvrhu

### Nefunkční požadavky
* Aplikace bude responzivní
* Apikace bude kompatibilní se všemi populárními prohlížeči (Opera, Mozilla, Chrome, Edge) v posledních verzích ke dni 5. 6. 2018
* Aplikace se bude spouštět v browseru a data se budou uchovávat v localstorage - žádný backend

### Uživatelské role

* Nepřihlášený uživatel

### Použité technologie

HTML, CSS, JS

## Návod k použití a pokyny pro cvičícího

### Návod k instalaci
Aplikace byla vyvíjena pod buildovacím systémem webpack.
Ke spuštění by měly stačit tyto kroky:
* git clone *tento repozitář*
* npm install
* npm start
* poté již v browseru https://localhost:3000/dist

### Testování aplikace pro účely oznámkování
Uživatelsky lze otestovat zejména přidávání událostí a zobrazení detailu.

Poté zde na gitlabu můžete nahlédnout do zdrojových kódů aplikace.



