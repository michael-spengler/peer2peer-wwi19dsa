import { opine } from 'https://deno.land/x/opine/mod.ts'

const app: any = opine()

app.get('/', function(req: any, res: any): any {

    const pathToOurHTMLFile = `${Deno.cwd()}/index.html`
    
    res.sendFile(pathToOurHTMLFile)

})


app.listen(3000)


// export class Server {

//     public sayHello() {
//         console.log('hello students')
//     }
// }

// const ourServerInstance = new Server()

// ourServerInstance.sayHello()