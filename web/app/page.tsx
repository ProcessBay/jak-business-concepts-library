import { Suspense } from "react";
import { Chat } from "@/components/chat";

export default function HomePage() {
  return (
    <Suspense>
      <Chat />
    </Suspense>
  );
}
