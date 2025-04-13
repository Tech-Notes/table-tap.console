import { CircleUserRound } from "lucide-react";
import { NotificationSheet } from "./notifications-sheet";
import { SidebarTrigger } from "./ui/sidebar";

const AppHeader = () => {
  return (
    <header className="flex items-center justify-between p-4 border-b-2">
      <SidebarTrigger size="lg" className="cursor-pointer" />
      <nav>
        <ul className="flex items-center space-x-4">
          <li>
            <NotificationSheet />
          </li>
          <li>
            <CircleUserRound size={22} className="cursor-pointer" />
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default AppHeader;
