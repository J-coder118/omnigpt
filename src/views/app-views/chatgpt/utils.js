import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import hljs from "highlight.js";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
export const downloadWordDoc = async (contentMarkdown, fileName) => {
  const contentHTML = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(contentMarkdown);

  const source = `data:application/vnd.ms-word;charset=utf-8, ${encodeURIComponent(
    `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <style>
        table {
          border-collapse: collapse;
          width: 100%;
        }
        td, th {
          border: 1px solid #ddd;
          padding: 8px;
        }
        tr:nth-child(even){ background-color: #f2f2f2; }
        th {
          padding-top: 12px;
          padding-bottom: 12px;
          text-align: left;
        }
      </style>
      <title>Export HTML to Word Document with JavaScript</title>
    </head>
    <body>
      ${contentHTML}
    </body>
  </html>`
  )}`;

  const fileDownload = document.createElement("a");
  document.body.appendChild(fileDownload);
  fileDownload.href = source;
  fileDownload.download = fileName;
  fileDownload.click();
  document.body.removeChild(fileDownload);
};

export const downloadAsPdf = (contentMarkdown, fileName) => {
  const documentDefinition = {
    content: [contentMarkdown]
  };

  const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
  pdfDocGenerator.download(fileName);
};

export const downloadCodeFile = (contents, type, name, iExtension) => {
  // Specify the file contents as a string
  const fileContents = contents;

  const extension = hljs.getLanguage(type);
  // Convert the file contents to a Blob object
  const blob = new Blob([fileContents], { type: `application/python` });

  // Create a URL for the Blob object
  const url = URL.createObjectURL(blob);

  // Create a link element and set its attributes
  const linkElement = document.createElement("a");
  linkElement.setAttribute("href", url);
  linkElement.setAttribute(
    "download",
    `${name}.${extension?.aliases[0] || iExtension}`
  );

  // Simulate a click on the link to start the download
  linkElement.click();

  // Release the Blob object URL since it is no longer needed
  URL.revokeObjectURL(url);
};
