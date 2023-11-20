import mammoth from "mammoth/mammoth.browser";
// IMPORTANT: This file must be javascript instead typescript because mammoth for browser hasnt types

const useConvertFile = () => {
  const docxToHtml = (input) => {
    const converted = input.file.arrayBuffer().then((result) => {
      const html = mammoth
        .convertToHtml({ arrayBuffer: result })
        .then((result) => result.value)
        .catch((err) => console.log(err));

      return html;
    });

    return converted;
  };

  return {
    docxToHtml,
  };
};

export { useConvertFile };
