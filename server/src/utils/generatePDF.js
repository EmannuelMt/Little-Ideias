const { PDFDocument, rgb } = require('pdf-lib');
const fontkit = require('@pdf-lib/fontkit');

exports.generatePDF = async (idea) => {
  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);
  
  const page = pdfDoc.addPage([600, 400]);
  const { width, height } = page.getSize();
  
  // Adiciona conteúdo ao PDF
  page.drawText(idea.name, {
    x: 50,
    y: height - 50,
    size: 20,
    color: rgb(0, 0, 0),
  });
  
  // Adiciona mais detalhes da ideia...
  
  return await pdfDoc.save();
};