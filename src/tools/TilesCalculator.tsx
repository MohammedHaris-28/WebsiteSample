import { useState } from "react";

const units = [
  { label: "mm", value: "mm", factor: 0.001 },
  { label: "cm", value: "cm", factor: 0.01 },
  { label: "inch", value: "inch", factor: 0.0254 },
  { label: "ft", value: "ft", factor: 0.3048 },
  { label: "m", value: "m", factor: 1 },
];

const Input = ({ label, value, onChange }: any) => (
  <div className="flex flex-col gap-1">
    <span className="text-xs text-muted-foreground">{label}</span>
    <input
      type="text"
      inputMode="decimal"
      value={value}
      onChange={(e) => {
        const val = e.target.value;
        if (val === "" || /^-?\d*\.?\d*$/.test(val)) {
          onChange(val);
        }
      }}
      className="w-full h-12 px-4 rounded-xl bg-muted/40 border border-transparent 
      focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
    />
  </div>
);

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

const TileCalculator = () => {
  const [tile, setTile] = useState({ l: "", w: "" });
  const [area, setArea] = useState({ l: "", w: "", total: "" });

  const [tileUnit, setTileUnit] = useState("inch");
  const [areaUnit, setAreaUnit] = useState("ft");
  const [gapUnit, setGapUnit] = useState("inch");

  const [gap, setGap] = useState("0.25");
  const [boxSize, setBoxSize] = useState("");
  const [price, setPrice] = useState("");

  const [useTotalArea, setUseTotalArea] = useState(false);

  const [result, setResult] = useState<any>(null);

  const convert = (val: string, unit: string) => {
    const u = units.find((x) => x.value === unit);
    return (parseFloat(val) || 0) * (u?.factor || 1);
  };

  const calculate = () => {
    const tl = convert(tile.l, tileUnit);
    const tw = convert(tile.w, tileUnit);

    const g = convert(gap, gapUnit);

    if (!tl || !tw) return;

    let areaM2;

    if (useTotalArea) {
      areaM2 = convert(area.total, areaUnit);
    } else {
      const al = convert(area.l, areaUnit);
      const aw = convert(area.w, areaUnit);
      if (!al || !aw) return;
      areaM2 = al * aw;
    }

    // ✅ Effective tile size with gap
    const effectiveLength = tl + g;
    const effectiveWidth = tw + g;

    const tileArea = effectiveLength * effectiveWidth;

    const rawTiles = areaM2 / tileArea;

    const totalTiles = Math.ceil(rawTiles);

    // 📦 Boxes
    let boxes = null;
    if (boxSize) {
      boxes = Math.ceil(totalTiles / Number(boxSize));
    }

    // 💰 Cost
    let totalCost = null;
    if (price) {
      totalCost = totalTiles * Number(price);
    }

    setResult({
      area: areaM2,
      tiles: totalTiles,
      raw: rawTiles,
      boxes,
      cost: totalCost,
    });
  };

  return (
    <div className="glass-card-static p-6 lg:p-8 max-w-4xl rounded-[28px] space-y-8">

      <div>
        <h2 className="text-2xl font-semibold">Tile Calculator</h2>
        <p className="text-sm text-muted-foreground">
          Calculate tiles with grout spacing, boxes & cost
        </p>
      </div>

      
      {/* TILE SIZE */}
      <div>
        <div className="flex justify-between mb-3">
          <h3>Tile Size</h3>
          <UnitSelector selected={tileUnit} setSelected={setTileUnit} />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Input label="Length" value={tile.l} onChange={(v:any)=>setTile(p=>({...p,l:v}))}/>
          <Input label="Width" value={tile.w} onChange={(v:any)=>setTile(p=>({...p,w:v}))}/>
        </div>
      </div>

      {/* AREA */}
      <div>
        <h3 className="mb-3">Area to Cover</h3>

        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setUseTotalArea(false)}
            className={!useTotalArea ? "text-accent" : ""}
          >
            Use Dimensions
          </button>
          <button
            onClick={() => setUseTotalArea(true)}
            className={useTotalArea ? "text-accent" : ""}
          >
            Use Total Area
          </button>
        </div>

        {!useTotalArea ? (
          <div>
            <UnitSelector selected={areaUnit} setSelected={setAreaUnit} />
            <div className="grid md:grid-cols-2 gap-4 mt-3">
              <Input label="Length" value={area.l} onChange={(v:any)=>setArea(p=>({...p,l:v}))}/>
              <Input label="Width" value={area.w} onChange={(v:any)=>setArea(p=>({...p,w:v}))}/>
            </div>
          </div>
        ) : (
          <div>
            <UnitSelector selected={areaUnit} setSelected={setAreaUnit} />
            <div className="mt-3">
              <Input label="Total Area" value={area.total} onChange={(v:any)=>setArea(p=>({...p,total:v}))}/>
            </div>
          </div>
        )}
      </div>

      {/* GAP */}
      <div>
        <div className="flex justify-between mb-3">
          <h3>Gap Size (Grout)</h3>
          <UnitSelector selected={gapUnit} setSelected={setGapUnit} />
        </div>

        <div className="max-w-xs">
          <Input label="Gap Size" value={gap} onChange={setGap}/>
        </div>
      </div>

      {/* OPTIONAL */}
      <div className="grid md:grid-cols-2 gap-4">
        <Input label="Tiles per Box" value={boxSize} onChange={setBoxSize}/>
        <Input label="Price per Tile" value={price} onChange={setPrice}/>
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
            <span>Total Area</span>
            <span>{result.area.toFixed(2)} m²</span>
          </div>

          <div className="flex justify-between">
            <span>Exact Tiles</span>
            <span>{result.raw.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-xl font-bold text-accent">
            <span>Total Tiles</span>
            <span>{result.tiles}</span>
          </div>

          {result.boxes && (
            <div className="flex justify-between">
              <span>Boxes Required</span>
              <span>{result.boxes}</span>
            </div>
          )}

          {result.cost && (
            <div className="flex justify-between">
              <span>Total Cost</span>
              <span>₹ {result.cost}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TileCalculator;