import { Base } from "../layouts/Base";
import "react-multi-email/dist/style.css";
import { useEffect, useState } from "react";
import { Box, Divider, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IUserDataResponse, usersService } from "../services/users";
import { UserInvite } from "../components/Admin";

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
    headerName: "Active",
    type: "boolean",
    width: 100,
  },
  {
    field: "confirmed_email",
    headerName: "Email confirmed",
    type: "boolean",
    width: 150,
  },
];

const AdminPage = () => {
  const [users, setUsers] = useState<IUserDataResponse[]>([]);

  useEffect(() => {
    (async () => {
      const data = await usersService.listUsers();
      setUsers(data);
    })();
  }, []);

  return (
    <Base title="Invite your coworkers">
      <Box display="flex" flexDirection="column" gap={3}>
        <Typography variant="h5" component="h2" color="#555">
                    Current Users
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
          disableColumnSelector
          disableDensitySelector
          disableRowSelectionOnClick
          showCellVerticalBorder
          sx={{ backgroundColor: "#fff", border: "1px solid #aaa" }}
        />
        <Divider />
        <Typography variant="h5" component="h2" color="#555">
                    Invite new Users
        </Typography>
        <UserInvite />
      </Box>
    </Base>
  );
};

export { AdminPage };
