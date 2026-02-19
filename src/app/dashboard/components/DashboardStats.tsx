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
import { cn } from "@/lib/utils/cn";
import { Period } from "@/lib/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

type DataPoint = { week: string; count: number };

const colorMap = {
  blue: "bg-blue-500 text-white",
  rose: "bg-rose-500 text-white",
  emerald: "bg-emerald-500 text-white",
  purple: "bg-purple-500 text-white",
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
          <p className="text-lg sm:text-2xl font-medium opacity-70 uppercase tracking-widest">
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
  totalUserWorkouts: number;
};

export function DashboardStats({
  initialVolume,
  initialCardioMinutes,
  initialChartData,
  strengthCount,
  cardioCount,
  totalUserWorkouts,
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

      <div className="relative rounded-xl overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/15 to-transparent" />
        <Carousel
          className={cn(
            "transition-opacity duration-200",
            loading && "opacity-50",
          )}
        >
          <CarouselContent>
            <CarouselItem className="basis-4/5 md:basis-[45%] lg:basis-[40%] select-none">
              <StatCard
                label="Total Volume"
                value={`${(volume / 1000).toFixed(1)}k kg`}
                subtitle={`${strengthCount} strength exercises`}
                icon={<Dumbbell className="h-15 w-15" />}
                color="blue"
              />
            </CarouselItem>
            <CarouselItem className="basis-4/5 md:basis-[45%] lg:basis-[40%] select-none">
              <StatCard
                label="Cardio Minutes"
                value={`${cardioMinutes} min`}
                subtitle={`${cardioCount} cardio exercises`}
                icon={<Timer className="h-15 w-15" />}
                color="rose"
              />
            </CarouselItem>
            <CarouselItem className="basis-4/5 md:basis-[45%] lg:basis-[40%] select-none">
              <StatCard
                label="Total Workouts"
                value={totalUserWorkouts.toString() || ""}
                subtitle={`workouts completed`}
                icon={<Timer className="h-15 w-15" />}
                color="emerald"
              />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/15 to-transparent" />
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
