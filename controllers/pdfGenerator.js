// requires
const { request, response } = require("express");
const fs = require("fs");
const { default: fetch } = require("node-fetch");
const PDFDocument = require("pdfkit-table");
const { NUMBER } = require("sequelize");
const Client = require("../models/client");


const getExtractPDFGET = async (req = request, res = response) => {
    let doc = new PDFDocument({ margin: 30, size: 'A4' });
    const { fechaDesde, fechaHasta, typeOperation } = req.query;
    const typeOperations = typeOperation === '0' ? 'Venta' : 'Compra'
    const { id: id_client } = req.params
    const { dataValues } = await Client.findOne({ where: { id_client } })
    if (!dataValues) return res.json({ msg: 'cliente no existe' })

    console.log('Obtuvimos el cliente');
    console.log(dataValues);
    const reques = await fetch("https://backend.brxsgo.com/api/operation/" + "extractByDate/" + id_client, {
        body: JSON.stringify({ fechaDesde, fechaHasta, typeOperation }),
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST'
    }), response = await reques.json()
    console.log(response);
    const rowsData = response
    let rowToShow = [];
    let sumTotalBitcoin = 0
    let sumCliente = 0
    rowsData.forEach(e => {
        let tipoMoneda = e.btc !== '0' ? 'BTC' : 'USDT'
        let montoMoneda = Number(tipoMoneda === 'BTC' ? (e.btc) : e.usdt)
        sumTotalBitcoin += montoMoneda
        let monto = Number(e.compra !== 0 ? e.compra : e.venta)
        sumCliente += monto
        let row = [e.fecha, e.operation, monto + ' USD', e.comision + ' %', tipoMoneda, montoMoneda]
        rowToShow.push(row)
    });

    rowToShow.push(['Total:','',sumCliente+' ','','',sumTotalBitcoin])



    const table = {
        title: { label:'        '+'            '+'                        '+'       BRX' , fontSize: 18, color: 'black', },
        subtitle: {
            label: '            '+'        '+'            '+'            '+'                        '+'                      Asuncion-Paraguay'+'\n'+
            'Denominacion: '+
                dataValues.name + ' ' + dataValues.last_name + '\n' + 'Documento: ' + 
                dataValues.document  +'\n'+
                'Direccion: ' + dataValues.address + '\n' +
                'Tipo de operacion: ' + typeOperations + '\n' +
                'Fecha desde: ' + fechaDesde + '    ' + 'Fecha hasta: ' + fechaHasta, fontSize: 9, color: 'balck',
        },

        headers: ["Fecha", "Operacion", (typeOperation === '1' ? 'Enviado al cliente' : 'Recibido por el cliente'), "Comision", "Tipo de moneda", (typeOperation === '1' ? 'Monto recibido' : 'Monto enviado')],
        rows: rowToShow

        ,


    };
    
    await doc.table(table, {
        columnSpacing: 5, padding: 5, prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
        prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
            doc.font("Helvetica").fontSize(8);

            indexColumn === 0 && doc.fontSize
        },
    });


    doc.pipe(res)

    doc.end()

}

module.exports = {
    getExtractPDFGET
}