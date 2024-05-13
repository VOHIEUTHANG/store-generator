import { EditOutlined, SettingOutlined } from "@ant-design/icons";
import { v4 as id } from "uuid";

const navigation = [
  {
    key: id(),
    icon: <EditOutlined />,
    label: "Resources",
    target: "/",
  },
  {
    key: id(),
    icon: <SettingOutlined />,
    label: "Settings",
    target: "/settings",
  },
];

export default navigation;
