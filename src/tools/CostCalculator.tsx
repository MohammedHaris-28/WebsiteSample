import { useState } from "react";

// ✅ Input Component
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

// 📊 Construction Types
const constructionTypes = [
  { label: "Basic", value: "basic", cost: 1500 },
  { label: "Standard", value: "standard", cost: 2000 },
  { label: "Premium", value: "premium", cost: 3000 },
];

const CostEstimator = () => {
  const [area, setArea] = useState("");
  const [floors, setFloors] = useState("1");
  const [type, setType] = useState("standard");

  const [customRate, setCustomRate] = useState("");
  const [useCustom, setUseCustom] = useState(false);

  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const a = parseFloat(area);
    const f = parseFloat(floors);

    if (!a || !f) return;

    const selectedType = constructionTypes.find(t => t.value === type);
    const rate = useCustom ? Number(customRate) : (selectedType?.cost || 0);

    if (!rate) return;

    const totalArea = a * f;
    const totalCost = totalArea * rate;

    // 📊 Breakdown
    const material = totalCost * 0.55;
    const labour = totalCost * 0.25;
    const finishing = totalCost * 0.20;

    setResult({
      totalArea,
      rate,
      totalCost,
      material,
      labour,
      finishing,
    });
  };

  return (
    <div className="glass-card-static p-6 lg:p-8 max-w-4xl rounded-[28px] space-y-8">

      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-semibold">Cost Estimator</h2>
        <p className="text-sm text-muted-foreground">
          Estimate total construction cost instantly
        </p>
      </div>

      {/* AREA */}
      <div className="grid md:grid-cols-2 gap-4">
        <Input label="Area (sq ft)" value={area} onChange={setArea} />
        <Input label="Number of Floors" value={floors} onChange={setFloors} />
      </div>

      {/* TYPE */}
      <div>
        <h3 className="mb-3">Construction Quality</h3>
        <Selector
          options={constructionTypes}
          selected={type}
          setSelected={setType}
        />
      </div>

      {/* CUSTOM RATE */}
      <div>
        <button
          onClick={() => setUseCustom(!useCustom)}
          className="text-sm text-accent"
        >
          {useCustom ? "Use Preset Rates" : "Use Custom Rate"}
        </button>

        {useCustom && (
          <div className="mt-3 max-w-xs">
            <Input
              label="Custom Cost per sq ft (₹)"
              value={customRate}
              onChange={setCustomRate}
            />
          </div>
        )}
      </div>

      {/* BUTTON */}
      <button
        onClick={calculate}
        className="w-full h-12 rounded-xl bg-accent text-accent-foreground font-medium"
      >
        Calculate Estimate
      </button>

      {/* RESULT */}
      {result && (
        <div className="pt-6 border-t space-y-4">

          <div className="flex justify-between">
            <span>Total Built Area</span>
            <span>{result.totalArea} sq ft</span>
          </div>

          <div className="flex justify-between">
            <span>Rate</span>
            <span>₹ {result.rate} / sq ft</span>
          </div>

          <div className="flex justify-between text-2xl font-bold text-accent">
            <span>Total Cost</span>
            <span>₹ {result.totalCost.toLocaleString()}</span>
          </div>

          {/* BREAKDOWN */}
          <div className="pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Material Cost (~55%)</span>
              <span>₹ {result.material.toLocaleString()}</span>
            </div>

            <div className="flex justify-between">
              <span>Labour Cost (~25%)</span>
              <span>₹ {result.labour.toLocaleString()}</span>
            </div>

            <div className="flex justify-between">
              <span>Finishing Cost (~20%)</span>
              <span>₹ {result.finishing.toLocaleString()}</span>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default CostEstimator;