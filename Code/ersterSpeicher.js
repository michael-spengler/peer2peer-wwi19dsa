import { writeJsonSync, readJsonSync} from "https://deno.land/x/jsonfile/mod.ts";

var daten = [];
daten.push({ name: "john", age: "22", key:"john@" });
daten.push({ name: "ANdre", age: "50", key:"andre@"  });
daten.push({name:"Alex", age:"20", key:"alex@" });

function nutzerdaten(pEmail){
    var index=0;
    for (var i=0; i < test.length; i++){
        if (test[i].key==pEmail){
            console.log("INDEX", i);
            index=i;
        }
    }
    return index;
}

writeJsonSync(
  "./hello_world.json", daten
);


// writeJsonSync(
//     "./hello_world.json",
//     { name: "ANdre", age: "50" },
//     { append: true, spaces: 1 }
//   );

var test = await readJsonSync("./hello_world.json");

function datenAbfragen(pEmail){
    var ergebnis={};
    var a=0;
    a=nutzerdaten(pEmail);
    ergebnis=test[a];
    return ergebnis;
}
var temp={};
temp = datenAbfragen("andre@");
console.log("A", temp)

function alterPrüfen(pAge){
    if(temp.age==pAge){
        console.log("STIMMT!");
    }else{
        console.log("STIMMT NICHT!");
    }
}
alterPrüfen("50");
//console.log(test);
console.log("TEST: ",test);