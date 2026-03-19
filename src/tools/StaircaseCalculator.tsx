import { useState } from "react";

// ✅ Input
const Input = ({ label, value, onChange }: any) => (
  <div className="flex flex-col gap-1">
    <span className="text-xs text-muted-foreground">{label}</span>
    <input
      type="text"
      inputMode="decimal"
      value={value}
      onChange={(e) => {
        const val = e.target.value;
        if (val === "" || /^\d*\.?\d*$/.test(val)) {
          onChange(val);
        }
      }}
      className="w-full h-12 px-4 rounded-xl bg-muted/40 border border-transparent 
      focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
    />
  </div>
);

// ✅ Toggle Tabs
const Tabs = ({ tabs, active, setActive }: any) => (
  <div className="flex bg-muted/40 p-1 rounded-xl">
    {tabs.map((t: any) => (
      <button
        key={t.value}
        onClick={() => setActive(t.value)}
        className={`flex-1 py-2 text-sm rounded-lg ${
          active === t.value
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground"
        }`}
      >
        {t.label}
      </button>
    ))}
  </div>
);

const StaircaseCalculator = () => {
  const [mode, setMode] = useState("auto");

  // Inputs
  const [totalRise, setTotalRise] = useState("");
  const [totalRun, setTotalRun] = useState("");

  const [riser, setRiser] = useState("7"); // default
  const [tread, setTread] = useState("10");

  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const rise = parseFloat(totalRise);
    const run = parseFloat(totalRun);
    const r = parseFloat(riser);
    const t = parseFloat(tread);

    if (!rise || (!run && mode === "auto")) return;

    let steps = 0;
    let finalRiser = 0;
    let finalTread = 0;
    let totalRunCalc = 0;

    if (mode === "auto") {
      // AUTO: given total rise + run
      steps = Math.round(rise / 7); // ideal riser ~7 inch
      finalRiser = rise / steps;
      finalTread = run / steps;
      totalRunCalc = run;
    } else {
      // MANUAL: given riser + tread
      steps = Math.ceil(rise / r);
      finalRiser = rise / steps;
      finalTread = t;
      totalRunCalc = steps * t;
    }

    // Geometry
    const angle = Math.atan(finalRiser / finalTread) * (180 / Math.PI);
    const stringer = Math.sqrt(
      Math.pow(rise, 2) + Math.pow(totalRunCalc, 2)
    );

    setResult({
      steps,
      finalRiser,
      finalTread,
      totalRunCalc,
      angle,
      stringer,
    });
  };

  return (
    <div className="glass-card-static p-6 lg:p-8 max-w-5xl rounded-[28px] space-y-8">

      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-semibold">Staircase Calculator</h2>
        <p className="text-sm text-muted-foreground">
          Calculate steps, riser, tread, and geometry
        </p>
      </div>

      {/* MODE */}
      <Tabs
        tabs={[
          { label: "Auto (Rise + Run)", value: "auto" },
          { label: "Manual (Riser + Tread)", value: "manual" },
        ]}
        active={mode}
        setActive={setMode}
      />

      {/* INPUTS */}
      <div className="grid md:grid-cols-2 gap-4">
        <Input label="Total Rise (inches)" value={totalRise} onChange={setTotalRise} />

        {mode === "auto" ? (
          <Input label="Total Run (inches)" value={totalRun} onChange={setTotalRun} />
        ) : (
          <Input label="Riser Height (inches)" value={riser} onChange={setRiser} />
        )}

        {mode === "manual" && (
          <Input label="Tread Depth (inches)" value={tread} onChange={setTread} />
        )}
      </div>

      {/* CALCULATE */}
      <button
        onClick={calculate}
        className="w-full h-12 rounded-xl bg-accent text-accent-foreground font-medium"
      >
        Calculate Staircase
      </button>

      {/* RESULT */}
      {result && (
        <div className="grid lg:grid-cols-2 gap-6 pt-6 border-t">

          {/* DATA */}
          <div className="space-y-3 text-sm">

            <div className="flex justify-between">
              <span>Number of Steps</span>
              <span>{result.steps}</span>
            </div>

            <div className="flex justify-between">
              <span>Riser Height</span>
              <span>{result.finalRiser.toFixed(2)} in</span>
            </div>

            <div className="flex justify-between">
              <span>Tread Depth</span>
              <span>{result.finalTread.toFixed(2)} in</span>
            </div>

            <div className="flex justify-between">
              <span>Total Run</span>
              <span>{result.totalRunCalc.toFixed(2)} in</span>
            </div>

            <div className="flex justify-between">
              <span>Stair Angle</span>
              <span>{result.angle.toFixed(2)}°</span>
            </div>

            <div className="flex justify-between text-accent font-semibold">
              <span>Stringer Length</span>
              <span>{result.stringer.toFixed(2)} in</span>
            </div>

          </div>

          {/* IMAGE PLACEHOLDER */}
          <div className="w-full h-[260px] rounded-2xl border border-dashed flex items-center justify-center text-muted-foreground text-sm">
            Stair Diagram Preview (Place Image Here)
          </div>

        </div>
      )}
    </div>
  );
};

export default StaircaseCalculator;