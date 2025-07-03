import React from "react";

const LanguageSwitcher = ({ language, setLanguage }) => (
  <div className="ml-4 flex items-center">
    <button
      className={`px-2 py-1 rounded-l border border-gray-300 dark:border-gray-700 text-xs ${
        language === "fr" ? "bg-blue-600 text-white" : "bg-white dark:bg-gray-900"
      }`}
      onClick={() => setLanguage("fr")}
      aria-label="Français"
      type="button"
    >
      FR
    </button>
    <button
      className={`px-2 py-1 rounded-r border-t border-b border-r border-gray-300 dark:border-gray-700 text-xs ${
        language === "en" ? "bg-blue-600 text-white" : "bg-white dark:bg-gray-900"
      }`}
      onClick={() => setLanguage("en")}
      aria-label="English"
      type="button"
    >
      EN
    </button>
  </div>
);

export default LanguageSwitcher;
