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

    const keys = this.headers.map(obj => obj['key']);
    const columns = this.headers.map(h => h['header']);
    let x = 50;
    let y = 100;
    for (let c of columns) {
      this.doc.fillColor('#009CA3').fontSize(14).text(c, x, y, {
        width: 100
      });
      x = x + 100
    }
    
    // Add table rows
    y = 125;
    this.data.forEach(row => {
      x = 50;
      const values = keys.map(key => row[key]);
      for (let v of values) {
        this.doc.fillColor('#000000').fontSize(10).text(v, x, y, {
          width: 100,
          align: 'justify'
        });
        x = x + 100
      }
      y = y + 40;
    });

    // for (let d in this.data) {
    //   const positionY = marginTop + (d + 1) * 30;
    //   let positionX = 50;
    //   let i = 1;
    //   for (let k of keys) {
    //     this.doc.fontSize(10).text(this.data[d][k], positionX * i, positionY).moveDown();
    //     i ++;
    //   }
    // }
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
