import saveAs from "file-saver";
import { asBlob } from "html-docx-js-typescript";

const Export2Word = (divId: string, fileName: string = "document") => {
  const html = document.getElementById(divId)?.innerHTML;
  if (!html) return;

  fileName = fileName.includes(".docx") ? fileName : fileName + ".docx";

  asBlob(`${html}`).then((data) => {
    saveAs(data as Blob, fileName); // save as docx file
  }); // asBlob() return Promise
};

export { Export2Word };
