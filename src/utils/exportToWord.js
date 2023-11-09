import htmlDocx from "html-docx-js/dist/html-docx";

const Export2Word = (divId, fileName) => {
  // Obtenha o HTML da div
  const html = document.getElementById(divId)?.innerHTML;
  if (!html) return;
  // Converta o HTML para um array de bytes
  const byteArray = htmlDocx.asBlob(html);

  // Crie um objeto Blob com o array de bytes
  const blob = new Blob([byteArray], {
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });

  // Crie um link de download
  const downloadLink = document.createElement("a");
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = fileName + ".docx";

  // Adicione o link ao corpo do documento
  document.body.appendChild(downloadLink);

  // Execute o clique no link para iniciar o download
  downloadLink.click();

  // Remova o link do corpo do documento
  document.body.removeChild(downloadLink);
};

export { Export2Word };
