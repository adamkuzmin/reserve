import React, { useState } from "react";
import { Upload, message, notification } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { UplWrapper } from "./__styles";
import { Text14 } from "../../../../common/text";

const { Dragger } = Upload;

const ImageSingleUploader = ({
  value: imageUrl,
  onChange: setImageUrl,
  label,
}) => {
  const handleUpload = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const imgBase64 = reader.result.split(",")[1];

      const formData = new FormData();
      formData.append("thumbnail_img", {
        thumbnail_img: imgBase64,
        id: uuidv4(),
      });

      axios
        .post("/api/upload/upload", { id: uuidv4(), thumbnail_img: imgBase64 })
        .then((res) => {
          const { data = {} } = res;
          const { url } = data;

          setImageUrl(url);
          message.success("Upload successful!");
        })
        .catch((err) => {
          console.log(err);
          message.error("Upload failed.");
        });
    };
  };

  const handleRemove = () => {
    setImageUrl("");
  };

  const uploadProps = {
    name: "file",
    multiple: false,
    accept: ".jpg,.png",
    action: handleUpload,
    onRemove: handleRemove,
    showUploadList: false,
    beforeUpload: (file) => {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        notification.error({
          message: "Вы можете загрузить только JPEG или PNG",
          placement: "bottom",
        });
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        notification.error({
          message: "Изображение не может быть больше 2MB!",
          placement: "bottom",
        });
        return false;
      }
      return true;
    },
  };

  return (
    <>
      <UplWrapper>
        {label && (
          <div>
            <h3>
              <Text14>{label}</Text14>
            </h3>
          </div>
        )}

        <Dragger {...uploadProps} style={{ width: "100%" }}>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Uploaded image"
              style={{ width: "100%" }}
            />
          ) : (
            <>
              <p className="ant-upload-drag-icon" style={{ fontSize: "44px" }}>
                +
              </p>
              <p className="ant-upload-text">
                <Text14>Изображение должно быть не больше 2&nbsp;Мб</Text14>
              </p>
            </>
          )}
        </Dragger>
      </UplWrapper>
    </>
  );
};

export default ImageSingleUploader;
