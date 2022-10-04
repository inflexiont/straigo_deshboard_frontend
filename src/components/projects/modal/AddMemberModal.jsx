import { Combobox } from "@headlessui/react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useAddTeamMemberMutation } from "../../../features/teams/teamApi";
import { useGetUsersQuery } from "../../../features/user/usersApi";

const AddMemberModal = ({ open, handleOpen, members, id }) => {
  const { user } = useSelector((state) => state.auth) || {};
  const { email } = user || {};
  const { data: users } = useGetUsersQuery() || {};
  // add member to database
  const [selectedPerson, setSelectedPerson] = useState("");
  const [query, setQuery] = useState("");
  // to open modal
  const userEmails = users?.map((user) => [user.email]).flat();
  // const filterUserEmail = userEmails?.filter((user) => user !== email);
  var people = userEmails?.filter((word) => !members?.includes(word));
  const filteredPeople =
    query === ""
      ? people
      : people.filter((person) => {
          return person?.toLowerCase().includes(query?.toLowerCase());
        });

  const [addTeamMember] = useAddTeamMemberMutation();
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      addTeamMember({
        id,
        data: { members: [...members, selectedPerson] },
      });
      setSelectedPerson("");
      handleOpen();
    } catch (error) {}
  };
  return (
    <Dialog
      open={open}
      handler={handleOpen}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
      <DialogHeader>Add New Member</DialogHeader>
      <DialogBody>
        <div className="w-full">
          <Combobox value={selectedPerson} onChange={setSelectedPerson}>
            <Combobox.Input
              className="border border-blue-200 w-full h-10 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-blue-500 px-3 py-2 rounded-md"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search the person"
            />
            <Combobox.Options>
              {filteredPeople?.map((person) => (
                <Combobox.Option
                  key={person}
                  value={person}
                  className="w-full h-10  px-3 py-2 bg-blue-50 hover:bg-gray-200 "
                >
                  {person}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Combobox>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={handleOpen}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
        <Button
          variant="gradient"
          color="blue"
          type="submit"
          onClick={handleSubmit}
        >
          <span>Add</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default AddMemberModal;
