import {
  IconBusinessplan,
  IconCoins,
  IconCurrency,
  IconCurrencyDollar,
  IconHome,
  IconMoneybag,
  IconTrendingUp,
  IconUser,
} from "@tabler/icons-react";
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
  {
    id: uniqueId(),
    title: "Savings",
    icon: IconCoins,
    href: "/savings",
  },
  {
    id: uniqueId(),
    title: "Loans",
    icon: IconCurrencyDollar,
    href: "/loans",
  },
  {
    id: uniqueId(),
    title: "Fixed Deposits",
    icon: IconMoneybag,
    href: "/fixeddeposits",
  },
  {
    id: uniqueId(),
    title: "Investments",
    icon: IconBusinessplan,
    href: "/investments",
  },
  {
    id: uniqueId(),
    title: "Tradings",
    icon: IconTrendingUp,
    href: "/tradings",
  },
];

export default Menuitems;
