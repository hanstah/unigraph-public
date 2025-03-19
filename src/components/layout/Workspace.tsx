import React, { useMemo } from "react";
import {
  createDefaultLeftMenus,
  createDefaultRightMenus,
  footerContent,
} from "../../configs/sidebarMenuConfig";
import { LayoutEngineOption } from "../../core/layouts/LayoutEngine";
import Sidebar from "../../Sidebar";
import UniAppToolbar, { IMenuConfig } from "../UniAppToolbar";
import styles from "./Workspace.module.css";

interface WorkspaceProps {
  menuConfig: IMenuConfig;
  currentSceneGraph: any;
  appConfig: any;
  isDarkMode: boolean;
  selectedSimulation: string;
  simulations: any;
  children: React.ReactNode;
  onViewChange: (view: string) => void;
  onSelectResult: (nodeId: string) => void;
  onSearchResult: (nodeIds: string[]) => void;
  onHighlight: (nodeId: string) => void;
  onApplyForceGraphConfig: (config: any) => void;
  setSelectedForceGraph3dLayoutMode: (mode: any) => void;
  applyNewLayout: (layout: LayoutEngineOption) => void;
  renderLayoutModeRadio: () => React.ReactNode;
  showFilterWindow: () => void;
  showFilterManager: () => void;
  clearFilters: () => void;
  renderNodeLegend: React.ReactNode;
  renderEdgeLegend: React.ReactNode;
  showToolbar?: boolean;
  showLeftSidebar?: boolean;
  showRightSidebar?: boolean;
  showPathAnalysis: () => void;
  showLoadSceneGraphWindow: () => void;
}

const Workspace: React.FC<WorkspaceProps> = ({
  menuConfig,
  currentSceneGraph,
  appConfig,
  isDarkMode,
  selectedSimulation,
  simulations,
  children,
  onViewChange,
  onSelectResult,
  onSearchResult,
  onHighlight,
  onApplyForceGraphConfig,
  setSelectedForceGraph3dLayoutMode,
  applyNewLayout,
  renderLayoutModeRadio,
  showFilterWindow,
  showFilterManager,
  clearFilters,
  renderNodeLegend,
  renderEdgeLegend,
  showToolbar = true,
  showLeftSidebar = true,
  showRightSidebar = true,
  showPathAnalysis,
  showLoadSceneGraphWindow,
}) => {
  const renderUniappToolbar = useMemo(() => {
    if (!showToolbar) {
      return null;
    }
    return (
      <div className={styles.toolbar}>
        <UniAppToolbar
          config={menuConfig}
          sceneGraph={currentSceneGraph}
          activeView={appConfig.activeView}
          onViewChange={onViewChange}
          simulationList={Object.keys(simulations)}
          selectedSimulation={selectedSimulation}
          isDarkMode={isDarkMode}
          onSelectResult={onSelectResult}
          onSearchResult={onSearchResult}
          onHighlight={onHighlight}
        />
      </div>
    );
  }, [
    appConfig.activeView,
    currentSceneGraph,
    isDarkMode,
    menuConfig,
    onHighlight,
    onSearchResult,
    onSelectResult,
    onViewChange,
    selectedSimulation,
    showToolbar,
    simulations,
  ]);

  const renderLeftSideBar = useMemo(() => {
    if (!showLeftSidebar) {
      return null;
    }
    return (
      <Sidebar
        position="left"
        style={{
          height: "100%",
          top: 0,
        }}
        menuItems={createDefaultLeftMenus({
          onLayoutChange: (layout: LayoutEngineOption) =>
            applyNewLayout(layout),
          activeLayout: appConfig.activeLayout,
          physicsMode:
            appConfig.forceGraph3dOptions.layout === "Physics" &&
            appConfig.activeView === "ForceGraph3d",
          isDarkMode,
          onApplyForceGraphConfig: onApplyForceGraphConfig,
          initialForceGraphConfig:
            currentSceneGraph.getForceGraphRenderConfig(),
          sceneGraph: currentSceneGraph,
          onShowFilter: showFilterWindow,
          onShowFilterManager: showFilterManager,
          onClearFilters: clearFilters,
          onShowPathAnalysis: showPathAnalysis,
          onShowLoadSceneGraphWindow: showLoadSceneGraphWindow,
        })}
        defaultIsOpen={true}
        isDarkMode={isDarkMode}
        footer={footerContent}
      />
    );
  }, [
    appConfig.activeLayout,
    appConfig.activeView,
    appConfig.forceGraph3dOptions.layout,
    applyNewLayout,
    clearFilters,
    currentSceneGraph,
    isDarkMode,
    onApplyForceGraphConfig,
    showLoadSceneGraphWindow,
    showFilterManager,
    showFilterWindow,
    showLeftSidebar,
    showPathAnalysis,
  ]);

  const renderRightSideBar = useMemo(() => {
    if (!showRightSidebar) {
      return null;
    }
    return (
      <Sidebar
        position="right"
        style={{
          height: "100%",
          top: 0,
        }}
        title="Controls"
        menuItems={createDefaultRightMenus(
          () => (
            <>
              {renderLayoutModeRadio()}
              {renderNodeLegend}
              {renderEdgeLegend}
            </>
          ),
          appConfig.activeView === "ForceGraph3d",
          appConfig.forceGraph3dOptions.layout,
          setSelectedForceGraph3dLayoutMode,
          isDarkMode
        )}
        defaultIsOpen={true}
        isDarkMode={isDarkMode}
        minimal={true}
      />
    );
  }, [
    appConfig.activeView,
    appConfig.forceGraph3dOptions.layout,
    isDarkMode,
    renderEdgeLegend,
    renderLayoutModeRadio,
    renderNodeLegend,
    setSelectedForceGraph3dLayoutMode,
    showRightSidebar,
  ]);

  return (
    <div className={styles.workspace}>
      {renderUniappToolbar}
      <div className={styles.content}>
        <div className={styles.sidebarLayer}>{renderLeftSideBar}</div>
        <main className={styles.main}>
          <div className={styles.graphContainer}>{children}</div>
        </main>
        <div className={styles.sidebarLayer}>{renderRightSideBar}</div>
      </div>
    </div>
  );
};

export default Workspace;
