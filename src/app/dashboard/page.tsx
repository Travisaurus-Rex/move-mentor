export default function DashboardHomePage() {
    return <>

<section className="grid gap-6 grid-cols-1 sm:grid-cols-6 auto-rows-[150px]">
  <article className="bg-blue-500 text-white rounded-xl p-6 sm:col-span-6 sm:row-span-1 flex flex-col justify-center">
    <h2 className="text-2xl font-bold mb-2">Welcome back, User!</h2>
    <p>Here's a summary of your progress this week.</p>
  </article>

  <article className="bg-white rounded-xl p-4 shadow sm:col-span-2 sm:row-span-1">
    <h3 className="font-semibold mb-1">Workouts This Week</h3>
    <p>5 sessions</p>
  </article>

  <article className="bg-white rounded-xl p-4 shadow sm:col-span-2 sm:row-span-1">
    <h3 className="font-semibold mb-1">Calories Burned</h3>
    <p>2,350 kcal</p>
  </article>

  <article className="bg-white rounded-xl p-4 shadow sm:col-span-2 sm:row-span-2 flex flex-col justify-between">
    <h3 className="font-semibold mb-2">Weekly Trend</h3>
    <div className="bg-gray-200 h-full rounded flex items-center justify-center text-gray-500">
      [Chart]
    </div>
  </article>

  <article className="bg-white rounded-xl p-4 shadow sm:col-span-3 sm:row-span-1">
    <h3 className="font-semibold mb-2">Active Goals</h3>
    <ul className="list-disc list-inside text-sm">
      <li>Run 10 km (60% done)</li>
      <li>Protein Intake 150g/day (80% done)</li>
    </ul>
  </article>

  <article className="bg-white rounded-xl p-4 shadow sm:col-span-3 sm:row-span-1">
    <h3 className="font-semibold mb-2">Quick Actions</h3>
    <ul className="flex flex-col gap-2">
      <li><a href="#" className="text-blue-500 font-medium hover:underline">Add Workout</a></li>
      <li><a href="#" className="text-blue-500 font-medium hover:underline">Log Meal</a></li>
      <li><a href="#" className="text-blue-500 font-medium hover:underline">Set Goal</a></li>
    </ul>
  </article>
</section>


    </>
}