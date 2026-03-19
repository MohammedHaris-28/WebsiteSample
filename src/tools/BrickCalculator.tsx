import { useState } from "react";
import wallImg from "@/assets/wall.png"; 

const units = [
  { label: "mm", value: "mm", factor: 0.001 },
  { label: "cm", value: "cm", factor: 0.01 },
  { label: "inch", value: "inch", factor: 0.0254 },
  { label: "ft", value: "ft", factor: 0.3048 },
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
        if (val === "" || /^\d*\.?\d*$/.test(val)) {
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

const BrickCalculator = () => {
  const [wall, setWall] = useState({ h: "", w: "", t: "" });
  const [brick, setBrick] = useState({ h: "", w: "", t: "" });
  const [mortar, setMortar] = useState("");

  const [wallUnit, setWallUnit] = useState("ft");
  const [brickUnit, setBrickUnit] = useState("mm");
  const [mortarUnit, setMortarUnit] = useState("mm");

  const [includeWastage, setIncludeWastage] = useState(true);

  const [result, setResult] = useState<any>(null);

  const convert = (val: string, unit: string) => {
    const u = units.find((x) => x.value === unit);
    return (parseFloat(val) || 0) * (u?.factor || 1);
  };

  const calculate = () => {
    const wh = convert(wall.h, wallUnit);
    const ww = convert(wall.w, wallUnit);
    const wt = convert(wall.t, wallUnit);

    const bh = convert(brick.h, brickUnit);
    const bw = convert(brick.w, brickUnit);
    const bt = convert(brick.t, brickUnit);

    const m = convert(mortar, mortarUnit); // can be 0

    // ✅ VALIDATION (allow 0 mortar)
    if (!wh || !ww || !wt || !bh || !bw || !bt) return;

    // ✅ Wall volume
    const wallVolume = wh * ww * wt;

    let brickVolume;

    if (m === 0) {
      // exact (no mortar)
      brickVolume = bh * bw * bt;
    } else {
      // effective brick size (industry standard)
      brickVolume =
        (bh + m) *
        (bw + m) *
        (bt + m);
    }

    const rawBricks = wallVolume / brickVolume;

    // ✅ robust rounding
    let finalBricks;
    if (includeWastage && m > 0) {
      finalBricks = Math.ceil(rawBricks * 1.1);
    } else {
      finalBricks = Math.round(rawBricks);
    }

    setResult({
      volume: wallVolume,
      raw: rawBricks,
      bricks: finalBricks,
    });
  };

  return (
    <div className="glass-card-static p-6 lg:p-8 max-w-4xl rounded-[28px] space-y-8">
      <div>
        <h2 className="text-2xl font-semibold">Brick Calculator</h2>
        <p className="text-sm text-muted-foreground">
          Accurate brick estimation (industry-grade logic)
        </p>
      </div>

      {/* IMAGE */}
     <div className="w-full flex justify-center">
  <div className="w-full max-w-md rounded-2xl border border-border bg-muted/20 p-4">
    <img
      src={wallImg}
      alt="Wall diagram"
      className="w-full h-auto object-contain"
    />
  </div>
</div>

      {/* WALL */}
      <div>
        <div className="flex justify-between mb-3">
          <h3>Wall Section</h3>
          <UnitSelector selected={wallUnit} setSelected={setWallUnit} />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <Input label="Height" value={wall.h} onChange={(v:any)=>setWall(p=>({...p,h:v}))}/>
          <Input label="Width" value={wall.w} onChange={(v:any)=>setWall(p=>({...p,w:v}))}/>
          <Input label="Thickness" value={wall.t} onChange={(v:any)=>setWall(p=>({...p,t:v}))}/>
        </div>
      </div>

      {/* BRICK */}
      <div>
        <div className="flex justify-between mb-3">
          <h3>Brick Section</h3>
          <UnitSelector selected={brickUnit} setSelected={setBrickUnit} />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <Input label="Height" value={brick.h} onChange={(v:any)=>setBrick(p=>({...p,h:v}))}/>
          <Input label="Width" value={brick.w} onChange={(v:any)=>setBrick(p=>({...p,w:v}))}/>
          <Input label="Thickness" value={brick.t} onChange={(v:any)=>setBrick(p=>({...p,t:v}))}/>
        </div>
      </div>

      {/* MORTAR */}
      <div>
        <div className="flex justify-between mb-3">
          <h3>Mortar Thickness</h3>
          <UnitSelector selected={mortarUnit} setSelected={setMortarUnit} />
        </div>

        <div className="max-w-xs">
          <Input label="Mortar Thickness" value={mortar} onChange={setMortar}/>
        </div>
      </div>

      {/* TOGGLE */}
      <div className="flex items-center justify-between">
        <span className="text-sm">Include 10% Wastage</span>
        <input
          type="checkbox"
          checked={includeWastage}
          onChange={() => setIncludeWastage(!includeWastage)}
        />
      </div>

      {/* BUTTON */}
      <button
        onClick={calculate}
        className="w-full h-12 rounded-xl bg-accent text-accent-foreground"
      >
        Calculate
      </button>

      {/* RESULT */}
      {result && (
        <div className="pt-6 border-t space-y-3">
          <div className="flex justify-between">
            <span>Wall Volume</span>
            <span>{result.volume.toFixed(4)} m³</span>
          </div>

          <div className="flex justify-between">
            <span>Exact Bricks</span>
            <span>{result.raw.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-xl font-bold text-accent">
            <span>Final Bricks</span>
            <span>{result.bricks}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrickCalculator;