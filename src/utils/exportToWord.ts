import saveAs from "file-saver";
import { asBlob } from "html-docx-js-typescript";

const Export2Word = (divId: string, fileName: string) => {
  const html = document.getElementById(divId)?.innerHTML;
  if (!html) return;

  asBlob(`${html}`).then((data) => {
    saveAs(data as Blob, fileName + ".docx"); // save as docx file
  }); // asBlob() return Promise
};

export { Export2Word };
