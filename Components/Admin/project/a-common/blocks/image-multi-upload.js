import React, { useEffect, useState } from "react";
import { Upload, message } from "antd";
import {
  InboxOutlined,
  CloseOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Grid, UplWrapper } from "./__styles";
import { Text14 } from "../../../../common/text";

const { Dragger } = Upload;

const ImageMultiUploader = ({
  value: imageUrls = [],
  onChange: setImageUrls,
  label,
  maxImages = 10,
}) => {
  const [uploading, setUploading] = useState(false);

  console.log("imageUrls", imageUrls);

  const handleUpload = async (_file) => {
    setUploading(true);

    if (!_file) return;
    const { file } = _file;

    try {
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
          .post("/api/upload/upload", {
            id: uuidv4(),
            thumbnail_img: imgBase64,
          })
          .then((res) => {
            const { data = {} } = res;
            const { url } = data;

            setImageUrls([...imageUrls, url]);
            message.success("Upload successful!");
            setUploading(false);
          });
      };
    } catch (error) {
      console.log(error);
      message.error("Upload failed.");
      setUploading(false);
    }
  };

  const handleRemove = (url) => {
    setImageUrls(imageUrls.filter((imageUrl) => imageUrl !== url));
  };

  const uploadProps = {
    name: "file",
    multiple: true,
    accept: "image/*",
    beforeUpload: (file) => {
      if (imageUrls.length >= maxImages) {
        message.warning(`You can only upload up to ${maxImages} images.`);
        return false;
      }
      return true;
    },
    customRequest: handleUpload,
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
