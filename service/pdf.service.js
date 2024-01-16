import fs from 'fs';
import PDFDocument from 'pdfkit';
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

class PDFExporter {
  constructor(data, filename, title, headers) {
    this.data = data;
    this.outputPath = __dirname + '../public/export/' + filename;
    this.title = title;
    this.headers = headers;
    this.doc = new PDFDocument({ margin: 50 });
  }

  generateHeader() {
    const logo = __dirname + '../public/Logo.png';

    this.doc.image(logo, 50, 45, { width: 50 })
      .fillColor('#444444')
      .fontSize(20)
      .text('Exam SUrvey - ' + this.title, 110, 57)
      .fontSize(10)
      .text('Plot No. 41, Phase II,', 200, 65, { align: 'right' })
      .text('HITEC City, Hyderabad, TL 500081', 200, 80, { align: 'right' })
      .moveDown();
  }

  generateTableRows() {
    const marginTop = 120;
    // let 
    this.headers.forEach((h) => {
      this.doc.fontSize(12).text(h.header, h.width, marginTop);
    });

    const keys = this.headers.map(obj => obj['key']);
    for (let d in this.data) {
      const positionY = marginTop + (d + 1) * 30;
      let positionX = 50;
      let i = 1;
      for (let k of keys) {
        this.doc.fontSize(10).text(this.data[d][k], positionX * i, positionY);
        i ++;
      }
    }
  }



  exportToPdf() {
    try {
      this.generateHeader();
      this.generateTableRows();
      this.doc.end();
      console.log('this.outputPath ', this.outputPath);
      this.doc.pipe(fs.createWriteStream(this.outputPath));
    } catch (error) {
      console.log('export error ', error);
    }
  }
}

export default PDFExporter;
