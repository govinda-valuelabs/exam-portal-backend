import fs from 'fs';
import pdfMake from 'pdfmake/build/pdfmake.js';
import pdfFonts from 'pdfmake/build/vfs_fonts.js';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

class PDFExporter {
  constructor(data, outputPath, title, headers) {
    this.data = data;
    this.outputPath = outputPath;
    this.title = title;
    this.headers = headers;
  }

  exportToPdf() {
    try {
      const docDefinition = {
        content: [
          { text: this.title, style: 'header' },
          this.getTable(),
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            alignment: 'center',
            margin: [0, 0, 0, 10],
          },
          tableHeader: {
            bold: true,
            fontSize: 12,
            color: 'black',
            alignment: 'left',
          },
          tableRow: {
            fontSize: 10,
            color: 'black',
            alignment: 'left',
          },
        },
      };

      const pdfDoc = pdfMake.createPdf(docDefinition);

      pdfDoc.getBuffer((buffer) => {
        fs.writeFileSync(this.outputPath, buffer);
        console.log(`PDF file '${this.outputPath}' created successfully!`);
      });
    } catch (error) {
      console.error('Error creating PDF:', error);
    }
  }

  getTable() {
    console.log('this.getBody() ', this.getBody());
    const table = {
      table: {
        headerRows: 1,
        widths: ['*', '*', '*'],
        body: this.getBody(),
      },
      layout: 'lightHorizontalLines',
    }
    return table;
  }
  getBody() {
    return [this.headers].concat(this.data.map(item => this.headers.map(header => item[header])));
  }
}

export default PDFExporter;
