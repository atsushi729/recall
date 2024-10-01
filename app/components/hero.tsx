export default function Hero() {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          <span className="relative inline-block">
            The Remix SaaS
            <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 rounded-full blur-sm"></span>
            <span className="absolute bottom-0 left-0 w-full h-px bg-blue-400"></span>
          </span>
          <br />
          Development Framework
        </h1>
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed mt-6">
          Launch <span className="font-semibold">production-ready</span> SaaS
          apps with +25 pre-built essential SaaS features: Admin dashboard, App
          portal, Stripe Subscriptions and Payments, Blog, Page Builder,
          Knowledge Base, Workflows, Analytics, Entity Builder, Email Marketing,
          Notifications, Onboarding, Feature Flags, Cache and Metrics.
        </p>
      </div>
    </div>
  );
}
