"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dumbbell, Timer } from "lucide-react";
import { cn } from "@/lib/utils";
import { Period } from "@/lib/types";

type DataPoint = { week: string; count: number };

const colorMap = {
  blue: "bg-blue-500 text-white",
  rose: "bg-rose-500 text-white",
};

function StatCard({
  label,
  value,
  subtitle,
  icon,
  color,
}: {
  label: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  color: keyof typeof colorMap;
}) {
  return (
    <Card className={cn("relative overflow-hidden shadow-md", colorMap[color])}>
      <CardContent className="p-8">
        <div className="flex justify-between">
          <p className="text-2xl font-medium opacity-70 uppercase tracking-widest">
            {label}
          </p>
          <div className="opacity-80">{icon}</div>
        </div>
        <div>
          <p className="text-5xl font-semibold tracking-tight">{value}</p>
          <p className="mt-2 text-lg opacity-80">{subtitle}</p>
        </div>
      </CardContent>
      <div className="pointer-events-none absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-white/10" />
      <div className="pointer-events-none absolute -bottom-10 -right-2 h-24 w-24 rounded-full bg-white/5" />
    </Card>
  );
}

type Props = {
  initialVolume: number;
  initialCardioMinutes: number;
  initialChartData: DataPoint[];
  strengthCount: number;
  cardioCount: number;
};

export function DashboardStats({
  initialVolume,
  initialCardioMinutes,
  initialChartData,
  strengthCount,
  cardioCount,
}: Props) {
  const [period, setPeriod] = useState<Period>("1W");
  const [volume, setVolume] = useState(initialVolume);
  const [cardioMinutes, setCardioMinutes] = useState(initialCardioMinutes);
  const [chartData, setChartData] = useState<DataPoint[]>(initialChartData);
  const [loading, setLoading] = useState(false);

  async function handlePeriodChange(val: Period) {
    setPeriod(val);
    setLoading(true);
    const res = await fetch(`/api/dashboard/stats?period=${val}`);
    const json = await res.json();
    setVolume(json.volume);
    setCardioMinutes(json.cardioMinutes);
    setChartData(json.chartData);
    setLoading(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
          Overview
        </h2>
        <Select value={period} onValueChange={handlePeriodChange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1W">1 Week</SelectItem>
            <SelectItem value="2W">2 Weeks</SelectItem>
            <SelectItem value="1M">1 Month</SelectItem>
            <SelectItem value="3M">3 Months</SelectItem>
            <SelectItem value="6M">6 Months</SelectItem>
            <SelectItem value="ALL">All time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div
        className={cn(
          "grid grid-cols-2 gap-4 transition-opacity duration-200",
          loading && "opacity-50",
        )}
      >
        <StatCard
          label="Total Volume"
          value={`${(volume / 1000).toFixed(1)}k kg`}
          subtitle={`${strengthCount} strength exercises`}
          icon={<Dumbbell className="h-25 w-25" />}
          color="blue"
        />
        <StatCard
          label="Cardio Minutes"
          value={`${cardioMinutes} min`}
          subtitle={`${cardioCount} cardio exercises`}
          icon={<Timer className="h-25 w-25" />}
          color="rose"
        />
      </div>

      <Card
        className={cn(
          "transition-opacity duration-200",
          loading && "opacity-50",
        )}
      >
        <CardHeader>
          <CardTitle className="text-base font-medium">
            Workouts per Week
          </CardTitle>
        </CardHeader>
        <CardContent>
          {chartData.length === 0 ? (
            <div className="h-64 flex items-center justify-center text-sm text-muted-foreground">
              No workouts in this period.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={264}>
              <LineChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(0,0,0,0.06)"
                />
                <XAxis
                  dataKey="week"
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#3b82f6" }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
