import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { getAvatarFromEmail } from "../../../utils/getAvatarFromEmail";

const AllMemberModal = ({ allOpen, handleAllOpen, members, author }) => {
  return (
    <Dialog
      open={allOpen}
      handler={handleAllOpen}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
      <DialogHeader>
        <div className="">
          <p>Author</p>
          <div className="w-50 bg-green-200 p-2 flex">
            <p className=" rounded-md p-2 mr-6 -ml-16 text-center mx-auto rotate-90">
              {author.name}
            </p>
            <img src={author.avatar} alt="" className="rounded" />
          </div>
        </div>
      </DialogHeader>

      <h1 className="font-bold text-xl ml-6">Available Members.</h1>
      <DialogBody>
        <div className="flex gap-4 flex-wrap justify-center items-center">
          {members.map((member, i) => {
            const { image, name } = getAvatarFromEmail(member);
            return (
              <div key={i} className="w-20 bg-green-200 p-2 ">
                <p className=" rounded-md p-2 ">{name}</p>
                <img src={image} alt="" className="rounded" />
              </div>
            );
          })}
        </div>
      </DialogBody>
      <DialogFooter>
        <Button variant="gradient" color="green" onClick={handleAllOpen}>
          Close
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default AllMemberModal;
