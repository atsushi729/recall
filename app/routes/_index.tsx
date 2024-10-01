import type { MetaFunction } from "@remix-run/cloudflare";
import Hero from "~/components/hero";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div>
      <Hero />
    </div>
  );
}
