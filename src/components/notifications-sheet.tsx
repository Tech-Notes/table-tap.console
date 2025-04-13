import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { ConciergeBell, Dot } from "lucide-react";

export function NotificationSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <ConciergeBell size={22} className="cursor-pointer" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
        </SheetHeader>
        <div className="p-4">
          <ul className="text-sm md:text-base">
            <li className="cursor-pointer flex items-center space-x-2 border-b-2 py-2">
              <Dot size={40} className="text-red-500" />
              New order #123
            </li>
            <li className="cursor-pointer text-muted-foreground flex items-center space-x-2 border-b-2 py-2">
              <Dot size={40} />
              <p>
                Table 9&rsquo;s order status is changed to
                <span className="text-green-500 pl-2">Ready</span>.
              </p>
            </li>
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
}
