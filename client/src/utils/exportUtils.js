/**
 * Utilitários para exportação de dados
 */

export const exportToJSON = (data) => {
  try {
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('Erro ao exportar JSON:', error);
    return null;
  }
};

export const exportToPDF = async (idea) => {
  try {
    // Dynamic import para reduzir o bundle size inicial
    const { PDFDocument, rgb } = await import('pdf-lib');
    const { saveAs } = await import('file-saver');
    
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);
    
    const { width, height } = page.getSize();
    const fontSize = 20;
    
    // Adiciona título
    page.drawText(idea.name, {
      x: 50,
      y: height - 50,
      size: fontSize,
      color: rgb(0, 0, 0),
    });
    
    // Adiciona status e prioridade
    page.drawText(`Status: ${idea.status} | Prioridade: ${idea.priority}`, {
      x: 50,
      y: height - 80,
      size: fontSize - 4,
      color: rgb(0.5, 0.5, 0.5),
    });
    
    // Adiciona descrição
    page.drawText(idea.description, {
      x: 50,
      y: height - 120,
      size: fontSize - 6,
      color: rgb(0, 0, 0),
      maxWidth: width - 100,
      lineHeight: fontSize - 6,
    });
    
    // Gera o PDF
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    saveAs(blob, `ideia-${idea.name}.pdf`);
    
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    throw error;
  }
};

export const exportToCSV = (ideas) => {
  const headers = ['Nome', 'Descrição', 'Status', 'Prioridade', 'Categoria'];
  const rows = ideas.map(idea => [
    `"${idea.name}"`,
    `"${idea.description}"`,
    `"${idea.status}"`,
    `"${idea.priority}"`,
    `"${idea.category}"`
  ].join(','));

  const csvContent = [
    headers.join(','),
    ...rows
  ].join('\n');

  return URL.createObjectURL(new Blob([csvContent], { type: 'text/csv' }));
};