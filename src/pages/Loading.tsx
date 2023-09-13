import { Spin, Typography } from "antd";

const LoadingPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        gap: "1rem",
      }}
    >
      <Spin size="large" />
      <Typography>Give us a moment...</Typography>
    </div>
  );
};

export { LoadingPage };
