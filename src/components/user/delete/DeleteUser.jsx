import {
  Button,
  Dialog,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import React from "react";
import { useDeleteUserMutation } from "../../../features/user/usersApi";
const DeleteUser = ({ DeleteOpen, handleDeleteOpen, id }) => {
  const [deleteUser] = useDeleteUserMutation();
  const handleDeleTeam = () => {
    deleteUser(id);
  };

  return (
    <Dialog
      open={DeleteOpen}
      handler={handleDeleteOpen}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
      <DialogHeader>Are you want to delete this team.</DialogHeader>

      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={handleDeleteOpen}
          className="mr-1"
        >
          Cancel
        </Button>
        <Button variant="gradient" color="red" onClick={handleDeleTeam}>
          Delete
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default DeleteUser;
