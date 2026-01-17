import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Heatmap, type HeatmapData } from "@/components/ui/heatmap";
import { useMemo } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  LineChart,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  RadialBarChart,
  RadialBar,
} from "recharts";

export default function Page() {
  const weeklyWorkouts = [
    { day: "Mon", workouts: 2, calories: 450 },
    { day: "Tue", workouts: 1, calories: 280 },
    { day: "Wed", workouts: 3, calories: 620 },
    { day: "Thu", workouts: 2, calories: 480 },
    { day: "Fri", workouts: 1, calories: 320 },
    { day: "Sat", workouts: 4, calories: 780 },
    { day: "Sun", workouts: 2, calories: 400 },
  ];

  const monthlyProgress = [
    { week: "Week 1", strength: 65, cardio: 40, flexibility: 30 },
    { week: "Week 2", strength: 70, cardio: 45, flexibility: 35 },
    { week: "Week 3", strength: 68, cardio: 52, flexibility: 40 },
    { week: "Week 4", strength: 75, cardio: 58, flexibility: 45 },
  ];

  const muscleGroupData = [
    { name: "Chest", value: 25, fill: "var(--color-chart-1)" },
    { name: "Back", value: 22, fill: "var(--color-chart-2)" },
    { name: "Legs", value: 28, fill: "var(--color-chart-3)" },
    { name: "Arms", value: 15, fill: "var(--color-chart-4)" },
    { name: "Core", value: 10, fill: "var(--color-chart-5)" },
  ];

  const weightProgress = [
    { month: "Jan", weight: 185 },
    { month: "Feb", weight: 182 },
    { month: "Mar", weight: 180 },
    { month: "Apr", weight: 178 },
    { month: "May", weight: 175 },
    { month: "Jun", weight: 173 },
  ];

  const goalProgress = [{ name: "Workouts", value: 75, fill: "hsl(142 76% 36%)" }];

  const PRData = [
    { exercise: "Bench", current: 225, previous: 205 },
    { exercise: "Squat", current: 315, previous: 285 },
    { exercise: "Deadlift", current: 365, previous: 335 },
    { exercise: "OHP", current: 145, previous: 135 },
  ];

  function generateRandomHeatmapData(
    startDate: Date,
    endDate: Date,
    minValue: number = 0,
    maxValue: number = 30,
  ): HeatmapData {
    const data: HeatmapData = [];
    const current = new Date(startDate);
    while (current <= endDate) {
      const dateString = current.toISOString().slice(0, 10);
      const value = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
      data.push({ date: dateString, value });
      current.setDate(current.getDate() + 1);
    }
    return data;
  }

  const data = useMemo(() => generateRandomHeatmapData(new Date("2025-01-01"), new Date("2025-12-30"), 0, 30), []);

  return (
    <div>
      {/* <div className="flex items-center gap-4">
        <Separator orientation="vertical" className="h-6" />
      </div> */}

      <Card className="m-6 p-2">
        <CardContent>
          <Heatmap
            data={data}
            startDate={new Date("2025-01-01")}
            endDate={new Date("2025-12-30")}
            colorMode="interpolate"
            daysOfTheWeek="all"
            cellSize={18}
            gap={5}
            displayStyle="squares"
            dateDisplayFunction={(date) => (
              <span className="font-semibold">
                {date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            )}
          />
        </CardContent>
      </Card>
      <div className="flex-1 p-6 space-y-6 overflow-auto">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Weekly Workouts Chart */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Weekly Workouts</CardTitle>
              <CardDescription>Sessions per day this week</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  workouts: { label: "Workouts", color: "var(--color-chart-1)" },
                }}
                className="h-[200px] w-full"
              >
                <BarChart data={weeklyWorkouts}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Bar dataKey="workouts" fill="var(--color-chart-1)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Calories Burned Chart */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Calories Burned</CardTitle>
              <CardDescription>Daily calorie expenditure</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  calories: { label: "Calories", color: "var(--color-chart-2)" },
                }}
                className="h-[200px] w-full"
              >
                <AreaChart data={weeklyWorkouts}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Area
                    type="monotone"
                    dataKey="calories"
                    fill="var(--color-chart-2)"
                    fillOpacity={0.3}
                    stroke="var(--color-chart-2)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Goal Progress */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Monthly Goal</CardTitle>
              <CardDescription>15 of 20 workouts completed</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <ChartContainer
                config={{
                  value: { label: "Progress", color: "var(--color-chart-3)" },
                }}
                className="h-[200px] w-full"
              >
                <RadialBarChart innerRadius="60%" outerRadius="90%" data={goalProgress} startAngle={90} endAngle={-270}>
                  <RadialBar background dataKey="value" cornerRadius={10} fill="var(--color-chart-3)" />
                </RadialBarChart>
              </ChartContainer>
              <div className="absolute text-center">
                <p className="text-3xl font-bold">75%</p>
                <p className="text-xs text-muted-foreground">Complete</p>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Progress */}
          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Monthly Progress</CardTitle>
              <CardDescription>Strength, cardio, and flexibility trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  strength: { label: "Strength", color: "var(--color-chart-1)" },
                  cardio: { label: "Cardio", color: "var(--color-chart-2)" },
                  flexibility: { label: "Flexibility", color: "var(--color-chart-4)" },
                }}
                className="h-[200px] w-full"
              >
                <LineChart data={monthlyProgress}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="week" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Line type="monotone" dataKey="strength" stroke="var(--color-chart-1)" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="cardio" stroke="var(--color-chart-2)" strokeWidth={2} dot={false} />
                  <Line
                    type="monotone"
                    dataKey="flexibility"
                    stroke="var(--color-chart-4)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Muscle Groups */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Muscle Groups</CardTitle>
              <CardDescription>Training distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  chest: { label: "Chest", color: "var(--color-chart-1)" },
                  back: { label: "Back", color: "var(--color-chart-2)" },
                  legs: { label: "Legs", color: "var(--color-chart-3)" },
                  arms: { label: "Arms", color: "var(--color-chart-4)" },
                  core: { label: "Core", color: "var(--color-chart-5)" },
                }}
                className="h-[200px] w-full"
              >
                <PieChart>
                  <Pie
                    data={muscleGroupData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                  >
                    {muscleGroupData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Weight Progress */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Weight Progress</CardTitle>
              <CardDescription>6-month weight trend (lbs)</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  weight: { label: "Weight", color: "var(--color-chart-3)" },
                }}
                className="h-[200px] w-full"
              >
                <AreaChart data={weightProgress}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} />
                  <YAxis domain={[170, 190]} tickLine={false} axisLine={false} />
                  <Area
                    type="monotone"
                    dataKey="weight"
                    fill="var(--color-chart-3)"
                    fillOpacity={0.3}
                    stroke="var(--color-chart-3)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Personal Records */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Personal Records</CardTitle>
              <CardDescription>Current vs previous PRs (lbs)</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  current: { label: "Current", color: "var(--color-chart-1)" },
                  previous: { label: "Previous", color: "var(--color-chart-5)" },
                }}
                className="h-[200px] w-full"
              >
                <BarChart data={PRData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" tickLine={false} axisLine={false} />
                  <YAxis dataKey="exercise" type="category" tickLine={false} axisLine={false} width={60} />
                  <Bar dataKey="previous" fill="var(--color-chart-5)" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="current" fill="var(--color-chart-1)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
