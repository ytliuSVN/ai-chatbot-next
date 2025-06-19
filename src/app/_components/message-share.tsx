import { Modal } from "antd";
import React from "react";
import {
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
} from "react-share";

function MessageShare({
  open,
  setOpen,
  messageToShare,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  messageToShare: string;
}) {
  return (
    <Modal
      title="Share Message"
      open={open}
      onCancel={() => setOpen(false)}
      centered
      footer={null}
    >
      <div className="flex gap-5 my-4">
        <LinkedinShareButton url={messageToShare}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>

        <TwitterShareButton url={messageToShare}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>

        <FacebookShareButton url={messageToShare}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
      </div>
    </Modal>
  );
}

export default MessageShare;
