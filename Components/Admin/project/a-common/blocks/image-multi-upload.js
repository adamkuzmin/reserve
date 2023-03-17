import React, { useEffect, useState } from "react";
import { Upload, message, notification } from "antd";
import {
  InboxOutlined,
  CloseOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Grid, UplWrapper } from "./__styles";
import { Text14 } from "../../../../common/text";
import pako from "pako";
import handleImageUpload from "./upload/upload";

const { Dragger } = Upload;

const ImageMultiUploader = ({
  value: imageUrls = [],
  onChange: setImageUrls,
  label,
  maxImages = 10,
}) => {
  const [uploading, setUploading] = useState(false);

  const handleUpload = (file) => {
    setUploading(true);

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const imgBase64 = reader.result;

      try {
        handleImageUpload(imgBase64, (url) => {
          setImageUrls([...imageUrls, url]);
          message.success("Изображение успешно загрузилось!");
          setUploading(false);
        });
      } catch (e) {
        setUploading(false);
      }
    };
  };

  const handleRemove = (url) => {
    setImageUrls(imageUrls.filter((imageUrl) => imageUrl !== url));
  };

  const uploadProps = {
    name: "file",
    multiple: true,
    accept: ".jpg,.png",
    beforeUpload: (file) => {
      if (imageUrls.length >= maxImages) {
        notification.error({
          message: `You can only upload up to ${maxImages} images.`,
          placement: "bottom",
        });
        return false;
      }
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
    customRequest: ({ file }) => handleUpload(file),
    showUploadList: false,
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

        <Grid>
          {imageUrls &&
            imageUrls.map((imageUrl) => (
              <div key={imageUrl} className="img_thumb">
                <div
                  style={{ width: "100%", height: "100%" }}
                  className="img_thumb_child"
                >
                  <img src={imageUrl} alt="Uploaded image" />
                </div>
                <div
                  className="image-uploader-remove"
                  onClick={() => handleRemove(imageUrl)}
                >
                  <CloseOutlined />
                </div>
              </div>
            ))}

          <Dragger {...uploadProps} style={{ width: "100%" }}>
            {imageUrls.length < maxImages && (
              <div className="image-uploader-preview image-uploader-add">
                {uploading ? (
                  <LoadingOutlined />
                ) : (
                  <>
                    <p
                      className="ant-upload-drag-icon"
                      style={{ fontSize: "44px" }}
                    >
                      +
                    </p>
                    <p className="ant-upload-text">
                      <Text14>Изображение должно быть не больше</Text14>
                    </p>
                  </>
                )}
              </div>
            )}
          </Dragger>
        </Grid>
      </UplWrapper>
    </>
  );
};

export default ImageMultiUploader;
