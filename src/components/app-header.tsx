import { NotificationSheet } from "./notifications/notifications-sheet";
import { SidebarTrigger } from "./ui/sidebar";
import { UserProfileSheet } from "./user-profile-sheet";

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
            <UserProfileSheet />
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default AppHeader;
