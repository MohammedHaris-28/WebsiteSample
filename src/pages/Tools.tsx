import { useState } from "react";
import SectionEntrance from "@/components/SectionEntrance";
import {
  Calculator,
  Box,
  LayoutGrid,
  Layers,
  Square,
  DollarSign,
} from "lucide-react";

// IMPORT CALCULATORS
import BrickCalculator from "../tools/BrickCalculator";
import TileCalculator from "../tools/TilesCalculator";
import AreaCalculator from "../tools/AreaCalculator";
import MaterialEstimator from "../tools/MaterialEstimator";
import CostEstimator from "../tools/CostCalculator";
import StaircaseCalculator from "../tools/StaircaseCalculator";

const toolNav = [
  { key: "brick", label: "Brick Calculator", icon: Box },
  { key: "tile", label: "Tile Calculator", icon: LayoutGrid },
  { key: "staircase", label: "Staircase Calculator", icon: Layers },
  { key: "area", label: "Area Calculator", icon: Square },
  { key: "material", label: "Material Estimator", icon: Calculator },
  { key: "cost", label: "Cost Estimator", icon: DollarSign },
];

const Tools = () => {
  const [activeTool, setActiveTool] = useState("brick");

  const renderTool = () => {
    switch (activeTool) {
      case "brick":
        return <BrickCalculator />;

      case "tile":
        return <TileCalculator />;

      case "area":
        return <AreaCalculator />;

      case "material":
        return <MaterialEstimator />;

      case "cost":
        return <CostEstimator />;

      case "staircase":
        return <StaircaseCalculator />;

      case "concrete":
      case "cost":
        return (
          <div className="glass-card-static p-8 text-center rounded-2xl">
            <p className="text-muted-foreground">Tool coming soon...</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <main className="pt-16 lg:pt-20">
      <section className="section-padding">
        <div className="container-main">
          <SectionEntrance>
            <p className="label-mono mb-3">Engineering Tools</p>
            <h1 className="heading-display max-w-xl">
              Construction Calculators
            </h1>
            <p className="body-text mt-4">
              Smart tools for accurate and fast project estimation.
            </p>
          </SectionEntrance>

          {/* MAIN LAYOUT */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
            
            {/* SIDEBAR */}
            <div className="glass-card-static p-4 rounded-2xl h-fit">
              <div className="flex flex-col gap-2">
                {toolNav.map((tool) => {
                  const Icon = tool.icon;
                  const isActive = activeTool === tool.key;

                  return (
                    <button
                      key={tool.key}
                      onClick={() => setActiveTool(tool.key)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all
                      ${
                        isActive
                          ? "bg-accent text-accent-foreground"
                          : "hover:bg-secondary text-muted-foreground"
                      }`}
                    >
                      <Icon size={16} />
                      {tool.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* TOOL CONTENT */}
            <div>
              <SectionEntrance key={activeTool}>
                {renderTool()}
              </SectionEntrance>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
};

export default Tools;