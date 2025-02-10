import React from "react";
import { Dropdown, DropdownItem } from "@/common/components/Dropdown";
import { Button } from "@/common/components/button";
import Edit2Outline from "@/assets/icons/components/Edit2Outline";
import Trash from "@/assets/icons/components/Trash";
import styles from "./PostModal.module.scss";

type Props = {
  openDelete?: () => void
  setModalType?: (modalType: "edit" | "view") => void
}
const PostModalHeader = ({ openDelete, setModalType }: Props) => {


  return (
    <header className={styles.header}>
      <div>
        userName
      </div>
      <div className={styles.menu}>
        <Dropdown
          trigger={<div className={styles.ellipse}>...</div>}
          align={"end"}>
          <DropdownItem>
            <Button
              variant={"link"}
              onClick={() => (setModalType ? setModalType("edit") : "")}
            >
              <Edit2Outline />
              Edit
            </Button>

          </DropdownItem>
          <DropdownItem>
            <Button
              variant={"link"}
              onClick={() => (openDelete ? openDelete() : "")}>
              <Trash />
              Delete
            </Button>
          </DropdownItem>

        </Dropdown>
      </div>

    </header>
  );
};

export default PostModalHeader;