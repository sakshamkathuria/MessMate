import Menu from "../models/Menu.js";

/**
 * Admin: Create / Update menu for a day
 */
export const updateMenu = async (req, res) => {
  try {
    const { day, breakfast, lunch, dinner } = req.body;

    if (!day) {
      return res.status(400).json({
        success: false,
        message: "Day is required",
      });
    }

    const menu = await Menu.findOneAndUpdate(
      { day },
      {
        day,
        breakfast: breakfast || [],
        lunch: lunch || [],
        dinner: dinner || [],
      },
      { upsert: true, new: true }
    );

    res.json({
      success: true,
      message: "Menu updated successfully",
      menu,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update menu",
    });
  }
};

/**
 * Student/Admin: Get menu for a specific day
 */
export const getMenuByDay = async (req, res) => {
  try {
    const { day } = req.query;

    const menu = await Menu.findOne({ day });

    if (!menu) {
      return res.json({
        success: true,
        menu: {
          day,
          breakfast: [],
          lunch: [],
          dinner: [],
        },
      });
    }

    res.json({
      success: true,
      menu,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch menu",
    });
  }
};

/**
 * Student/Admin: Get full weekly menu
 */
export const getWeeklyMenu = async (req, res) => {
  try {
    const menus = await Menu.find().sort({ createdAt: 1 });

    res.json({
      success: true,
      menus,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch weekly menu",
    });
  }
};
