import { BellIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

export function ConfirmOrder({
  notifications = [],
  className,
  onConfirm,
  ...props
}) {
  return (
    <Card
      className={cn(
        "w-[350px] h-[450px] z-[2] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ",
        className
      )}
    >
      <CardHeader>
        <CardTitle>Detail pesanan</CardTitle>
        <CardDescription>
          Mohon konfirmasi data anda sudah benar.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {/* <div className="flex items-center space-x-4 rounded-md border p-4">
          <BellIcon />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Push Notifications
            </p>
            <p className="text-sm text-muted-foreground">
              Send notifications to device.
            </p>
          </div>
        </div> */}
        <div>
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {notification.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {notification.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={onConfirm}>
          <CheckIcon /> Confirm
        </Button>
      </CardFooter>
    </Card>
  );
}
