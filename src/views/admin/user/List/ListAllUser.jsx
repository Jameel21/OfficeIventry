import UiButton from "@/components/form-fields/_utils/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import UserTable from "../_utils/UserTable";
import UiInput from "@/components/form-fields/_utils/UiInput";
import { useGetAllUsers } from "@/store/hooks/UserHooks";
import { getDecodedData } from "@/utils/encryptDecrypt";

const ListAllUser = () => {
  const userDetails = getDecodedData("userData");
  const menuPermission = userDetails?.menuPermission || [];

  const userPermission = menuPermission.find(
    (perm) => perm?.menu?.pageName === "User"
  );

  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, error } = useGetAllUsers({ page, limit, searchTerm });
  const userData = data?.users;

  // const filteredUsers = userData?.filter((user) => {
  //   return user?.userName
  //     .toLowerCase()
  //     .includes(searchTerm.toLocaleLowerCase());
  // });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    console.log("SearchTerm", searchTerm);
  };

  const handleAddUser = () => {
    navigate("/admin/addUser");
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="text-lg font-medium text-slate-700">Users</div>
        <div className="flex items-center gap-2 mt-1">
          <UiInput
            placeholder={"Search by username"}
            inputClassName="h-7 md:h-9 md:w-40 lg:h-11 lg:w-96 hidden sm:flex"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {userPermission?.create && (
            <UiButton
              onClick={handleAddUser}
              className={"w-28 h-7 md:w-40 md:h-11 text-white"}
              variant={"secondary"}
              buttonName={"Create User"}
            />
          )}
        </div>
      </div>
      <div className="mt-7">
        <UserTable
          page={page}
          limit={limit}
          setPage={setPage}
          setLimit={setLimit}
          userData={userData}
          isLoading={isLoading}
          error={error}
          data={data}
        />
      </div>
    </div>
  );
};

export default ListAllUser;
