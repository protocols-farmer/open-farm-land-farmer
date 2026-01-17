//client/src/app/(app)/notifications/page.tsx
import Notifications from "@/components/pages/notifications/Notifications";

export const metadata = {
  title: "Notifications | WanderGuild",
  description: "Stay updated with your fellow explorers.",
};

export default function NotificationsPage() {
  return <Notifications />;
}
