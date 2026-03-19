import { useState } from "react";

// 📏 Units (to meters)
const units = [
  { label: "ft", value: "ft", factor: 0.3048 },
  { label: "m", value: "m", factor: 1 },
];

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

// ✅ Unit Selector
const UnitSelector = ({ selected, setSelected }: any) => (
  <div className="flex gap-1 bg-muted/40 p-1 rounded-xl">
    {units.map((u) => (
      <button
        key={u.value}
        onClick={() => setSelected(u.value)}
        className={`px-3 py-1 text-xs rounded-lg ${
          selected === u.value
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground"
        }`}
      >
        {u.label}
      </button>
    ))}
  </div>
);

const MaterialEstimator = () => {
  const [dimensions, setDimensions] = useState({
    l: "",
    w: "",
    h: "",
  });

  const [unit, setUnit] = useState("ft");
  const [ratio, setRatio] = useState("1:2:4");
  const [type, setType] = useState("concrete");

  const [result, setResult] = useState<any>(null);

  const convert = (val: string) => {
    const u = units.find((x) => x.value === unit);
    return (parseFloat(val) || 0) * (u?.factor || 1);
  };

  const calculate = () => {
    const l = convert(dimensions.l);
    const w = convert(dimensions.w);
    const h = convert(dimensions.h);

    if (!l || !w || !h) return;

    // ✅ Wet volume
    const wetVolume = l * w * h;

    // ✅ Dry factor
    const dryFactor = type === "concrete" ? 1.54 : 1.33;
    const dryVolume = wetVolume * dryFactor;

    // ✅ Parse ratio
    const parts = ratio.split(":").map(Number);
    if (parts.length < 2) return;

    const total = parts.reduce((a, b) => a + b, 0);

    const cementVol = (parts[0] / total) * dryVolume;
    const sandVol = (parts[1] / total) * dryVolume;
    const aggVol =
      parts.length === 3 ? (parts[2] / total) * dryVolume : 0;

    // ✅ Cement bags
    const cementBags = cementVol / 0.035;

    setResult({
      wetVolume,
      dryVolume,
      cementVol,
      sandVol,
      aggVol,
      cementBags,
    });
  };

  return (
    <div className="glass-card-static p-6 lg:p-8 max-w-4xl rounded-[28px] space-y-8">

      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-semibold">Material Estimator</h2>
        <p className="text-sm text-muted-foreground">
          Calculate cement, sand & aggregate using mix ratio
        </p>
      </div>

      {/* TYPE */}
      <div className="flex gap-4">
        <button
          onClick={() => setType("concrete")}
          className={type === "concrete" ? "text-accent" : ""}
        >
          Concrete
        </button>
        <button
          onClick={() => setType("mortar")}
          className={type === "mortar" ? "text-accent" : ""}
        >
          Mortar
        </button>
      </div>

      {/* DIMENSIONS */}
      <div>
        <div className="flex justify-between mb-3">
          <h3>Dimensions</h3>
          <UnitSelector selected={unit} setSelected={setUnit} />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <Input label="Length" value={dimensions.l} onChange={(v:any)=>setDimensions(p=>({...p,l:v}))}/>
          <Input label="Width" value={dimensions.w} onChange={(v:any)=>setDimensions(p=>({...p,w:v}))}/>
          <Input label="Height" value={dimensions.h} onChange={(v:any)=>setDimensions(p=>({...p,h:v}))}/>
        </div>
      </div>

      {/* RATIO */}
      <div className="max-w-xs">
        <Input label="Mix Ratio (e.g. 1:2:4)" value={ratio} onChange={setRatio}/>
      </div>

      {/* BUTTON */}
      <button
        onClick={calculate}
        className="w-full h-12 rounded-xl bg-accent text-accent-foreground font-medium"
      >
        Calculate
      </button>

      {/* RESULT */}
      {result && (
        <div className="pt-6 border-t space-y-3">

          <div className="flex justify-between">
            <span>Wet Volume</span>
            <span>{result.wetVolume.toFixed(3)} m³</span>
          </div>

          <div className="flex justify-between">
            <span>Dry Volume</span>
            <span>{result.dryVolume.toFixed(3)} m³</span>
          </div>

          <div className="flex justify-between">
            <span>Cement</span>
            <span>
              {result.cementBags.toFixed(1)} bags ({result.cementVol.toFixed(3)} m³)
            </span>
          </div>

          <div className="flex justify-between">
            <span>Sand</span>
            <span>{result.sandVol.toFixed(3)} m³</span>
          </div>

          {type === "concrete" && (
            <div className="flex justify-between">
              <span>Aggregate</span>
              <span>{result.aggVol.toFixed(3)} m³</span>
            </div>
          )}

        </div>
      )}
    </div>
  );
};

export default MaterialEstimator;