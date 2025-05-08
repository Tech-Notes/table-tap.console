import {NotificationSheet} from './notifications/notifications-sheet';
import {SidebarTrigger} from './ui/sidebar';
import {UserProfileSheet} from './user-profile-sheet';

const AppHeader = () => {
  return (
    <header className="flex items-center justify-between p-4 border-b-2">
      <SidebarTrigger size="lg" className="cursor-pointer" />
      <nav>
        <div className="flex items-center gap-4">
          <NotificationSheet />
          <UserProfileSheet />
        </div>
      </nav>
    </header>
  );
};
export default AppHeader;
