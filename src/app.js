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

    //Config. parse json e dados de forms
        app.use(express.json())
        app.use(express.urlencoded({extended: true}))

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
        import mongoConnect from './configs/db.js'
        mongoConnect(app)

    //Rotas
        import home from './routes/home.js'
        import register from './routes/RegisterPersons.js'

    //Configuração de prefixo de rotas
        app.use('/', home)
        app.use('/register', register)

//Conexão com o servidor
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Conectado ao servidor na porta ${PORT}`)
})
