// 1. domain beantragen - peer2peer-wwi19dsa.com
// 2. server beantragen (z.B. bei hetzner.de) --> ip addresse .... 
// 3. weiterleitung domain zu ip addresse einrichten 

// am Beispiel haben wir http://127.0.0.1:3000/ bzw. localhost:3000 genutzt = unser lokaler server

// defaultport für http = 80 / für https = 443

import { opine, json } from "https://deno.land/x/opine@1.1.0/mod.ts";
import { writeJsonSync, readJsonSync} from "https://deno.land/x/jsonfile/mod.ts";


const app = opine();
app.use(json()); // for parsing application/json

app.get("/", function (req, res) {
  const pathToHTMLOnServer = `${Deno.cwd()}\\login.html`
  // const pathToHTMLOnServer = './login.html' // warum hat das iwann funktioniert = offen 
  res.sendFile(pathToHTMLOnServer);
});


var daten = arrayAuslesen() as Array<{}>;

function arrayAuslesen(){
    
  //let daten: Array<{}> = new Array();
  var tempDaten = readJsonSync("./Nutzerdaten.json");
  console.log("Nutzerdaten vorher: ",tempDaten)
  return tempDaten;
}

// var nutzerMail = eingabeDict.Sign_Up_Email;

var schonVorhanden = false;

function userAnlegen(pDaten:any, pNutzerMail: String, pDict: {}){

  for (var i = 0; i < pDaten.length; i++){
    var aktuellesDict = pDaten[i];

    if(aktuellesDict.Sign_Up_Email==pNutzerMail){

        console.log("Nutzer ist schon vorhanden");
        schonVorhanden = true;

    }
  }
  if (schonVorhanden==false){
    daten.push(pDict);
    writeJsonSync(
      "./Nutzerdaten.json", daten
    );
  }
  
}


function LoginPrüfen(pDaten:any, pNutzerMail: String, pNutzerPW: String){
  var EmailKorrekt = false;
  var PasswortKorrekt = false;
  for (var i = 0; i < pDaten.length; i++){
    var aktuellesDict = pDaten[i];
    if(aktuellesDict.Sign_Up_Email==pNutzerMail){
      EmailKorrekt = true;
        if(aktuellesDict.Sign_Up_Password==pNutzerPW){
          console.log("Login erfolgreich. Passwort und Email sind korrekt.")
          PasswortKorrekt=true;
        }
    }
  }
  
  if(EmailKorrekt==false){
    console.log("Diese Email ist nicht registriert!");
  }
  if(PasswortKorrekt==false){
    console.log("Das Passwort ist falsch!");
  }
}

app.post("/saveDataToServer", async function (req, res) {

  console.log("Ergebnis body: ", req.body);

  var eingabeDict = req.body;

  userAnlegen(daten,eingabeDict["Sign_Up_Email"],eingabeDict);

  res.send('fertig mit Anlegen')
      
});

app.post("/saveLoginDataToServer", async function (req, res) {

  var daten2 = arrayAuslesen() as Array<{}>;
  var eingabeDict = req.body;
  LoginPrüfen(daten2,eingabeDict["Sign_In_Email"],eingabeDict["Sign_In_Password"]);

  res.send('fertig mit Prüfen')
      
});

app.listen(3000);
