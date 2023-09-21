import { Base } from "../layouts/Base";
import "react-multi-email/dist/style.css";
import { useEffect, useState } from "react";
import { Box, Divider, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IUserDataResponse, usersService } from "../services/users";
import { UserInvite } from "../components/Admin";
import { useTranslation } from "react-i18next";

const AdminPage = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState<IUserDataResponse[]>([]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70, type: "number" },
    { field: "email", headerName: "Email", width: 350 },
    {
      field: "is_admin",
      headerName: "Admin",
      type: "boolean",
      width: 100,
    },
    {
      field: "is_active",
      headerName: t("pages.admin.components.userTable.active"),
      type: "boolean",
      width: 100,
    },
    {
      field: "confirmed_email",
      headerName: t("pages.admin.components.userTable.emailConfirmed"),
      type: "boolean",
      width: 150,
    },
  ];

  useEffect(() => {
    (async () => {
      const data = await usersService.listUsers();
      setUsers(data);
    })();
  }, []);

  return (
    <Base title={t("pages.admin.title")}>
      <Box display="flex" flexDirection="column" gap={3}>
        <Typography variant="h5" component="h2" color="#555">
          {t("pages.admin.components.userTable.title")}
        </Typography>
        <DataGrid
          rows={users}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 20]}
          rowSelection={false}
          localeText={{
            MuiTablePagination: {
              labelDisplayedRows: ({ from, to, count }) =>
                `${from} - ${to} ${t("pages.admin.components.userTable.of")} ${count}`,
              labelRowsPerPage: t("pages.admin.components.userTable.rowsPerPage"),
            },
          }}
          disableColumnSelector
          disableDensitySelector
          disableRowSelectionOnClick
          showCellVerticalBorder
          sx={{ backgroundColor: "#fff", border: "1px solid #aaa" }}
        />
        <Divider />
        <Typography variant="h5" component="h2" color="#555">
          {t("pages.admin.components.inviteInput.title")}
        </Typography>
        <UserInvite />
      </Box>
    </Base>
  );
};

export { AdminPage };
