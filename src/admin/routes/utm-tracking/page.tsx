import { useEffect, useState } from "react";
import { defineRouteConfig } from "@medusajs/admin-sdk";
import { ChartBar } from "@medusajs/icons";
import { fetchEvents } from "../../../utils/eventFetcher";

export const config = defineRouteConfig({
  label: "UTM Events",
  icon: ChartBar,
});
type UTMEvent = {
  date: string;
  event: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
};
const skeletonRows = Array.from({ length: 8 });

const CustomPage = () => {
  const [events, setEvents] = useState<UTMEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents()
      .then((data: UTMEvent[]) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err: any) => {
        console.error("Failed to fetch events:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 space-y-10">
      <h2 className="text-2xl font-bold uppercase text-center">
        UTM Event Table
      </h2>

      <div className="overflow-auto border border-gray-200 rounded-lg shadow-sm">
        <table className="w-full text-sm text-left text-white bg-black border-collapse">
          <thead className="bg-gray-800 border-b border-gray-700">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Event</th>
              <th className="px-4 py-3">UTM Source</th>
              <th className="px-4 py-3">UTM Medium</th>
              <th className="px-4 py-3">UTM Campaign</th>
              <th className="px-4 py-3">UTM Term</th>
              <th className="px-4 py-3">UTM Content</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {loading ? (
              skeletonRows.map((_, index) => (
                <tr key={index} className="animate-pulse">
                  {Array(7)
                    .fill(null)
                    .map((_, cellIdx) => (
                      <td key={cellIdx} className="px-4 py-2">
                        <div className="h-4 bg-gray-700 rounded w-4/5" />
                      </td>
                    ))}
                </tr>
              ))
            ) : events.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-4 text-center text-gray-400">
                  No events found.
                </td>
              </tr>
            ) : (
              events.map((event, index) => (
                <tr key={index} className="hover:bg-gray-900">
                  <td className="px-4 py-2">
                    {new Date(event.date).toLocaleString()}
                  </td>
                  <td className="px-4 py-2">{event.event}</td>
                  <td className="px-4 py-2">{event.utm_source || "-"}</td>
                  <td className="px-4 py-2">{event.utm_medium || "-"}</td>
                  <td className="px-4 py-2">{event.utm_campaign || "-"}</td>
                  <td className="px-4 py-2">{event.utm_term || "-"}</td>
                  <td className="px-4 py-2">{event.utm_content || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomPage;
