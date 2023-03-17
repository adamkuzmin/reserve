import React, { useEffect, useState } from "react";
import { Upload, message, notification } from "antd";
import { UplWrapper } from "./__styles";
import { Text14 } from "../../../../common/text";
import handleImageUpload from "./upload/upload";
import { LoadingOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

const ImageSingleUploader = ({
  value: imageUrl,
  onChange: setImageUrl,
  label,
}) => {
  const [uploading, setUploading] = useState(false);
  const [fileToUpload, setFileToUpload] = useState(null);

  useEffect(() => {
    if (!fileToUpload) return;

    const uploadImage = async () => {
      setUploading(true);

      try {
        const imgBase64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(fileToUpload);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });

        await handleImageUpload(imgBase64, (url) => {
          setImageUrl(url);
          message.success("Изображение успешно загрузилось!");
          setUploading(false);
          setFileToUpload(null);
        });
      } catch (error) {
        console.error(error);
        setUploading(false);
        setFileToUpload(null);
      }
    };

    uploadImage();
  }, [fileToUpload]);

  const handleUpload = (file) => {
    setFileToUpload(file);
  };

  const handleRemove = () => {
    setImageUrl("");
  };

  const uploadProps = {
    name: "file",
    multiple: false,
    accept: ".jpg,.png",
    customRequest: ({ file }) => handleUpload(file),
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
            <div style={{ position: "relative" }}>
              {uploading && (
                <div
                  style={{
                    position: "absolute",
                    zIndex: 10,
                    left: "50%",
                    top: "50%",
                    transform: `translate(-50%, -50%)`,
                    background: "white",
                    padding: "10px",
                    borderRadius: "20px",
                  }}
                >
                  <LoadingOutlined />
                </div>
              )}

              <img
                src={imageUrl}
                alt="Uploaded image"
                style={{ width: "100%" }}
              />
            </div>
          ) : (
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
                    <Text14>Изображение должно быть не больше 2МБ</Text14>
                  </p>
                </>
              )}
            </div>
          )}
        </Dragger>
      </UplWrapper>
    </>
  );
};

export default ImageSingleUploader;

//const compressedData = pako.gzip(imgBase64);

/* const formData = new FormData();
      formData.append("thumbnail_img", {
        thumbnail_img: imgBase64,
        id: uuidv4(),
      }); */

/* axios
        .post("/api/upload/upload", {
          id: uuidv4(),
          thumbnail_img: compressedData,
        })
        .then((res) => {
          const { data = {} } = res;
          const { url } = data;

          setImageUrl(url);
          message.success("Upload successful!");
        })
        .catch((err) => {
          console.log(err);
          message.error("Upload failed.");
        }); */
