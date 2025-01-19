"use client";

import React from "react";
import {
  CardBody,
  Spinner,
  Typography,
  Tooltip,
  IconButton,
  Chip,
} from "@material-tailwind/react";
import { PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/outline";

import { useUserContext } from "@/contexts/UserProvider";
import { useGlobalContext } from "@/contexts/GlobalProvider";
import { useDeleteUser } from "@/hooks/UserHooks";
import { IUser, UserRole } from "@/types/user";
import { SmallTextTable } from "../Text/SmallTextTable";
import Pagination from "../Pagination/Pagination";
import DeleteConfirmationDialog from "../Dialog/DeleteConfirmationDialog";
import { useRouter } from "next/navigation";

interface UserTableProps {}

const TABLE_HEAD = ["ID", "Username", "Name", "Role", "Created At", "Actions"];

export const UserTable: React.FC<UserTableProps> = () => {
  // Basics states
  const { data } = useUserContext();
  const { loading } = useGlobalContext();
  const { pagination, setPagination } = useGlobalContext();
  const { ID, setID } = useGlobalContext();
  const { dialog, setDialog } = useGlobalContext();

  // Hook to delete user
  const { deleteUser } = useDeleteUser();

  // Handle update user
  const handleUpdateUser = (id: number) => {
    setID({ ...ID, update: id });
    setDialog({ ...dialog, form: true });
  };

  // Handle delete dialog
  const handleDeleteDialog = (id: number) => {
    setID({ ...ID, delete: id });
    setDialog({ ...dialog, delete: true });
  };

  const router = useRouter(); // Initialize router hook

  // OnView
  const onView = (id: number) => {
    router.push(`/user/${id}`); // Redirect to user details page
    setID({ ...ID, fetch: id });
  };

  // GetRoleColor
  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return "red";
      case UserRole.AFFTER_SALES_MANAGER:
        return "blue";
      case UserRole.SELLER:
        return "green";
      default:
        return "gray";
    }
  };

  return (
    <CardBody
      className="px-0"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading.table ? (
            <tr>
              <td colSpan={TABLE_HEAD.length} className="p-4 text-center">
                <div className="w-full flex flex-1 justify-center items-center">
                  <Spinner
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  />
                </div>
              </td>
            </tr>
          ) : data && data.length > 0 ? (
            data.map((user: IUser) => {
              const classes = "p-4 border-b border-blue-gray-50";

              return (
                <tr key={user.id}>
                  <td className={classes}>
                    <SmallTextTable text={user.id.toString()} />
                  </td>
                  <td className={classes}>
                    <SmallTextTable text={user.username} />
                  </td>
                  <td className={classes}>
                    <SmallTextTable text={user.name} />
                  </td>
                  <td className={classes}>
                    <div className="w-max">
                      <Chip
                        variant="ghost"
                        value={user.role}
                        color={getRoleColor(user.role)}
                      />
                    </div>
                  </td>
                  <td className={classes}>
                    <SmallTextTable text={user.createdAt} />
                  </td>

                  <td className={`${classes} flex flex-row gap-2`}>
                    <Tooltip content="View User">
                      <IconButton
                        color="blue"
                        onClick={() => onView(user.id)} // Call onView to redirect
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        <EyeIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Edit User">
                      <IconButton
                        color="green"
                        onClick={() => handleUpdateUser(user.id)}
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Delete User">
                      <IconButton
                        color="red"
                        onClick={() => handleDeleteDialog(user.id)}
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={TABLE_HEAD.length} className="p-4 text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination
        totalPages={pagination.totalPages}
        currentPage={pagination.currentPage}
        onPageChange={(page) => {
          setPagination({ ...pagination, currentPage: page });
        }}
      />
      <DeleteConfirmationDialog
        open={dialog.delete}
        handleClose={() => setDialog({ ...dialog, delete: false })}
        handleConfirm={() => {
          deleteUser(ID.delete!);
        }}
        loading={loading.delete}
        message="Are you sure you want to delete this User?"
      />
    </CardBody>
  );
};
