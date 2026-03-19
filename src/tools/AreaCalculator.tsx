import { useState } from "react";

// 📐 Area Units (to m²)
const areaUnits = [
  { label: "sq ft", value: "sqft", factor: 0.092903 },
  { label: "sq m", value: "sqm", factor: 1 },
  { label: "acre", value: "acre", factor: 4046.86 },
  { label: "gunta", value: "gunta", factor: 101.17 },
  { label: "bigha", value: "bigha", factor: 2529.29 },
];

// 📏 Length Units (to meters)
const lengthUnits = [
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

// ✅ Selector
const Selector = ({ options, selected, setSelected }: any) => (
  <div className="flex gap-1 bg-muted/40 p-1 rounded-xl flex-wrap">
    {options.map((o: any) => (
      <button
        key={o.value}
        onClick={() => setSelected(o.value)}
        className={`px-3 py-1 text-xs rounded-lg ${
          selected === o.value
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground"
        }`}
      >
        {o.label}
      </button>
    ))}
  </div>
);

const AreaCalculator = () => {
  const [mode, setMode] = useState<"dimension" | "direct">("dimension");

  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [directArea, setDirectArea] = useState("");

  const [lengthUnit, setLengthUnit] = useState("ft");
  const [areaUnit, setAreaUnit] = useState("sqft");
  const [outputUnit, setOutputUnit] = useState("sqft");

  const [result, setResult] = useState<any>(null);

  const convertLength = (val: string, unit: string) => {
    const u = lengthUnits.find((x) => x.value === unit);
    return (parseFloat(val) || 0) * (u?.factor || 1);
  };

  const convertAreaToM2 = (val: string, unit: string) => {
    const u = areaUnits.find((x) => x.value === unit);
    return (parseFloat(val) || 0) * (u?.factor || 1);
  };

  const convertFromM2 = (val: number, unit: string) => {
    const u = areaUnits.find((x) => x.value === unit);
    return val / (u?.factor || 1);
  };

  const calculate = () => {
    let areaM2 = 0;

    if (mode === "dimension") {
      const l = convertLength(length, lengthUnit);
      const w = convertLength(width, lengthUnit);

      if (!l || !w) return;

      areaM2 = l * w;
    } else {
      areaM2 = convertAreaToM2(directArea, areaUnit);
      if (!areaM2) return;
    }

    const converted = convertFromM2(areaM2, outputUnit);

    setResult({
      base: areaM2,
      converted,
    });
  };

  return (
    <div className="glass-card-static p-6 lg:p-8 max-w-4xl rounded-[28px] space-y-8">

      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-semibold">Area Calculator</h2>
        <p className="text-sm text-muted-foreground">
          Convert and calculate land & floor area easily
        </p>
      </div>

      {/* MODE SWITCH */}
      <div className="flex gap-4">
        <button
          onClick={() => setMode("dimension")}
          className={mode === "dimension" ? "text-accent" : ""}
        >
          Length × Width
        </button>
        <button
          onClick={() => setMode("direct")}
          className={mode === "direct" ? "text-accent" : ""}
        >
         
        </button>
      </div>

      {/* DIMENSION MODE */}
      {mode === "dimension" && (
        <div>
          <div className="flex justify-between mb-3">
            <h3>Dimensions</h3>
            <Selector
              options={lengthUnits}
              selected={lengthUnit}
              setSelected={setLengthUnit}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Input label="Length" value={length} onChange={setLength} />
            <Input label="Width" value={width} onChange={setWidth} />
          </div>
        </div>
      )}

      {/* DIRECT MODE */}
      {mode === "direct" && (
        <div>
          <div className="flex justify-between mb-3">
            <h3>Area Input</h3>
            <Selector
              options={areaUnits}
              selected={areaUnit}
              setSelected={setAreaUnit}
            />
          </div>

          <div className="max-w-xs">
            <Input
              label="Total Area"
              value={directArea}
              onChange={setDirectArea}
            />
          </div>
        </div>
      )}

      {/* OUTPUT UNIT */}
      <div>
        <h3 className="mb-3">Convert Result To</h3>
        <Selector
          options={areaUnits}
          selected={outputUnit}
          setSelected={setOutputUnit}
        />
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
            <span>Area (m²)</span>
            <span>{result.base.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-xl font-bold text-accent">
            <span>Converted Area</span>
            <span>{result.converted.toFixed(2)} {outputUnit}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AreaCalculator;