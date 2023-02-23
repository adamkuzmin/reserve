import { useRef } from "react";
import styled, { css } from "styled-components";
import dynamic from "next/dynamic";
import { Form } from "antd";
import {
  Text24Rules,
  Text30Rules,
  Text36Rules,
  Text48Rules,
} from "@/Components/common/text";

const EditorQuill = dynamic(() => import("react-quill"), { ssr: false });

export const DescriptionWrapper = styled.div`
  &&& {
    background: white;
    border-radius: 6px;
    border: 1px solid #e1e5f5;

    &[data-type="read-only"] {
      width: 100%;
      background: white;

      &[data-visible="visible"] {
        opacity: 1;
      }

      &[data-visible="hidden"] {
        opacity: 0;
      }

      & .ql-toolbar.ql-snow {
        display: none;
      }

      & .ql-container.ql-snow {
        border-bottom: 0px solid rgba(255, 255, 255, 0.2);
      }
    }

    & .ql-picker.ql-expanded {
      border: 0px;
      border-radius: 16px;
    }

    & .ql-editor * {
      color: #313131;
    }

    & .ql-editor {
      padding-left: 10px;
      padding-right: 10px;
    }

    & .ql-editor:focus:focus-visible {
      outline: 0px;
    }

    & .ql-editor.ql-blank::before {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.5);
      font-style: normal;
      left: 0px;
    }

    & .ql-toolbar.ql-snow,
    & .ql-container.ql-snow {
      border: 0px;
    }

    & .ql-container.ql-snow {
      border-bottom: 0px solid rgba(0, 0, 0, 0.2);
    }

    & .ql-toolbar.ql-snow {
      background: #edeff5;
      border-radius: 6px;
    }

    ${({ isEdit }) =>
      !isEdit
        ? css`
            & {
              border: 0px !important;
            }

            & .ql-toolbar {
              display: none;
            }

            & {
              & {
                & {
                  .ql-editor {
                    padding: 0 !important;
                  }
                }
              }
            }
          `
        : ``}

    ${({ type }) =>
      type === "description"
        ? css`
            & .ql-editor p,
            & .ql-editor li {
              & {
                font-family: "IBM Plex Sans", sans-serif;
                font-weight: 400;
                color: black;

                ${Text36Rules}
              }
            }

            & .ql-editor blockquote,
            & h1 {
              & {
                & {
                  ${Text48Rules}
                }
              }
            }

            & .ql-editor blockquote {
              & {
                font-family: "Wremena", sans-serif;
                border-left: 4px solid #f1f1f1;
              }
            }

            & h1 {
              & {
                color: black;
                font-family: "IBM Plex Sans", sans-serif;
                font-weight: 600;
                margin-top: 5.8vw;
                margin-bottom: 2.6vw;
              }
            }
          `
        : ``}

    ${({ type }) =>
      type === "meta" || type === "comment"
        ? css`
            & .ql-editor p,
            & .ql-editor h3 {
              & {
                font-family: "IBM Plex Sans", sans-serif;
                font-weight: 400;
                color: #6e6e6e;

                ${type === "meta" ? Text30Rules : Text24Rules}
              }
            }

            & .ql-editor h3 {
              & {
                margin-bottom: 10px;
              }
            }
          `
        : ``}

    /* & .ql-editor p,
    & .ql-editor ul,
    & .ql-editor blockquote {
      &,
      & * {
        font-size: ${({ type }) => (type === "description" ? `30px` : "24px")};
        line-height: 1.2;
        ${({ type }) =>
      type === "description"
        ? `

        `
        : `
            & {
                opacity: .7
            }
        `}
      }
    } */

    & .l-toolbar * {
      color: #546a70;
    }

    & .ql-picker-label {
      &,
      & * {
        color: #313131;
        stroke: #313131;
      }

      &:hover {
        &,
        & * {
          color: #7b74ff;
          stroke: #7b74ff;
        }
      }
    }

    & .ql-snow button * {
      stroke: #313131;
    }

    & .ql-snow button:hover * {
      stroke: #7b74ff;
    }

    & .ql-snow .ql-active {
      &,
      & * {
        stroke: #7b74ff;
      }
    }
  }
`;

const QuillEditor = (props = {}) => {
  const {
    value = "asd;kldslfmaslkfjdlsfmds",
    onChange = () => {},
    type = "editor",
    isEdit,
  } = props;

  const editor = useRef();

  return (
    <DescriptionWrapper type={type} isEdit={isEdit}>
      <Form.Item style={{ width: "100%" }} name={type}>
        <EditorQuill
          ref={editor}
          readOnly={!isEdit}
          modules={{
            toolbar:
              type === "description"
                ? [
                    [{ header: [1, false] }],
                    ["blockquote"],
                    ["bold", "italic", "underline"],
                    [{ list: "bullet" }],
                  ]
                : [[{ header: [3, false] }], [], [], []],
            clipboard: {
              // toggle to add extra line breaks when pasting HTML:
              matchVisual: false,
            },
          }}
          formats={[
            "header",
            "font",
            "size",
            "bold",
            "italic",
            "underline",
            "strike",
            "blockquote",
            "list",
            "bullet",
            "indent",
          ]}
          value={"<p>sdkfjsdklfjdslkfjdkslf</p>"}
          onChange={onChange}
        />
      </Form.Item>
    </DescriptionWrapper>
  );
};

export default QuillEditor;
