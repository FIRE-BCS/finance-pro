import { IconHome, IconUser } from "@tabler/icons-react";
import { uniqueId } from "lodash";

const Menuitems = [
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconHome,
    href: "/",
  },
  {
    id: uniqueId(),
    title: "Chatbot",
    icon: IconUser,
    href: "/chatbot",
  },
];

export default Menuitems;
