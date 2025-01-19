const ejs = require('ejs');
const puppeteer = require('puppeteer');
const img = require('./getPDFImage')
const path = require('path')

async function generatePDF(data) {
  try {
    const filePath = path.join(__dirname,"pdfTemplate.ejs");

    // Render the HTML template with dynamic data
    const renderedHtml = await ejs.renderFile(filePath, {data,img}, {async: true});

    // Launch a headless Chrome browser
    const browser = await puppeteer.launch({
      headless: 'new',
      executablePath: '/usr/bin/google-chrome-stable',
      args: ['--no-sandbox'],
    });

    // Create a new page
    const page = await browser.newPage();

    // Set the content of the page to the rendered HTML
    await page.setContent(renderedHtml);

    // Generate a PDF from the page content
    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });

    // Close the browser
    await browser.close();

    return pdfBuffer;
  } catch (error) {
    throw error;
  }
}

module.exports = { generatePDF };