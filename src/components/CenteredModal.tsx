import { Modal, Paper } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
  maxHeight: "70vh",
  overflow: "auto",
};

const CenteredModal: React.FC<Props> = ({ children, open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Paper sx={style}>{children}</Paper>
    </Modal>
  );
};

export default CenteredModal;
