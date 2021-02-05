// 1. domain beantragen - peer2peer-wwi19dsa.com
// 2. server beantragen (z.B. bei hetzner.de) --> ip addresse .... 
// 3. weiterleitung domain zu ip addresse einrichten 

// am Beispiel haben wir http://127.0.0.1:3000/ bzw. localhost:3000 genutzt = unser lokaler server

// defaultport für http = 80 / für https = 443

import { opine, json } from "https://deno.land/x/opine@1.1.0/mod.ts";
import { writeJsonSync, readJsonSync} from "https://deno.land/x/jsonfile/mod.ts";

var daten = readJsonSync("./Nutzerdaten.json");

const app = opine();
app.use(json()); // for parsing application/json

app.get("/", function (req, res) {
  const pathToHTMLOnServer = './login.html'
  res.sendFile(pathToHTMLOnServer);
});

app.post("/saveDataToServer", async function (req, res) {

  // console.log("Ergebnis req: ", await req)
  // console.log("Ergebnis body: ", await req.body)
  console.log("Ergebnis body: ", req.body)
  // console.log("Ergebnis res: ", await res)
  // console.log("Res req: ", await res.req)
  
  // console.log("res ausgeben: ",res)
  res.send('fertig')
      
});

app.listen(3000);