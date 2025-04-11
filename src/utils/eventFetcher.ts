export const fetchEvents = async () => {
  const res = await fetch("http://localhost:9000/events", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data.events;
};
