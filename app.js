const { createBot, createProvider, createFlow, addKeyword,EVENTS } = require('@bot-whatsapp/bot')
const {BaileysProvider, handleCtx} = require('@bot-whatsapp/provider-baileys');

const axios  = require('axios');

const QRPortalWeb = require('@bot-whatsapp/portal')
//const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const UrlFrom="https://zonacute.com/"
//const UrlFrom="http://localhost:5090/"

const flowPrincipal = addKeyword(EVENTS.WELCOME)
.addAction(async(ctx)=>{
    //console.log(ctx.from)
    try{
        const data ={
            number:ctx.from,
            companyId:1,         
            message:ctx.body,         
        }
     //console.log(JSON.stringify(ctx))
     const url=`${UrlFrom}api/Chat/receiveMessage`;
     await axios.post(url,data)
     .then(response=>{
        
     })
     .catch(function (error) {
        console.log(error);
     });
     
    }catch (err){
       console.log(err)
    }
})
const main = async () => {
    try{
        const adapterDB = new MockAdapter()
        const adapterFlow = createFlow([flowPrincipal])
        const adapterProvider = createProvider(BaileysProvider)

        adapterProvider.initHttpServer(3002);
        adapterProvider.http?.server.post('/send-message',handleCtx(async (bot,req,res) => {
            const body = req.body;
            const phone = req.body.phone;
            const messagge = req.body.messagge;

            await bot.sendMessage(phone,messagge,{})
            res.end('Ok')
        }))
        adapterProvider.http?.server.post('/send-image',handleCtx(async (bot,req,res) => {
            const body = req.body;
            const phone = req.body.phone;
            const messagge = req.body.messagge;
            const media = req.body.mediaUrl
            await bot.sendMessage(phone,messagge,{
                media
            })
            res.end('Ok')
        }))
        createBot({
            flow: adapterFlow,
            provider: adapterProvider,
            database: adapterDB,
        })

        QRPortalWeb()
    }catch (err){
        console.log(err)
     }
}

main()
