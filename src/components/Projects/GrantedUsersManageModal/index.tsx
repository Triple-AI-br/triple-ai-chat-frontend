import { Button, Form, Input, List, Modal, Popover, Space, Typography } from "antd";
import { IGrantedUsers, projectService } from "../../../services";
import { useEffect, useState } from "react";
import { IUserDataResponse, usersService } from "../../../services/users";
import { PopoverCotainer } from "./styled";
import { useAppSelector } from "../../../redux/hooks";
import { selectUserData } from "../../../redux/authenticationSlice";

type ManageGrantedUsersModalProps = {
  open: boolean;
  handleConfirm?: (arg?: unknown) => void;
  handleCancel?: (arg?: unknown) => void;
  projectId: string | number;
  usersInProject: IGrantedUsers[];
};

const ManageGrantedUsersModal = ({
  open,
  handleConfirm,
  handleCancel,
  projectId,
  usersInProject,
}: ManageGrantedUsersModalProps) => {
  const userData = useAppSelector(selectUserData);

  const [userList, setUserList] = useState<IUserDataResponse[]>([]);
  const [filteredUserList, setFilteredFilterList] = useState<IUserDataResponse[]>(userList);
  const [openPopover, setOpenPopover] = useState<number | false>(false);
  const [usersToInvite, setUsersToInvite] = useState<string[]>([]);

  const resetUserList = () => setFilteredFilterList(userList);

  useEffect(() => {
    (async () => {
      const users = await usersService.listUsers();

      const emailsAlreadyinProject = usersInProject.map((user) => user.email);
      const filterUsersAlreadyInProject = users.filter(
        (user) => !emailsAlreadyinProject.includes(user.email) && user.id !== userData?.id,
      );

      setUserList(filterUsersAlreadyInProject);
      setFilteredFilterList(filterUsersAlreadyInProject);
    })();
  }, [usersInProject]);

  const onConfirm = async () => {
    await Promise.all(
      usersToInvite.map(async (userEmail) => {
        const schema = {
          projectId,
          email: userEmail,
          permissions: [],
        };
        await projectService.inviteUserToProject(schema);
      }),
    );
    if (handleConfirm) {
      handleConfirm();
    }
  };

  const onInviteUser = (email: string) => {
    setUsersToInvite((prev) => [...prev, email]);
    setFilteredFilterList((prev) => prev.filter((user) => user.email !== email));
    setOpenPopover(false);
  };

  const ListHeader = () => {
    return (
      <Form
        layout="vertical"
        onFinish={(e) =>
          setFilteredFilterList((prev) =>
            prev.filter((people) => people.email.includes(e.user || "")),
          )
        }
      >
        <Form.Item name="user" required={false} label="Find users:">
          <Space.Compact style={{ width: "100%" }}>
            <Input onChange={(e) => e.target.value === "" && resetUserList()} allowClear={true} />
          </Space.Compact>
        </Form.Item>
      </Form>
    );
  };

  return (
    <Modal
      open={open}
      title={"Add new user to project"}
      onOk={async () => await onConfirm()}
      onCancel={handleCancel}
      destroyOnClose={true}
      afterClose={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="confirm" type="primary" onClick={async () => await onConfirm()}>
          Submit
        </Button>,
      ]}
    >
      <List
        style={{
          width: "100%",
          maxHeight: "600px",
          overflowY: "scroll",
        }}
        header={ListHeader()}
        footer={<div>{userList.length} users</div>}
        bordered={true}
        dataSource={filteredUserList}
        itemLayout="horizontal"
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <Popover
                key="list-loadmore-more"
                content={
                  <PopoverCotainer>
                    <a onClick={() => onInviteUser(item.email)}>Add to Project</a>
                  </PopoverCotainer>
                }
                trigger="click"
                open={openPopover === index}
                onOpenChange={() => setOpenPopover((prev) => (!prev ? index : false))}
              >
                <a onClick={() => setOpenPopover((prev) => (!prev ? index : false))}>Add</a>
              </Popover>,
            ]}
          >
            <Typography.Text> {item.email}</Typography.Text>
          </List.Item>
        )}
      />
    </Modal>
  );
};

export { ManageGrantedUsersModal };
