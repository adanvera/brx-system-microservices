 // requires
 const { request, response } = require("express");
const fs = require("fs");
const { default: fetch } = require("node-fetch");
 const PDFDocument = require("pdfkit-table");
const Client = require("../models/client");


 const getExtractPDF = async ( req = request, res = response )=>{
    let doc = new PDFDocument({ margin: 30, size: 'A4' });
    const rowsData = req.body
    console.log('Recibimos datos');
    console.log(rowsData);
    let rowToShow = [];
    rowsData.forEach( e => {
        let row =[e.fecha,e.operacion,e.compra,e.venta]
        rowToShow.push(row)
    });
    console.log(rowToShow);
    const table = {
        title: "Title",
        subtitle: { label: 'Subtitle3', fontSize: 20, color: 'green',  },
        subtitle: { label: 'Subtitle3', fontSize: 20, color: 'green',  },
        headers: [ "Fecha", "Operacion", "Compra", "Venta" ],
        rows:rowToShow            
        
            ,
        
        
    };
    console.log(table);
    await doc.table(table, {
       with:300});

    doc.pipe(res)
    
    doc.end()

 }
 const getExtractPDFGET = async ( req = request, res = response )=>{
    let doc = new PDFDocument({ margin: 30, size: 'A4' });
    const {fechaDesde,fechaHasta} =req.query;
    console.log(req.params);
    const {id:id_client} = req.params
    const {dataValues} = await Client.findOne({where:{id_client}})
    if(!dataValues) return res.json({msg:'cliente no existe'})

    console.log('Obtuvimos el cliente');
    console.log(dataValues);
    const reques =  await fetch("http://localhost:4000/api/operation/extractByDate/49",{
        body:JSON.stringify({fechaDesde,fechaHasta}),
        headers:{
            'content-type':'application/json'
        },
        method:'POST'
    }),response = await reques.json()
    console.log(response);
    const rowsData = response
    let rowToShow = [];
    rowsData.forEach( e => {
        let row =[e.fecha,e.operation,e.compra +' USD',e.venta+ ' USD',e.comision+' %',e.btc,e.usdt]
        rowToShow.push(row)
    });
    
    
        
    

    const table = {
        title: { label: 'Denominacion:'+'\n'+dataValues.name +' '+dataValues.last_name, fontSize: 10, color: 'black',  },
        subtitle: { label: 'Documento: '+dataValues.document+'\n'+'Direccion: '+dataValues.address+'\n'+'Fecha desde: '+fechaDesde+'    '+'Fecha hasta: '+fechaHasta, fontSize: 9, color: 'balck',  },
        
        headers: [ "Fecha", "Operacion", "Compra", "Venta","Comision","BTC","USDT" ],
        rows:rowToShow            
        
            ,
        
        
    };
    await doc.table(table, {columnSpacing: 5,padding: 5,prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
    prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
      doc.font("Helvetica").fontSize(8);
      
      indexColumn === 0 && doc.fontSize
    },});
    
    
    doc.pipe(res)
    
    doc.end()

 }

 module.exports  = {
    getExtractPDF,
    getExtractPDFGET
 }