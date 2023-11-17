const Export2Word = (divId, fileName) => {
  const preHtml =
    "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
  const postHtml = "</body></html>";

  const content = document.getElementById(divId).innerHTML;

  const html = preHtml + content + postHtml;

  const blob = new Blob(["\ufeff", html], {
    type: "application/msword",
  });

  // Specify link url
  const url = "data:application/vnd.ms-word;charset=utf-8," + encodeURIComponent(html);

  // Specify file name
  fileName = fileName ? fileName + ".docx" : "document.docx";

  // Create download link element
  const downloadLink = document.createElement("a");

  document.body.appendChild(downloadLink);

  if (navigator.msSaveOrOpenBlob) {
    navigator.msSaveOrOpenBlob(blob, fileName);
  } else {
    // Create a link to the file
    downloadLink.href = url;

    // Setting the file name
    downloadLink.download = fileName;

    //triggering the function
    downloadLink.click();
  }

  document.body.removeChild(downloadLink);
};

export { Export2Word };
