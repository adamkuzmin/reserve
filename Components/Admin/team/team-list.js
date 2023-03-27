import {
  Text14,
  Text36,
  Wrap16,
  Wrap24,
  Wrap30,
  Wrap60,
} from "@/Components/common/text";
import { WideButton } from "@/Components/ProjectInfo/ProjectBottom";
import { useState } from "react";
import MemberModal from "./member-modal";
import { Col, Cover, Grid, Member } from "./__styled";
import { v4 as uuidv4 } from "uuid";

const TeamList = ({ data = [] }) => {
  const [member, setMember] = useState();

  return (
    <>
      <MemberModal key={`d:${member}`} member={member} onClose={setMember} />

      {data &&
        data.map((item = {}) => {
          const { _id: categoryId, members = [], name } = item;

          return (
            <Col key={`id${categoryId}`}>
              <div>
                <Wrap30>
                  <b>{name}</b>
                </Wrap30>
              </div>

              <Grid>
                {members &&
                  members.map((item = {}) => {
                    const { _id, url, name, label } = item;

                    return (
                      <Member
                        onClick={() => setMember({ id: _id, categoryId })}
                        key={`d:${_id}`}
                      >
                        <Cover url={url}></Cover>

                        <Wrap16>
                          <b>{name}</b>
                        </Wrap16>
                        <Text14>{label}</Text14>
                      </Member>
                    );
                  })}

                <Member
                  onClick={() => setMember({ id: uuidv4(), categoryId })}
                  center
                >
                  <div
                    className="ant-upload-drag-icon"
                    style={{ fontSize: "44px" }}
                  >
                    +
                  </div>
                  <div className="ant-upload-text">
                    <Text14>Добавить нового участника</Text14>
                  </div>
                </Member>
              </Grid>
            </Col>
          );
        })}

      <WideButton
        style={{
          background: "black",
          color: "white",
          marginBottom: "0",
          height: "120px",
        }}
      >
        <Text36>+ Добавить раздел</Text36>
      </WideButton>
    </>
  );
};

export default TeamList;
