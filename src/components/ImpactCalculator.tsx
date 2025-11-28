"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

// SDG goals data with colors
const SDG_GOALS: Record<string, { name: string; color: string; icon: string }> = {
  sdg1: { name: "No Poverty", color: "#E5243B", icon: "1" },
  sdg2: { name: "Zero Hunger", color: "#DDA63A", icon: "2" },
  sdg3: { name: "Good Health", color: "#4C9F38", icon: "3" },
  sdg4: { name: "Quality Education", color: "#C5192D", icon: "4" },
  sdg5: { name: "Gender Equality", color: "#FF3A21", icon: "5" },
  sdg6: { name: "Clean Water", color: "#26BDE2", icon: "6" },
  sdg7: { name: "Clean Energy", color: "#FCC30B", icon: "7" },
  sdg8: { name: "Decent Work", color: "#A21942", icon: "8" },
  sdg9: { name: "Innovation", color: "#FD6925", icon: "9" },
  sdg10: { name: "Reduced Inequality", color: "#DD1367", icon: "10" },
  sdg11: { name: "Sustainable Cities", color: "#FD9D24", icon: "11" },
  sdg12: { name: "Responsible Consumption", color: "#BF8B2E", icon: "12" },
  sdg13: { name: "Climate Action", color: "#3F7E44", icon: "13" },
  sdg14: { name: "Life Below Water", color: "#0A97D9", icon: "14" },
  sdg15: { name: "Life on Land", color: "#56C02B", icon: "15" },
  sdg16: { name: "Peace & Justice", color: "#00689D", icon: "16" },
  sdg17: { name: "Partnerships", color: "#19486A", icon: "17" },
};

interface Activity {
  id: string;
  name: string;
  description: string;
  basePoints: number;
  hourMultiplier: number;
  peopleMultiplier: number;
  sdgGoals: string[];
  icon: string;
  maxHours?: number;
  maxPeople?: number;
}

const ACTIVITIES: Activity[] = [
  {
    id: "coaching",
    name: "Youth Coaching",
    description: "Lead football training sessions for local youth programs",
    basePoints: 50,
    hourMultiplier: 25,
    peopleMultiplier: 5,
    sdgGoals: ["sdg3", "sdg4", "sdg5"],
    icon: "⚽",
    maxHours: 40,
    maxPeople: 100,
  },
  {
    id: "cleanup",
    name: "Environmental Cleanup",
    description: "Organize beach, park, or community cleanups",
    basePoints: 30,
    hourMultiplier: 20,
    peopleMultiplier: 3,
    sdgGoals: ["sdg13", "sdg14", "sdg15"],
    icon: "🌱",
    maxHours: 20,
    maxPeople: 50,
  },
  {
    id: "social",
    name: "Social Media Amplification",
    description: "Create and share content promoting women's sports",
    basePoints: 25,
    hourMultiplier: 15,
    peopleMultiplier: 0.1,
    sdgGoals: ["sdg5", "sdg10"],
    icon: "📱",
    maxHours: 10,
    maxPeople: 10000,
  },
  {
    id: "charity",
    name: "Charity Event",
    description: "Organize fundraising events for local causes",
    basePoints: 100,
    hourMultiplier: 30,
    peopleMultiplier: 8,
    sdgGoals: ["sdg1", "sdg11", "sdg17"],
    icon: "❤️",
    maxHours: 50,
    maxPeople: 200,
  },
  {
    id: "mentoring",
    name: "Player Mentoring",
    description: "Mentor younger or amateur players one-on-one",
    basePoints: 40,
    hourMultiplier: 35,
    peopleMultiplier: 20,
    sdgGoals: ["sdg4", "sdg5", "sdg8"],
    icon: "🌟",
    maxHours: 30,
    maxPeople: 20,
  },
  {
    id: "speaking",
    name: "Speaking Engagement",
    description: "Speak at schools, events, or conferences about women in sport",
    basePoints: 75,
    hourMultiplier: 50,
    peopleMultiplier: 2,
    sdgGoals: ["sdg4", "sdg5", "sdg10"],
    icon: "🎤",
    maxHours: 10,
    maxPeople: 500,
  },
];

interface SelectedActivity {
  activity: Activity;
  hours: number;
  peopleReached: number;
}

function Slider({
  value,
  onChange,
  min,
  max,
  label,
  suffix,
}: {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  label: string;
  suffix: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-white/60">{label}</span>
        <span className="font-bold text-white">
          {value.toLocaleString()} {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-[var(--color-volt)]"
      />
      <div className="flex justify-between text-xs text-white/40">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

function ActivityCard({
  activity,
  isSelected,
  onSelect,
}: {
  activity: Activity;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "w-full rounded-xl border p-4 text-left transition-all",
        isSelected
          ? "border-[var(--color-volt)] bg-[var(--color-volt)]/10"
          : "border-white/10 bg-white/5 hover:border-white/20"
      )}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl">{activity.icon}</span>
        <div className="flex-1">
          <h4 className="font-bold">{activity.name}</h4>
          <p className="mt-1 text-xs text-white/60">{activity.description}</p>
          <div className="mt-2 flex flex-wrap gap-1">
            {activity.sdgGoals.map((sdg) => (
              <span
                key={sdg}
                className="flex h-5 w-5 items-center justify-center rounded text-[9px] font-bold"
                style={{ backgroundColor: SDG_GOALS[sdg]?.color }}
                title={SDG_GOALS[sdg]?.name}
              >
                {SDG_GOALS[sdg]?.icon}
              </span>
            ))}
          </div>
        </div>
        <div
          className={cn(
            "flex h-6 w-6 items-center justify-center rounded-full border-2 transition-colors",
            isSelected
              ? "border-[var(--color-volt)] bg-[var(--color-volt)] text-black"
              : "border-white/30"
          )}
        >
          {isSelected && "✓"}
        </div>
      </div>
    </button>
  );
}

function ResultCard({ label, value, suffix = "" }: { label: string; value: number; suffix?: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center">
      <p className="text-2xl font-black text-[var(--color-volt)]">
        {value.toLocaleString()}
        {suffix && <span className="text-lg">{suffix}</span>}
      </p>
      <p className="text-[10px] uppercase tracking-wider text-white/50">{label}</p>
    </div>
  );
}

export default function ImpactCalculator() {
  const [selectedActivities, setSelectedActivities] = useState<SelectedActivity[]>([]);
  const [expandedActivity, setExpandedActivity] = useState<string | null>(null);

  const handleActivityToggle = (activity: Activity) => {
    const existing = selectedActivities.find((a) => a.activity.id === activity.id);
    if (existing) {
      setSelectedActivities(selectedActivities.filter((a) => a.activity.id !== activity.id));
      if (expandedActivity === activity.id) {
        setExpandedActivity(null);
      }
    } else {
      setSelectedActivities([
        ...selectedActivities,
        { activity, hours: 1, peopleReached: 10 },
      ]);
      setExpandedActivity(activity.id);
    }
  };

  const updateActivity = (activityId: string, updates: Partial<SelectedActivity>) => {
    setSelectedActivities(
      selectedActivities.map((item) =>
        item.activity.id === activityId ? { ...item, ...updates } : item
      )
    );
  };

  const calculations = useMemo(() => {
    let totalPoints = 0;
    let totalHours = 0;
    let totalPeople = 0;
    const allSDGs = new Set<string>();

    selectedActivities.forEach((item) => {
      const { activity, hours, peopleReached } = item;
      const points =
        activity.basePoints +
        hours * activity.hourMultiplier +
        Math.round(peopleReached * activity.peopleMultiplier);
      
      totalPoints += points;
      totalHours += hours;
      totalPeople += peopleReached;
      activity.sdgGoals.forEach((sdg) => allSDGs.add(sdg));
    });

    return {
      totalPoints,
      totalHours,
      totalPeople,
      sdgsAddressed: Array.from(allSDGs),
    };
  }, [selectedActivities]);

  return (
    <section className="border-t border-white/10 bg-[#0a0a0a] px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-black uppercase tracking-[0.15em]">
            Impact Calculator
          </h2>
          <p className="mt-4 text-white/60">
            Estimate how much impact you could make as a Sensational League player.
            Select activities and adjust the hours to see your potential contribution.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Activity Selection */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white/50">
              Select Activities
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {ACTIVITIES.map((activity) => {
                const isSelected = selectedActivities.some(
                  (a) => a.activity.id === activity.id
                );
                const selected = selectedActivities.find(
                  (a) => a.activity.id === activity.id
                );

                return (
                  <div key={activity.id} className="space-y-3">
                    <ActivityCard
                      activity={activity}
                      isSelected={isSelected}
                      onSelect={() => handleActivityToggle(activity)}
                    />
                    
                    {/* Expanded Controls */}
                    {isSelected && selected && expandedActivity === activity.id && (
                      <div className="rounded-xl border border-white/10 bg-black/50 p-4 space-y-4">
                        <Slider
                          value={selected.hours}
                          onChange={(hours) => updateActivity(activity.id, { hours })}
                          min={1}
                          max={activity.maxHours || 20}
                          label="Hours"
                          suffix="hrs"
                        />
                        <Slider
                          value={selected.peopleReached}
                          onChange={(peopleReached) =>
                            updateActivity(activity.id, { peopleReached })
                          }
                          min={1}
                          max={activity.maxPeople || 100}
                          label="People Reached"
                          suffix=""
                        />
                        <div className="text-center">
                          <span className="text-sm text-white/50">Activity Points: </span>
                          <span className="text-lg font-bold text-[var(--color-volt)]">
                            {(
                              activity.basePoints +
                              selected.hours * activity.hourMultiplier +
                              Math.round(selected.peopleReached * activity.peopleMultiplier)
                            ).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    {/* Collapsed summary when not expanded but selected */}
                    {isSelected && expandedActivity !== activity.id && (
                      <button
                        type="button"
                        onClick={() => setExpandedActivity(activity.id)}
                        className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-xs text-white/60 hover:border-white/20 hover:text-white/80"
                      >
                        {selected?.hours}h • {selected?.peopleReached.toLocaleString()} people •{" "}
                        <span className="text-[var(--color-volt)]">
                          {(
                            activity.basePoints +
                            (selected?.hours || 0) * activity.hourMultiplier +
                            Math.round((selected?.peopleReached || 0) * activity.peopleMultiplier)
                          ).toLocaleString()} pts
                        </span>
                        {" "}— Click to edit
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="rounded-2xl border border-[var(--color-volt)]/30 bg-black p-6">
              <h3 className="mb-6 text-center text-sm font-bold uppercase tracking-[0.2em] text-[var(--color-volt)]">
                Your Potential Impact
              </h3>

              {selectedActivities.length > 0 ? (
                <>
                  <div className="mb-8 text-center">
                    <p className="text-6xl font-black text-[var(--color-volt)]">
                      {calculations.totalPoints.toLocaleString()}
                    </p>
                    <p className="mt-2 text-sm uppercase tracking-wider text-white/50">
                      Total Impact Points
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <ResultCard
                      label="Hours"
                      value={calculations.totalHours}
                    />
                    <ResultCard
                      label="People"
                      value={calculations.totalPeople}
                    />
                    <ResultCard
                      label="SDGs"
                      value={calculations.sdgsAddressed.length}
                    />
                  </div>

                  {/* SDG Badges */}
                  {calculations.sdgsAddressed.length > 0 && (
                    <div className="mb-6">
                      <p className="mb-3 text-xs uppercase tracking-wider text-white/50">
                        Goals You&apos;ll Support
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {calculations.sdgsAddressed.map((sdg) => (
                          <div
                            key={sdg}
                            className="flex items-center gap-2 rounded-full px-3 py-1"
                            style={{ backgroundColor: `${SDG_GOALS[sdg]?.color}20` }}
                          >
                            <span
                              className="flex h-5 w-5 items-center justify-center rounded text-[9px] font-bold"
                              style={{ backgroundColor: SDG_GOALS[sdg]?.color }}
                            >
                              {SDG_GOALS[sdg]?.icon}
                            </span>
                            <span className="text-xs font-medium text-white/80">
                              {SDG_GOALS[sdg]?.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CTA */}
                  <a
                    href="/player-draft"
                    className={cn(
                      "flex w-full items-center justify-center gap-2 rounded-full border-2 border-[var(--color-volt)] bg-[var(--color-volt)] px-6 py-3",
                      "text-sm font-black uppercase tracking-[0.2em] text-black",
                      "transition-all hover:bg-transparent hover:text-[var(--color-volt)]"
                    )}
                  >
                    Make This Impact Real
                    <span>→</span>
                  </a>
                </>
              ) : (
                <div className="py-12 text-center">
                  <p className="text-4xl mb-4">🎯</p>
                  <p className="text-white/60">
                    Select activities to see your potential impact
                  </p>
                </div>
              )}
            </div>

            {/* Formula explanation */}
            <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs text-white/40">
                <strong className="text-white/60">How points are calculated:</strong>
                <br />
                Base points + (hours × activity multiplier) + (people reached × impact factor)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
