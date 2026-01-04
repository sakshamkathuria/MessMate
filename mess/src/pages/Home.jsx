import { useEffect, useState, useRef } from "react";
import HeroSection from "../components/home/HeroSection";
import TodayMenuSection from "../components/home/TodayMenuSection";
import WhyMessMate from "../components/home/WhyMessMate";
import api from "../api/axios";

const Home = () => {
  const todayMenuRef = useRef(null);

  const [todayMenu, setTodayMenu] = useState(null);
  const [loadingMenu, setLoadingMenu] = useState(false);
  const [menuError, setMenuError] = useState(null);

  useEffect(() => {
    const today = new Date().toLocaleString("en-US", {
      weekday: "long",
    });

    const fetchTodayMenu = async () => {
      setLoadingMenu(true);
      setMenuError(null);
      try {
        const res = await api.get("/menu", {
          params: { day: today },
        });
        setTodayMenu(res.data.menu || { day: today, breakfast: [], lunch: [], dinner: [] });
      } catch (err) {
        console.error("Failed to fetch today's menu", err);
        setMenuError(err);
        setTodayMenu({ day: today, breakfast: [], lunch: [], dinner: [] });
      } finally {
        setLoadingMenu(false);
      }
    };

    fetchTodayMenu();
  }, []);

  return (
    <div className="bg-[#fdfaf5]">
      <HeroSection
        onTodaySpecial={() =>
          todayMenuRef.current.scrollIntoView({ behavior: "smooth" })
        }
      />
      <TodayMenuSection
        ref={todayMenuRef}
        todayMenu={todayMenu}
        day={todayMenu?.day}
        loading={loadingMenu}
        error={menuError}
      />
      <WhyMessMate />
    </div>
  );
};

export default Home;
