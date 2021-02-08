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
  const pathToHTMLOnServer = './login.html'
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

function userAnlegen(pDaten: any, pNutzerMail: String, pDict: {}) {
  var angelegt = false

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
    angelegt = true;
  }
  
  return angelegt;
}

app.post("/saveDataToServer", async function (req, res) {

  console.log("Ergebnis body: ", req.body);

  var eingabeDict = req.body;
  var angelegt = false;

  angelegt = userAnlegen(daten, eingabeDict["Sign_Up_Email"], eingabeDict);
  
  console.log(angelegt);

  res.send(angelegt)
  //^ Das müsste theoretisch etwas an die html zurücksende, wir wissen aber nicht wie das abgefangen wird
});


app.listen(3000);
