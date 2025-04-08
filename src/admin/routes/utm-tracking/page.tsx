import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import { defineRouteConfig } from "@medusajs/admin-sdk";
import { ChartBar } from "@medusajs/icons"; // Import an icon

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const CustomPage = () => {
  const events = [
    { ref: "test1", date: "2025-04-01", event: "visit" },
    { ref: "test1", date: "2025-04-01", event: "add_to_cart" },
    { ref: "test1", date: "2025-04-01", event: "purchase" },
    { ref: "test1", date: "2025-04-01", event: "purchase" },
    { ref: "test1", date: "2025-04-01", event: "purchase" },

    { ref: "test2", date: "2025-04-01", event: "visit" },
    { ref: "test2", date: "2025-04-01", event: "add_to_cart" },

    { ref: "influencer_ig", date: "2025-04-01", event: "visit" },

    { ref: "newsletter_march", date: "2025-03-30", event: "visit" },
    { ref: "newsletter_march", date: "2025-03-30", event: "add_to_cart" },
    { ref: "newsletter_march", date: "2025-03-30", event: "purchase" },
  ];

  // Step 1: Build event counts per ref per type
  const funnelByRef = events.reduce((acc, curr) => {
    const { ref, event } = curr;
    if (!acc[ref]) {
      acc[ref] = { visit: 0, add_to_cart: 0, purchase: 0 };
    }
    acc[ref][event] += 1;
    return acc;
  }, {});

  const funnelLabels = Object.keys(funnelByRef);
  const visitData = funnelLabels.map((ref) => funnelByRef[ref].visit);
  const cartData = funnelLabels.map((ref) => funnelByRef[ref].add_to_cart);
  const purchaseData = funnelLabels.map((ref) => funnelByRef[ref].purchase);

  const funnelChartData = {
    labels: funnelLabels,
    datasets: [
      {
        label: "Visits",
        data: visitData,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "Add to Cart",
        data: cartData,
        backgroundColor: "rgba(255, 206, 86, 0.6)",
      },
      {
        label: "Purchases",
        data: purchaseData,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  // Optional Step 2: Event counts over time
  const eventsPerDate = events.reduce((acc, curr) => {
    const { date, event } = curr;
    if (!acc[date]) {
      acc[date] = { visit: 0, add_to_cart: 0, purchase: 0 };
    }
    acc[date][event] += 1;
    return acc;
  }, {});

  const dateLabels = Object.keys(eventsPerDate);
  const visitsByDate = dateLabels.map((d) => eventsPerDate[d].visit);
  const cartByDate = dateLabels.map((d) => eventsPerDate[d].add_to_cart);
  const purchaseByDate = dateLabels.map((d) => eventsPerDate[d].purchase);

  const lineChartData = {
    labels: dateLabels,
    datasets: [
      {
        label: "Visits",
        data: visitsByDate,
        borderColor: "rgba(54, 162, 235, 1)",
        tension: 0.4,
      },
      {
        label: "Add to Cart",
        data: cartByDate,
        borderColor: "rgba(255, 206, 86, 1)",
        tension: 0.4,
      },
      {
        label: "Purchases",
        data: purchaseByDate,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="p-6 space-y-10 ">
      <h2 className="text-2xl font-bold uppercase text-center">
        Ref Tracking Dashboard
      </h2>

      <div>
        <h3 className="text-lg mb-10">Funnel Breakdown by Ref</h3>
        <Bar
          data={funnelChartData}
          options={{
            scales: {
              y: {
                ticks: {
                  stepSize: 1,
                  callback: (value) => (Number.isInteger(value) ? value : null),
                },
                beginAtZero: true,
              },
            },
          }}
        />
      </div>

      <div className="mb-40">
        <h3 className="text-lg mb-10">Event Trend by Date</h3>
        <Line
          data={lineChartData}
          options={{
            scales: {
              y: {
                ticks: {
                  stepSize: 1,
                  callback: (value) => (Number.isInteger(value) ? value : null),
                },
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export const config = defineRouteConfig({
  label: "Utm-tracking",
  icon: ChartBar, // icon from @medusajs/icons
});
export default CustomPage;
