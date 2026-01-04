const foods = [
  { emoji: "🍕", top: "0%", left: "8%" },
  { emoji: "🍔", top: "1%", right: "12%" },
  { emoji: "🍜", top: "20%", left: "12%" },
  { emoji: "🥗", top: "15%", right: "30%" },
  { emoji: "🥐", bottom: "20%", right: "15%" },
  { emoji: "☕", bottom: "25%", left: "10%" },
  { emoji: "🍎", bottom: "15%", left: "35%" },
];

const FloatingFood = () => {
  return (
    <>
      {foods.map((food, i) => (
        <div
          key={i}
          className="absolute text-6xl md:text-7xl animate-float opacity-90 z-30 pointer-events-none"
          style={food}
        >
          {food.emoji}
        </div>
      ))}
    </>
  );
};

export default FloatingFood;
