const {facturaModel, itemModel} = require('../models/index');

const getFactoryAll = async (req,res)=>{
    const {body} = req;
    const data = await facturaModel.find()
        .populate("cliente",'name email')
        .populate("items",'nameProduct description value category')
    res.json({
        code:"200",
        ok:true,
        facturas:data
    })
}

const createFactura = async (req,res)=>{

   const {items:[..._uid], cliente, methodPay} = req.body;
   //const itemIds = ["64ebc360100fe12da2ba273b", "64ebc5e2fefda8cfb1453662"]; // IDs de los productos
    try {

            const factura = await facturaModel();                        
            //Buscar Producto ID
            const items = await itemModel.find({ _id: { $in: _uid } });
            //console.log("Productos encontrados:", items);
            
            //Contar N?Productos
            const count = await itemModel.countDocuments({ _id: { $in: _uid } });
            
            //obtener valores de productos
            const values = items.map(item => item.value);
        
            // Calcular el subtotal sumando los valores de los productos
            const subtotal = values.reduce((total, value) => total + value, 0);
        
            // Calcular el total sumando el impuesto al subtotal
            const total = subtotal * (1 + factura.tax);
          

            factura.subtotal = subtotal;
            factura.total = total;
            factura.items = items;
            factura.cliente = cliente;
            factura.methodPay  = methodPay;
            factura.nItems = count;
            await factura.save();



            console.log("Valores de 'value':", values);
            console.log("SUBTOTAL':", subtotal);
            console.log("TOTAL':", total);
            res.json({
                code:"200",
                ok:true,
                factura: factura
            })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: "500",
            ok: false,
            error: "Error al calcular la factura"
        });
    }
}

const sendFactura = ()=>{
    const doc = new PDFDocument();

    // Agregar contenido al PDF
    doc.fontSize(14).text('Factura', { align: 'center' });
    doc.text('-----------------------------');

    doc.fontSize(12).text(`Cliente: ${cliente.name}`);
    doc.text('Productos:');
    items.forEach(item => {
        doc.text(`${item.nameProduct}: $${item.value}`);
    });
    doc.text(`Subtotal: $${subtotal}`);
    doc.text(`Total: $${total}`);

    // Generar el PDF y guardarlo en una ubicación temporal
    const pdfPath = path.join(__dirname, 'factura.pdf');
    doc.pipe(fs.createWriteStream(pdfPath));
    doc.end();

    // Enviar el archivo PDF como respuesta
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=factura.pdf');
    fs.createReadStream(pdfPath).pipe(res);

    // Eliminar el archivo temporal después de enviarlo
    fs.unlinkSync(pdfPath);

}


module.exports = {
    createFactura, 
    getFactoryAll,
    
}