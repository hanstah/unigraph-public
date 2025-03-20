import { create } from "zustand";
import { CustomLayoutType } from "../core/layouts/CustomLayoutEngine";
import { LayoutEngineOption } from "../core/layouts/LayoutEngine";
import { ActiveView, AppConfig } from "./../AppConfig";

export type AppConfigActions = {
  setActiveView: (activeView: ActiveView) => void;
  setActiveSceneGraph: (activeSceneGraph: string) => void;
  setWindows: (windows: { showEntityDataCard: boolean }) => void;
  setForceGraph3dOptions: (forceGraph3dOptions: {
    layout: "Physics" | "Layout";
  }) => void;
  setForceGraph3dLayoutMode: (layout: "Physics" | "Layout") => void;
  setActiveLayout: (activeLayout: LayoutEngineOption) => void;
  setAppConfig: (appConfig: AppConfig) => void;
  setIsDarkMode: (isDarkMode: boolean) => void;
  setSelectedSimulation: (selectedSimulation: string) => void;
  getShowEntityDataCard: () => boolean;
  setShowEntityDataCard: (showEntityDataCard: boolean) => void;
};

export type AppState = AppConfig &
  AppConfigActions & {
    isDarkMode: boolean;
    selectedSimulation: string;
  };

const useAppConfigStore = create<AppState>((set) => ({
  activeView: "ForceGraph3d",
  activeSceneGraph: "AcademicsKG",
  windows: {
    showEntityDataCard: false,
  },
  forceGraph3dOptions: {
    layout: "Physics",
  },
  activeLayout: CustomLayoutType.Random,
  isDarkMode: false,
  selectedSimulation: "Lumina",

  setActiveView: (activeView: ActiveView) => set({ activeView }),
  setActiveSceneGraph: (activeSceneGraph: string) => set({ activeSceneGraph }),
  setWindows: (windows: { showEntityDataCard: boolean }) => set({ windows }),

  getShowEntityDataCard: (): boolean => {
    return useAppConfigStore.getState().windows.showEntityDataCard;
  },
  setShowEntityDataCard: (showEntityDataCard: boolean) =>
    set({ windows: { showEntityDataCard } }),

  setForceGraph3dOptions: (forceGraph3dOptions: {
    layout: "Physics" | "Layout";
  }) => set({ forceGraph3dOptions }),
  setForceGraph3dLayoutMode: (layout: "Physics" | "Layout") =>
    set({ forceGraph3dOptions: { layout } }),
  setActiveLayout: (activeLayout: LayoutEngineOption) =>
    set({ activeLayout, forceGraph3dOptions: { layout: "Layout" } }),
  setAppConfig: (appConfig: AppConfig) => set(appConfig),

  setIsDarkMode: (isDarkMode: boolean) => set({ isDarkMode }),
  setSelectedSimulation: (selectedSimulation: string) =>
    set({ selectedSimulation }),
}));

export const setActiveView = (activeView: ActiveView) => {
  useAppConfigStore.setState(() => ({
    activeView,
  }));
};

export const getActiveView = () => {
  return useAppConfigStore.getState().activeView;
};

export const setActiveSceneGraph = (activeSceneGraph: string) => {
  useAppConfigStore.setState(() => ({
    activeSceneGraph,
  }));
};

export const getActiveSceneGraph = () => {
  return useAppConfigStore.getState().activeSceneGraph;
};

export const setWindows = (windows: { showEntityDataCard: boolean }) => {
  useAppConfigStore.setState(() => ({
    windows,
  }));
};

export const getWindows = () => {
  return useAppConfigStore.getState().windows;
};

export const setForceGraph3dOptions = (forceGraph3dOptions: {
  layout: "Physics" | "Layout";
}) => {
  useAppConfigStore.setState(() => ({
    forceGraph3dOptions,
  }));
};

export const setForceGraph3dLayoutMode = (layout: "Physics" | "Layout") => {
  useAppConfigStore.setState(() => ({
    forceGraph3dOptions: { layout },
  }));
};

export const getForceGraph3dLayoutMode = () => {
  return useAppConfigStore.getState().forceGraph3dOptions.layout;
};

export const getForceGraph3dOptions = () => {
  return useAppConfigStore.getState().forceGraph3dOptions;
};

export const setActiveLayout = (activeLayout: LayoutEngineOption) => {
  useAppConfigStore.setState(() => ({
    activeLayout,
    forceGraph3dOptions: { layout: "Layout" },
  }));
};

export const getActiveLayout = () => {
  return useAppConfigStore.getState().activeLayout;
};

export const setAppConfig = (appConfig: AppConfig) => {
  useAppConfigStore.setState(() => appConfig);
};

export const getAppConfig = () => {
  return useAppConfigStore.getState();
};

export const setIsDarkMode = (isDarkMode: boolean) => {
  useAppConfigStore.setState(() => ({
    isDarkMode,
  }));
};

export const getShowEntityDataCard = () => {
  console.log(
    "getting as ",
    useAppConfigStore.getState().windows.showEntityDataCard
  );
  return useAppConfigStore.getState().windows.showEntityDataCard;
};

export const setShowEntityDataCard = (showEntityDataCard: boolean) => {
  console.log("setting to ", showEntityDataCard);
  useAppConfigStore.setState(() => ({
    windows: { showEntityDataCard },
  }));
};

export default useAppConfigStore;
