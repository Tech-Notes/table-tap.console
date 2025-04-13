import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { CircleUserRound } from "lucide-react";
import { Button } from "./ui/button";

export function UserProfileSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <CircleUserRound size={22} className="cursor-pointer" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Profile</SheetTitle>
        </SheetHeader>
        <div className="p-4">
          <div className="flex justify-center my-4">
            <CircleUserRound size={46} className="text-red-500" />
          </div>
          <ul className="text-sm md:text-base my-8 space-y-2">
            <li>
              <span className="font-bold">Name: </span>Demo Name
            </li>
            <li>
              <span className="font-bold">Role: </span>Admin
            </li>
          </ul>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="destructive" type="button">Logout</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
