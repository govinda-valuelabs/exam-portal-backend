import ExcelJS from 'exceljs';
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

class ExcelService {
  createWorkbook() {
    return new ExcelJS.Workbook();
  }

  createWorksheet(workbook, sheetName) {
    return workbook.addWorksheet(sheetName);
  }

  defineColumns(worksheet, columns) {
    worksheet.columns = columns;
  }

  addDataToWorksheet(worksheet, data) {
    worksheet.addRows(data);
  }

  saveWorkbook(workbook, fileName) {
    const filePath = __dirname + '../public/export/' + fileName;
    return workbook.xlsx.writeFile(filePath);
  }

  async exportToExcel(data, fileName, sheetName, columns) {
    const workbook = this.createWorkbook();
    const worksheet = this.createWorksheet(workbook, sheetName);

    this.defineColumns(worksheet, columns);
    this.addDataToWorksheet(worksheet, data);

    const result = await this.saveWorkbook(workbook, fileName);
    return result;
  }
}

export default ExcelService;