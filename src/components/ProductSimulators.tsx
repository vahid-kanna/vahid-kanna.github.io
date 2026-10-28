import React, { useState } from 'react';
import { ArrowUpRight, ShieldAlert, ShieldCheck, Sliders, Radio } from 'lucide-react';
import {
  calculateSyncProRisk,
  evaluateRailRakshaVector,
  VectorMode,
} from '../utils/portfolioLogic';
import { playTactileClick } from '../utils/soundEngine';

export const SyncProSimulatorWidget: React.FC = () => {
  const [projectValueCr, setProjectValueCr] = useState<number>(45);
  const [scheduleMonths, setScheduleMonths] = useState<number>(18);
  const [weeklyDelayVariance, setWeeklyDelayVariance] = useState<number>(2);

  const metrics = calculateSyncProRisk({
    projectValueCr,
    scheduleMonths,
    weeklyDelayVariance,
  });

  const riskBadgeStyle =
    metrics.riskIndex === 'Critical'
      ? 'text-rose-300 border-rose-400/40 bg-rose-500/15'
      : metrics.riskIndex === 'Elevated'
      ? 'text-amber-300 border-amber-400/40 bg-amber-500/15'
      : 'text-emerald-300 border-emerald-400/40 bg-emerald-500/15';

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="my-4 rounded-xl border border-white/15 bg-[#0d0d0f]/95 p-4 sm:p-5 font-sans shadow-inner"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-white/10">
        <div className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-wider text-purple-300">
          <Sliders className="w-3.5 h-3.5" aria-hidden="true" />
          <span>SYNCPRO.ORG // INTERACTIVE DELAY &amp; HOLDING LOSS SIMULATOR</span>
        </div>
        <span
          className={`px-2 py-0.5 rounded font-mono text-[10px] uppercase border tabular-nums ${riskBadgeStyle}`}
        >
          LD Risk: {metrics.riskIndex}
        </span>
      </div>

      {/* Sliders Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div>
          <div className="flex items-center justify-between font-mono text-[11px] mb-1.5 tabular-nums">
            <label htmlFor="syncpro-val-slider" className="text-[var(--mut)]">
              Project Value
            </label>
            <span className="text-[var(--fg)] font-medium">₹{projectValueCr} Cr</span>
          </div>
          <input
            id="syncpro-val-slider"
            type="range"
            min={10}
            max={200}
            step={5}
            value={projectValueCr}
            onChange={(e) => {
              setProjectValueCr(Number(e.target.value));
              playTactileClick(1.05);
            }}
            className="w-full accent-purple-400 cursor-pointer h-1.5 bg-white/15 rounded-lg"
          />
          <div className="flex justify-between font-mono text-[9.5px] text-white/35 mt-1 tabular-nums">
            <span>₹10 Cr</span>
            <span>₹200 Cr</span>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between font-mono text-[11px] mb-1.5 tabular-nums">
            <label htmlFor="syncpro-sched-slider" className="text-[var(--mut)]">
              Critical Path
            </label>
            <span className="text-[var(--fg)] font-medium">{scheduleMonths} mo</span>
          </div>
          <input
            id="syncpro-sched-slider"
            type="range"
            min={12}
            max={36}
            step={1}
            value={scheduleMonths}
            onChange={(e) => {
              setScheduleMonths(Number(e.target.value));
              playTactileClick(1.1);
            }}
            className="w-full accent-purple-400 cursor-pointer h-1.5 bg-white/15 rounded-lg"
          />
          <div className="flex justify-between font-mono text-[9.5px] text-white/35 mt-1 tabular-nums">
            <span>12 mo</span>
            <span>36 mo</span>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between font-mono text-[11px] mb-1.5 tabular-nums">
            <label htmlFor="syncpro-var-slider" className="text-[var(--mut)]">
              Delay Variance
            </label>
            <span className="text-[var(--fg)] font-medium">{weeklyDelayVariance} wks</span>
          </div>
          <input
            id="syncpro-var-slider"
            type="range"
            min={1}
            max={6}
            step={1}
            value={weeklyDelayVariance}
            onChange={(e) => {
              setWeeklyDelayVariance(Number(e.target.value));
              playTactileClick(0.95);
            }}
            className="w-full accent-purple-400 cursor-pointer h-1.5 bg-white/15 rounded-lg"
          />
          <div className="flex justify-between font-mono text-[9.5px] text-white/35 mt-1 tabular-nums">
            <span>1 wk</span>
            <span>6 wks</span>
          </div>
        </div>
      </div>

      {/* Live Output Readout */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3 border-t border-white/10 font-mono tabular-nums">
        <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10">
          <div className="text-[9.5px] uppercase text-[var(--mut)]">Daily Holding Loss</div>
          <div className="text-sm sm:text-base font-medium text-white mt-0.5">
            ₹{metrics.dailyHoldingLossInr.toLocaleString('en-IN')}/d
          </div>
        </div>
        <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10">
          <div className="text-[9.5px] uppercase text-[var(--mut)]">AI Forewarning</div>
          <div className="text-sm sm:text-base font-medium text-emerald-300 mt-0.5">
            {metrics.daysSaved} days saved
          </div>
        </div>
        <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10">
          <div className="text-[9.5px] uppercase text-[var(--mut)]">Net Capital Saved</div>
          <div className="text-sm sm:text-base font-medium text-purple-200 mt-0.5">
            ₹{metrics.netCapitalSavedCr} Cr
          </div>
        </div>
        <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10 flex flex-col justify-between">
          <div className="text-[9.5px] uppercase text-[var(--mut)]">Savings (Lakhs)</div>
          <div className="text-xs sm:text-sm font-medium text-white/90 mt-0.5">
            ₹{metrics.netCapitalSavedLakhs} L
          </div>
        </div>
      </div>

      <div className="mt-3.5 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px]">
        <span className="text-[var(--mut)] text-[10px]">
          Model calibrated across 25+ site interviews at Nirmaan IIT Madras
        </span>
        <a
          href="https://syncpro.org"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-400/35 text-emerald-200 hover:bg-emerald-500/25 transition-colors whitespace-nowrap"
        >
          <span>Explore SyncPro Architecture</span>
          <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
};

export const RailRakshaVectorWidget: React.FC = () => {
  const [mode, setMode] = useState<VectorMode>('approaching');
  const [distanceMeters, setDistanceMeters] = useState<number>(420);

  const vecState = evaluateRailRakshaVector(mode, distanceMeters, 130);
  const isApproaching = vecState.warningTriggered;

  // Map distance (100m..900m) to SVG X coordinate
  // Crew is stationed at X = 290 on the SKM-UPD main line
  // When approaching, train is to the left (X = 40..230) moving right (+v)
  // When receding, train has passed crew to the right (X = 340..510) moving right (+v)
  const normDist = (distanceMeters - 100) / 800; // 0..1
  const trainX = isApproaching
    ? Math.round(225 - normDist * 175)
    : Math.round(345 + normDist * 165);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="my-4 rounded-xl border border-white/15 bg-[#0d0d0f]/95 p-4 sm:p-5 font-sans shadow-inner"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-white/10">
        <div className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-wider text-cyan-300">
          <Radio className="w-3.5 h-3.5" aria-hidden="true" />
          <span>RAILRAKSHA.TECH // 130 KM/H RECEDING VECTOR KINEMATICS</span>
        </div>

        {/* Toggle Buttons */}
        <div className="flex items-center gap-1 p-0.5 rounded-lg border border-white/15 bg-black/50 font-mono text-[10px]">
          <button
            type="button"
            onClick={() => {
              setMode('approaching');
              playTactileClick(1.15);
            }}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              isApproaching
                ? 'bg-rose-500/25 text-rose-200 border border-rose-400/40 font-medium'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Approaching Vector (Warning)
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('receding');
              playTactileClick(0.85);
            }}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              !isApproaching
                ? 'bg-emerald-500/25 text-emerald-200 border border-emerald-400/40 font-medium'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Receding Vector (0 False Alarm)
          </button>
        </div>
      </div>

      {/* 2D Vector Track Visualizer SVG */}
      <div className="relative rounded-lg border border-white/10 bg-[#08080a] p-3 mb-3 overflow-hidden">
        <svg
          viewBox="0 0 560 116"
          className="w-full h-24 sm:h-28 block select-none"
          aria-label="RailRaksha dual-track receding vector diagram"
        >
          {/* Sleeper ties */}
          {Array.from({ length: 28 }, (_, i) => (
            <g key={i} opacity="0.22">
              <line
                x1={i * 20 + 10}
                y1={36}
                x2={i * 20 + 10}
                y2={58}
                stroke="#a2a19b"
                strokeWidth="2"
              />
              <line
                x1={i * 20 + 10}
                y1={76}
                x2={i * 20 + 10}
                y2={94}
                stroke="#a2a19b"
                strokeWidth="1.5"
              />
            </g>
          ))}

          {/* Main Line Track (SKM-UPD Section) */}
          <line x1="0" y1="41" x2="560" y2="41" stroke="#eeece6" strokeWidth="1.5" opacity="0.55" />
          <line x1="0" y1="53" x2="560" y2="53" stroke="#eeece6" strokeWidth="1.5" opacity="0.55" />
          <text x="10" y="24" fill="#a2a19b" fontSize="9" fontFamily="monospace">
            SCR MAIN LINE · SKM–UPD CORRIDOR (130 KM/H)
          </text>

          {/* Adjacent Loop Line */}
          <line x1="0" y1="80" x2="560" y2="80" stroke="#a2a19b" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
          <line x1="0" y1="90" x2="560" y2="90" stroke="#a2a19b" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
          <text x="10" y="107" fill="#71717a" fontSize="8.5" fontFamily="monospace">
            LOOP LINE · LATERAL VECTOR FILTERED
          </text>

          {/* Vector Line between Train and Gang Crew */}
          <line
            x1={trainX}
            y1={47}
            x2={290}
            y2={47}
            stroke={isApproaching ? '#fb7185' : '#34d399'}
            strokeWidth="2.2"
            strokeDasharray={isApproaching ? 'none' : '4 4'}
          />

          {/* Gang Crew Station Marker at X=290 */}
          <g transform="translate(290, 47)">
            {isApproaching && (
              <circle r="20" fill="rgba(244, 63, 94, 0.18)" />
            )}
            <circle
              r="8"
              fill={isApproaching ? '#f43f5e' : '#10b981'}
              stroke="#ffffff"
              strokeWidth="1.5"
            />
            <text
              x="0"
              y="-14"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="9"
              fontFamily="monospace"
            >
              GANG CREW
            </text>
          </g>

          {/* 130 km/h Express Train Node + Velocity Vector Arrow */}
          <g transform={`translate(${trainX}, 47)`}>
            <rect
              x="-22"
              y="-9"
              width="44"
              height="18"
              rx="4"
              fill={isApproaching ? '#e11d48' : '#059669'}
              stroke="#ffffff"
              strokeWidth="1.2"
            />
            <text
              x="0"
              y="3"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="8.5"
              fontFamily="monospace"
              fontWeight="bold"
            >
              130km/h
            </text>
            {/* Velocity vector arrow always pointing right (direction of travel) */}
            <line
              x1="24"
              y1="0"
              x2="44"
              y2="0"
              stroke="#ffffff"
              strokeWidth="2"
            />
            <polygon points="44,-4 51,0 44,4" fill="#ffffff" />
          </g>
        </svg>

        {/* Distance Slider */}
        <div className="flex items-center gap-3 pt-2 border-t border-white/10 font-mono text-[10.5px] tabular-nums">
          <label htmlFor="rail-dist-slider" className="text-[var(--mut)] shrink-0">
            Track Distance: {distanceMeters}m
          </label>
          <input
            id="rail-dist-slider"
            type="range"
            min={100}
            max={900}
            step={20}
            value={distanceMeters}
            onChange={(e) => {
              setDistanceMeters(Number(e.target.value));
              playTactileClick(1.0);
            }}
            className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-white/15 rounded-lg"
          />
        </div>
      </div>

      {/* Telemetry Readout */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 font-mono text-xs tabular-nums">
        <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10">
          <div className="text-[9.5px] uppercase text-[var(--mut)]">Radial Velocity (dr/dt)</div>
          <div
            className={`text-sm font-medium mt-0.5 ${
              isApproaching ? 'text-rose-300' : 'text-emerald-300'
            }`}
          >
            {vecState.radialVelocityMs > 0 ? `+${vecState.radialVelocityMs}` : vecState.radialVelocityMs} m/s
          </div>
        </div>

        <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10">
          <div className="text-[9.5px] uppercase text-[var(--mut)]">Dot Product (r · v)</div>
          <div className="text-sm font-medium text-white mt-0.5">
            {vecState.dotProduct} ({isApproaching ? '< 0 Close' : '> 0 Recede'})
          </div>
        </div>

        <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10 flex items-center gap-2">
          {isApproaching ? (
            <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
          ) : (
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          )}
          <div className="min-w-0">
            <div className="text-[9.5px] uppercase text-[var(--mut)]">Crew Alert Status</div>
            <div
              className={`text-xs font-medium truncate ${
                isApproaching ? 'text-rose-200' : 'text-emerald-200'
              }`}
            >
              {isApproaching
                ? `SIREN ACTIVE · ${vecState.timeToImpactSec}s ETA`
                : '0 FALSE ALARMS (MUTED)'}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3.5 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px]">
        <span className="text-[var(--mut)] text-[10px]">
          Built for my father (Gang Mate, SCR SKM–UPD section) · 100% Offline IndexedDB
        </span>
        <div className="flex items-center gap-2">
          <a
            href="https://railraksha.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-500/15 border border-cyan-400/35 text-cyan-200 hover:bg-cyan-500/25 transition-colors whitespace-nowrap"
          >
            <span>railraksha.tech</span>
            <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
          </a>
          <a
            href="https://github.com/vahid-kanna/RailRaksha"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/[0.06] border border-white/15 text-white/85 hover:bg-white/15 transition-colors whitespace-nowrap"
          >
            <span>GitHub</span>
            <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
};
