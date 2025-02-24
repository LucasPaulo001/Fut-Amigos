//Importação dos módulos
    import express from 'express'
    import {create} from 'express-handlebars'
    import dotenv from 'dotenv'
    import path from 'path'
    import { fileURLToPath } from 'url'

//Configurações
    //Config. express
        const app = express()

    //Config. dotenv
        dotenv.config()

    //Config. variáveis para o diretório absoluto
        const __filename = fileURLToPath(import.meta.url)
        const __dirname = path.dirname(__filename)

    //Config. hbs
        const hbs = create({
            extname: 'hbs',
            defaultLayout: 'main',
            layoutsDir: path.join(__dirname, 'views', 'layout'),
            runtimeOptions: {
                allowProtoPropertiesByDefault: true,
                allowProtoMethodsByDefault: true
            }
        })

    //Config da engine
        app.engine('hbs', hbs.engine)
        app.set('view engine', 'hbs')
        app.set('views', path.join(__dirname, 'views'))

    //Config para arquivos estáticos
        app.use(express.static(path.join(__dirname, '../public')))

    //Config. Mongoose
        //em breve...

//Conexão com o servidor
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Conectado ao servidor na porta ${PORT}`)
})
