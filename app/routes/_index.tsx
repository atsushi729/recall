import type { MetaFunction } from "@remix-run/cloudflare";
import Hero from "~/components/hero";
import MainForm from "~/components/mainForm";

export const meta: MetaFunction = () => {
  return [
    { title: "Recall" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="relative bg-black min-h-screen bg-theme-base text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl space-y-6">
        <Hero />
        <MainForm />
      </div>
    </div>
  );
}
