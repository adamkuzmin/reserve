import React, { useState, useEffect, useRef } from "react";
import { DndContext } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Table, Button, Spin, Affix } from "antd";
import { v4 as uuidv4 } from "uuid";
import Row from "./row";
import styled from "styled-components";
import { notification } from "antd";
import { useStore } from "@/Store/useStore";
import { sanity } from "@/Components/Client/sanity/sanity-client";
import { StyledText } from "@/Components/ProjectsLayout/ProjectsTable";

const BtnWrapper = styled.div`
  &&& .ant-btn {
    &,
    &:hover,
    &:focus {
      background: black;
      border-radius: 0px;

      & * {
        color: white;
      }
    }
  }
`;

const columns = [
  {
    key: "sort",
  },
  {
    title: "Название",
    dataIndex: "name",
    render: (a, { _id }) => (
      <StyledText
        style={{ fontSize: "1rem" }}
        data-type="link"
        data-weight="semibold"
        data-font="ibm"
      >
        {a}
      </StyledText>
    ),
  },
];

const App = ({ data, loading: globalLoading }) => {
  const [dataSource, setDataSource] = useState(
    data.map((item) => ({
      ...item,
      key: item._id,
      id: item._id,
    }))
  );

  const dataSourceRef = useRef();

  useEffect(() => {
    if (!globalLoading) {
      const d = data.map((item) => ({
        ...item,
        key: item._id,
        id: item._id,
      }));

      setDataSource(d);

      dataSourceRef.current = d;
    }
  }, [globalLoading, data]);

  const [logId, setLogId] = useState(null);
  const [loading, setLoading] = useState(false);

  const setGlobalLogId = useStore(({ setLogId }) => setLogId);

  useEffect(() => {
    dataSourceRef.current = dataSource;
  }, [logId, dataSource]);

  const cfgs = {
    onCompleted: () => {
      setGlobalLogId();
      notification.success({
        message: `Данные сохранились!`,
        placement: "bottomLeft",
      });
    },
    onError: (e) => {
      setGlobalLogId();
      notification.error({
        message: `Ошибка!`,
        placement: "bottomLeft",
      });
    },
  };

  const handleSave = async () => {
    const handleCloseNotification = () => {
      notification.destroy(); // Close the notification
      setLogId(null);
      setOpen(false);
    };

    handleCloseNotification(false);

    setLoading(true);

    try {
      await Promise.all(
        dataSourceRef.current.map(async (item, index) => {
          // use dataSourceRef.current instead of dataSource
          await sanity.patch(item.id).set({ index }).commit();
          return { ...item, index }; // return updated item
        })
      );

      //setDataSource(updatedDataSource); // update state with the updated data source

      cfgs.onCompleted();
    } catch (err) {
      cfgs.onError();
    } finally {
      setLoading(false);
    }
  };

  const onDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      setDataSource((previous) => {
        const activeIndex = previous.findIndex((i) => i.key === active.id);
        const overIndex = previous.findIndex((i) => i.key === over?.id);
        const newMove = arrayMove(previous, activeIndex, overIndex).map(
          (item, index) => {
            return { ...item, index };
          }
        );

        return newMove;
      });

      setLogId(uuidv4());
    }
  };

  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if (!isOpen && logId) {
      notification.open({
        message: (
          <div style={{ marginBottom: "1rem" }}>
            <span style={{ fontSize: ".8rem" }}>
              Проекты были пересортированы
            </span>
          </div>
        ),
        description: (
          <BtnWrapper>
            <Button type="primary" onClick={handleSave}>
              Сохранить
            </Button>
          </BtnWrapper>
        ),

        placement: "bottomRight",
        duration: 99999999,
      });

      setOpen(true);
    }
  }, [logId, isOpen]);

  return (
    <>
      <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
        <SortableContext
          items={dataSource
            .sort((a, b) => {
              // Case when both items have null or undefined index
              if (
                (a.index === null || a.index === undefined) &&
                (b.index === null || b.index === undefined)
              ) {
                return 0; // Maintain original order
              }
              // Case when only one item has null or undefined index
              if (a.index === null || a.index === undefined) {
                return -1; // a goes before b
              }
              if (b.index === null || b.index === undefined) {
                return 1; // b goes before a
              }
              // Case when both items have numeric index
              return a.index - b.index; // Sort by index in ascending order
            })
            .map((i) => i.key)}
          strategy={verticalListSortingStrategy}
        >
          <Table
            pagination={false}
            components={{
              body: {
                row: Row,
              },
            }}
            rowKey="key"
            columns={columns}
            dataSource={dataSource}
          />
        </SortableContext>
      </DndContext>
    </>
  );
};

export default App;
