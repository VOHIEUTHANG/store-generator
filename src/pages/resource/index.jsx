import {
  PlusOutlined,
  MinusOutlined,
  ApiOutlined,
  CopyOutlined,
  FormatPainterOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { Col, Row, Dropdown, Button, Form, Input, Space, Tooltip, Select, Checkbox } from "antd";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  StoreProcedureOptions,
  DataTypeOptions,
  GENERATE_OPTIONS,
  FormatOptions,
} from "../../utils/constant";
import GenerateStoreProcedure from "utils/generate";
import generateResource from "helpers/generate-resource.helper";
import FormatSQL from "services/format-sql";
import { SUBMIT_TYPE } from "./utils/constants";

const { TextArea } = Input;

const StoreProcedure = () => {
  const [form] = Form.useForm();
  const [submitType, setSubmitType] = useState(SUBMIT_TYPE.GENERATE_SP);
  const [result, setResult] = useState("");
  const [generateType, setGenerateType] = useState(GENERATE_OPTIONS.CREATE_OR_UPDATE);

  useEffect(() => {
    document.title = "Resource Portal";
  });

  const handleFormSubmit = () => {
    form.submit();
  };

  const onFinish = async (table) => {
    switch (submitType) {
      case SUBMIT_TYPE.GENERATE_SP:
        const StoreProcedureInstance = new GenerateStoreProcedure(table);
        let storeProcedure = "";
        switch (generateType) {
          case GENERATE_OPTIONS.DELETE:
            storeProcedure = StoreProcedureInstance.delete();
            break;
          case GENERATE_OPTIONS.GET_DETAIL:
            storeProcedure = StoreProcedureInstance.getDetail();
            break;
          case GENERATE_OPTIONS.GET_LIST:
            storeProcedure = StoreProcedureInstance.getList();
            break;
          case GENERATE_OPTIONS.CREATE_OR_UPDATE:
            storeProcedure = StoreProcedureInstance.createOrUpdate();
            break;
          default:
            storeProcedure = "Invalid options";
        }
        FormatSQL(storeProcedure.trim()).then((res) => {
          if (res.status) {
            setResult(res.data);
          } else {
            setResult(storeProcedure.trim());
            toast.error("Format Error !");
          }
        });
        break;
      case SUBMIT_TYPE.TAKE_RESOURCE:
        const zipBlob = await generateResource(table);
        const a = document.createElement("a");
        const url = window.URL.createObjectURL(zipBlob);
        a.href = url;
        a.download = table.table_name + ".zip";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        break;
      default:
        break;
    }
  };

  return (
    <Row
      style={{
        height: "100%",
        maxHeight: "100%",
        overflowY: "scroll",
        overflowX: "hidden",
      }}>
      <Col span={12}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            gap: "20px",
          }}>
          <Form
            form={form}
            name="table_info"
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 20,
            }}
            onFinish={onFinish}
            style={{ flex: "1", maxWidth: "80%" }}
            layout="horizontal"
            size="large">
            <Form.Item
              name="table_name"
              label="Table name"
              rules={[
                {
                  required: true,
                  message: "Missing table name !",
                },
              ]}>
              <Input />
            </Form.Item>
            <Form.List name="field_list">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }, index) => (
                    <Form.Item key={key} style={{ marginBottom: "0px" }} label="Field">
                      <Space size={10} align="baseline">
                        <Form.Item
                          style={{
                            margin: "none",
                          }}
                          name={[name, "field_name"]}
                          rules={[
                            {
                              required: true,
                              message: "Missing field name",
                            },
                          ]}>
                          <Input
                            style={{
                              minWidth: "120px",
                            }}
                            placeholder="Field Name"
                          />
                        </Form.Item>
                        <Form.Item
                          name={[name, "data_type"]}
                          rules={[
                            {
                              required: true,
                              message: "Missing data type",
                            },
                          ]}>
                          <Select
                            placeholder="Data type"
                            style={{
                              minWidth: "120px",
                            }}
                            onChange={(dataType) => {
                              const fields = form.getFieldValue("field_list");
                              if (["varchar", "nvarchar"].includes(dataType)) {
                                fields[index].size = 255;
                              } else {
                                fields[index].size = null;
                              }
                              form.setFieldValue(`field_list`, fields);
                            }}
                            options={DataTypeOptions}
                          />
                        </Form.Item>

                        <Form.Item name={[name, "size"]}>
                          <Input
                            style={{
                              width: "90px",
                            }}
                            type="number"
                            placeholder="Size"
                          />
                        </Form.Item>

                        <Tooltip title="Primary key">
                          <Form.Item name={[name, "primary_key"]} valuePropName="checked">
                            <Checkbox
                              onChange={(e) => {
                                const value = e.target.checked;

                                const fields = form.getFieldValue("field_list");

                                fields.forEach((field) => {
                                  field.primary_key = false;
                                });

                                fields[index].primary_key = value;

                                form.setFieldValue("field_list", fields);
                              }}>
                              PR
                            </Checkbox>
                          </Form.Item>
                        </Tooltip>
                        <Button
                          type="primary"
                          size="medium"
                          onClick={() => remove(name)}
                          shape="circle"
                          icon={<MinusOutlined />}
                        />
                      </Space>
                    </Form.Item>
                  ))}
                  <Form.Item label="Add Field">
                    <div>
                      <Button
                        type="dashed"
                        onClick={() => {
                          const fields = form.getFieldValue("field_list");
                          if (!fields || fields?.length === 0) {
                            add(
                              {
                                field_name: "ID",
                                data_type: "int",
                                primary_key: true,
                              },
                              0
                            );
                          } else {
                            add({});
                          }
                        }}
                        icon={<PlusOutlined />}>
                        Add field
                      </Button>
                    </div>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.Item name="options" label="Options">
              <Select
                placeholder="Generate sp type"
                style={{
                  width: "fit-content",
                }}
                value={generateType}
                onChange={setGenerateType}
                options={StoreProcedureOptions}
              />
            </Form.Item>
          </Form>
          <div
            style={{
              position: "sticky",
              bottom: 0,
              width: "100%",
              backgroundColor: "white",
              padding: "20px 0",
              marginBottom: "0px",
            }}>
            <Space>
              <Button
                type="primary"
                size="large"
                onClick={() => {
                  setSubmitType(SUBMIT_TYPE.GENERATE_SP);
                  handleFormSubmit();
                }}
                icon={<ApiOutlined />}>
                Generate Store
              </Button>
              <Button
                size="large"
                danger
                onClick={() => {
                  setSubmitType(SUBMIT_TYPE.TAKE_RESOURCE);
                  handleFormSubmit();
                }}
                icon={<DownloadOutlined />}>
                Take Resource
              </Button>
            </Space>
          </div>
        </div>
      </Col>
      <Col span={12}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            gap: "20px",
            marginRight: "20px",
          }}>
          <TextArea
            value={result}
            onChange={(event) => {
              setResult(event?.target?.value);
            }}
            style={{
              flex: 1,
              resize: "none",
              fontSize: "18px",
            }}
          />
          <Space
            align="end"
            style={{
              justifyContent: "end",
              position: "sticky",
              bottom: 0,
              width: "100%",
              backgroundColor: "white",
              padding: "20px 0",
              marginBottom: "0px",
            }}>
            <Dropdown.Button
              type="primary"
              size="large"
              // icon={<DownOutlined />}
              icon={<FormatPainterOutlined />}
              menu={{
                items: FormatOptions,
                onClick: (e) => {
                  if (Number(e.key) === 1) {
                    FormatSQL(result, "Collapsed").then((res) => {
                      if (res.status) {
                        setResult(res.data);
                      } else {
                        toast.error("Format Error !");
                      }
                    });
                  } else {
                    FormatSQL(result, "Indented").then((res) => {
                      if (res.status) {
                        setResult(res.data);
                      } else {
                        toast.error("Format Error !");
                      }
                    });
                  }
                },
              }}
              onClick={() => {
                FormatSQL(result).then((res) => {
                  if (res.status) {
                    setResult(res.data);
                    toast.success("Format SQL Success !");
                  } else {
                    toast.error("Format Error !");
                  }
                });
              }}>
              Format SQL
            </Dropdown.Button>
            <Button
              type="primary"
              size="large"
              onClick={() => {
                navigator.clipboard.writeText(result);
                toast.success("Copy to clipboard success!");
              }}
              icon={<CopyOutlined />}>
              Copy
            </Button>
          </Space>
        </div>
      </Col>
    </Row>
  );
};

export default StoreProcedure;
