import { writeJsonSync, readJsonSync} from "https://deno.land/x/jsonfile/mod.ts";
//Lade Read + Write Function


//Block - Daten lesen / auswerten #############################

var daten = await readJsonSync("./dateiname.json");
//Daten auslesen und zwischenspeichern


//Block - Daten Schreiben #############################

// var daten = [];    //-> nur wenn es komplett neue Daten wären

daten.push({ attribut:"daten" });  // = appendLine 
                                   // Nutzerdaten benötigen mindestens Attribut Key


writeJsonSync(                     // export, Standardfunktion
    "./dateiname.json", daten
  );

//####################################################




// Nutzerdaten anhand des Attributs .key entnehmen
function getUserData(pdata, pkeyvalue){

    var index=0;

    for (var i=0; i < pdata.length; i++){
        if ( pdata[i].key ==pkeyvalue){
            index=i;
        }
    }

    if (index != 0){
        return (pdata[index])                   //-> nur auslesenn, wenn daten bearbeitet werden soll, dann muss pdata.splice[index, 1] verwendet werden 
    } else {                                    //-> zwingend dann auch Write befehl, oder: Dritter Parameter in Splice zum überschreiben
        console.log("Error: User Not Found")
    }
    
}

var readData = getUserData(daten, "keyvalue");

//Ausgelesen Nutzerdaten sind dann als Json onject zwischengespeichert und können ganz normal weiterverarbeitet werden


//Beispiel 
function wertPrüfen(pData, pValue){

    if(pData.attribut==pValue){

        console.log("STIMMT!");

    }else{

        console.log("STIMMT NICHT!");
    }
}

wertPrüfen(readData, wert);


//####################################################



