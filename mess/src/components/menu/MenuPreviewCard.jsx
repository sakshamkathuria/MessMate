import { Children } from "react";

const MenuPreviewCard = ({
  title,
  icon,
  time,
  headerBg,
  headerTextColor,
  children,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      
      {/* Header */}
      <div className={`${headerBg} px-5 py-4`}>
        <div className="flex items-center gap-2 font-semibold text-lg">
          {icon}
          <span className={headerTextColor}>{title}</span>
        </div>

        {time && (
          <p className="text-sm text-gray-600 mt-1">
            {time}
          </p>
        )}
      </div>

      {/* Body */}
      <div className="px-5 py-6 text-gray-600">
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          {Children.toArray(children).map((child, idx) => (
            <li key={idx}>
              {child}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MenuPreviewCard;
