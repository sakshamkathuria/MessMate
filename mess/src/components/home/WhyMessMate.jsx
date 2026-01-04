const cards = [
  {
    icon: "📋",
    title: "Weekly Menu",
    desc: "View the complete weekly menu with breakfast, lunch, and dinner options",
  },
  {
    icon: "✅",
    title: "Attendance Tracking",
    desc: "Keep track of your daily meal attendance and never miss a meal",
  },
  {
    icon: "💳",
    title: "Easy Billing",
    desc: "Transparent billing with detailed breakdown of your meal expenses",
  },
];

const WhyMessMate = () => {
  return (
    <section className="py-24 flex flex-col items-center justify-center px-6">
      <h2 className="text-4xl font-bold mb-4">Why MessMate?</h2>
      <p className="text-gray-600 mb-12">
        Everything you need to manage your mess experience
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl">
        {cards.map((card, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-8 text-center shadow-sm"
          >
            <div className="text-4xl mb-4">{card.icon}</div>
            <h3 className="text-xl font-bold mb-2">{card.title}</h3>
            <p className="text-gray-600">{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyMessMate;
