"use client";

import { useEffect, useRef } from "react";

// Type definitions for Tab
interface Tab {
  id: string;
  label: string;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const TabNavigation = ({
  tabs,
  activeTab,
  onTabChange,
}: TabNavigationProps) => {
  const tabsRef = useRef<HTMLDivElement>(null);

  // Debounce the scroll event to improve performance
  useEffect(() => {
    const handleScroll = () => {
      const sections = tabs.map((tab) => {
        const element = document.getElementById(tab.id);
        if (!element) return { id: tab.id, top: 0 };

        const rect = element.getBoundingClientRect();
        return {
          id: tab.id,
          top: rect.top,
        };
      });

      // Find the section closest to the top of the viewport
      const closest = sections.reduce((prev, curr) => {
        return Math.abs(curr.top - 100) < Math.abs(prev.top - 100)
          ? curr
          : prev;
      });

      // Update the active tab if necessary
      if (closest.id !== activeTab) {
        onTabChange(closest.id);
      }
    };

    // Adding scroll event listener with debounce
    const debouncedScroll = debounce(handleScroll, 100); // Delay of 100ms

    window.addEventListener("scroll", debouncedScroll);
    return () => window.removeEventListener("scroll", debouncedScroll);
  }, [tabs, activeTab, onTabChange]);

  // Simple debounce function
  const debounce = (func: () => void, delay: number): (() => void) => {
    let timeout: NodeJS.Timeout;
    return () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(), delay);
    };
  };

  return (
    <div
      ref={tabsRef}
      className="flex overflow-x-auto sticky top-0 bg-white z-10 border-b border-gray-200 no-scrollbar"
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-3 text-[15px] font-medium whitespace-nowrap transition-colors ${
            activeTab === tab.id
              ? "text-orange-500 border-b-2 border-orange-500"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;
