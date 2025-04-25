import useFetch from "../hooks/useFetch";
import { Client } from "../types";
import Spinner from "../components/Spinner";

/**
 * Clients Page - Fetches and displays a list of clients.
 */
const Clients = () => {
  const { data: clients, loading, error } = useFetch<Client[]>("http://localhost:5000/api/clients");

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">All Clients</h1>

      {loading && <Spinner />}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {clients?.map((client) => (
          <div
            key={client._id}
            className="border p-4 rounded-xl shadow-sm hover:shadow-md transition-all"
          >
            <h2 className="text-lg font-semibold">{client.firstName} {client.lastName}</h2>
            <p><span className="font-medium">Phone:</span> {client.phone}</p>
            <p><span className="font-medium">National ID:</span> {client.nationalId}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clients;
// This code defines a React component that fetches and displays a list of clients from an API.
// It uses a custom hook `useFetch` to handle the data fetching logic, including loading and error states.