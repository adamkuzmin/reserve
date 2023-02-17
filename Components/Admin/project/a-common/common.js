import { Button, Form, Input, Upload } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { Text14, Wrap16, Wrap30, Wrap60 } from "../../../common/text";
import { LabelRow } from "../../../Filters/styles";
import Cats from "./blocks/cats";
import ImageMultiUploader from "./blocks/image-multi-upload";
import ImageSingleUploader from "./blocks/image-single-upload";
import Mapbox from "./blocks/map";
import { Btn } from "./blocks/__styles";

const Common = () => {
  return (
    <>
      <Form style={{ width: "100%", maxWidth: "700px" }} layout="vertical">
        <Wrap30 data-font="Wremena" style={{ marginBottom: "24px" }}>
          <h3>1. Название и адрес</h3>
        </Wrap30>

        <Wrap30>
          <div style={{ display: "flex" }}>
            <Form.Item style={{ maxWidth: "230px" }} name="city">
              <Input placeholder="Город" />
            </Form.Item>
            <Form.Item
              style={{ marginLeft: "10px", width: "100%" }}
              name="address"
            >
              <Input placeholder="Точный адрес объекта" />
            </Form.Item>
          </div>
        </Wrap30>

        <Wrap30>
          <Form.Item name="name">
            <TextArea autoSize placeholder="Название проекта" />
          </Form.Item>
        </Wrap30>

        {/* <Form.Item style={{ marginLeft: "10px", width: "100%" }} name="lngLat">
          <Mapbox />
  </Form.Item> */}

        <br />
        <br />
        <Wrap30 data-font="Wremena" style={{ marginBottom: "24px" }}>
          <h3>2. Категории и год</h3>
        </Wrap30>

        <Form.Item name="cats">
          <Cats />
        </Form.Item>

        <br />

        <LabelRow>
          <Text14 data-font="wremena">
            2.2 Год простройки или реализации. Например, "2015", "2016". Если
            нет информации, то поле оставить пустым
          </Text14>
        </LabelRow>

        <Wrap30>
          <Form.Item name="year">
            <Input placeholder="Год" />
          </Form.Item>
        </Wrap30>

        <br />
        <br />
        <Wrap30 data-font="Wremena" style={{ marginBottom: "24px" }}>
          <h3>3. Изображения для превью</h3>
        </Wrap30>

        <LabelRow>
          <Text14 style={{ lineHeight: "1.1 !important" }} data-font="wremena">
            3.1 Для композиции в разделе "Проекты" используются в макете
            вертикальное и горизонтальное изображение. Оба по очереди заменяют
            друг друга в зависимости от сложившейся композиции
          </Text14>
        </LabelRow>
        <div style={{ display: "flex", marginTop: "16px" }}>
          <Form.Item style={{ width: "100%" }} name="coverhor">
            <ImageSingleUploader label="a. Вертикальное изображение" />
          </Form.Item>

          <Form.Item
            style={{ width: "100%", marginLeft: "16px" }}
            name="coververt"
          >
            <ImageSingleUploader label="b. Горизонтальное изображение" />
          </Form.Item>
        </div>

        <br />
        <br />
        <Wrap30 data-font="Wremena" style={{ marginBottom: "24px" }}>
          <h3>4. Главное изображение</h3>
        </Wrap30>
        <LabelRow>
          <Text14 style={{ lineHeight: "1.1 !important" }} data-font="wremena">
            4.1 Изображение которое будет использоваться в слайдере на главной
            странице и как главное изображение на отдельной странице проекта
          </Text14>
        </LabelRow>
        <Form.Item style={{ width: "100%" }} name="main_img">
          <ImageSingleUploader label={null} />
        </Form.Item>

        <br />
        <br />
        <Wrap30 data-font="Wremena" style={{ marginBottom: "24px" }}>
          <h3>5. Планы и детали объекта в слайдере</h3>
        </Wrap30>
        <LabelRow>
          <Text14 style={{ lineHeight: "1.1 !important" }} data-font="wremena">
            4.1 Изображение которое будет использоваться в слайдере на главной
            странице и как главное изображение на отдельной странице проекта
          </Text14>
        </LabelRow>
        <Form.Item style={{ width: "100%" }} name="slider_imgs">
          <ImageMultiUploader label={null} />
        </Form.Item>

        <br />
        <br />
        <Wrap30 data-font="Wremena" style={{ marginBottom: "24px" }}>
          <h3>6. Второстепенные изображения</h3>
        </Wrap30>
        <LabelRow>
          <Text14 style={{ lineHeight: "1.1 !important" }} data-font="wremena">
            4.1 Изображение которое будет использоваться в слайдере на главной
            странице и как главное изображение на отдельной странице проекта
          </Text14>
        </LabelRow>
        <Form.Item style={{ width: "100%" }} name="secondary_imgs">
          <ImageMultiUploader label={null} />
        </Form.Item>

        <Form.Item>
          <Btn type="primary" htmlType="submit">
            Сохранить проект
          </Btn>
        </Form.Item>
      </Form>
    </>
  );
};

export default Common;
