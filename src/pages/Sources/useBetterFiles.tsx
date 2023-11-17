import { FilePdfOutlined, FileTextOutlined, FileWordOutlined } from "@ant-design/icons";
import { ISource } from "../../services";

const useBetterFiles = () => {
  const putIconAndExtension = (files: ISource[]) => {
    const extendedFiles = files.map((file) => {
      let extension = file.media_type;
      let icon = <FilePdfOutlined style={{ fontSize: 25 }} />;

      switch (extension) {
        case "application/pdf":
          extension = "PDF";
          break;
        case "text/plain":
          extension = "TEXT";
          icon = <FileTextOutlined style={{ fontSize: 25 }} />;
          break;
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          extension = "WORD";
          icon = <FileWordOutlined style={{ fontSize: 25 }} />;
          break;
        default:
          break;
      }

      return {
        ...file,
        file_name: file.file_name.split(".")[0],
        media_type: extension,
        icon,
      };
    });

    return extendedFiles;
  };

  return { putIconAndExtension };
};

export { useBetterFiles };
