import useFetch from "../hooks/useFetch";
import { Client } from "../types";
import Spinner from "../components/Spinner";
import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import RegisterClientModal from "../components/RegisterClientModal";

/**
 * Clients Page - Fetches and displays a list of clients.
 */
const Clients = () => {
  const navigate = useNavigate();
  const { data: clients, loading, error } = useFetch<Client[]>("http://localhost:5000/api/clients");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };
  const openModal = () => {
    setShowModal(true);
  };

  const handleSearch = () => {
    setIsLoading(true);
    if (searchQuery === "") {
      setFilteredClients([]);
    } else {
      const filtered = clients?.filter((client) =>
        client.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.nationalId.includes(searchQuery)
      );
      setFilteredClients(filtered || []);
    }

    try {
      axios.get(`/clients?search=${searchQuery}`)
    } catch (error) {
      console.error("Error fetching clients:", error);
      setFilteredClients([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div>
        <button
          onClick={openModal}
          type="button"
          className="bg-gray-700 text-white rounded py-2 px-4 mb-4"
        >
          Register New Client
        </button>
        {showModal && <RegisterClientModal closeModal={closeModal} />}
      </div>

      <div className="mb-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search by client name"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (e.target.value === "") {
                setFilteredClients([]);
              } else {
                // display the clients that match the search query as you search
                const filtered = clients?.filter((client) =>
                  client.firstName.toLowerCase().includes(e.target.value.toLowerCase()) ||
                  client.lastName.toLowerCase().includes(e.target.value.toLowerCase()) ||
                  client.nationalId.includes(e.target.value)
                );
                setFilteredClients(filtered || []);
              }
            }}
            className="border p-2 rounded-lg w-full"
          />
          <button onClick={handleSearch} type="button" className="bg-gray-700 border-0 outline-0 text-white rounded p-2">Search</button>
        </div>

        {/* display clienys from the search */}
        {filteredClients.length > 0 && (
          <div className="mt-4">
            <h2 className="text-lg font-bold">Search Results:</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredClients.map((client) => (
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
        )}
      </div>
      {isLoading && <Spinner />}

      {/* display all the registered clients */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <h1 className="text-2xl font-bold mb-4">All Clients</h1>
        {loading && <Spinner />}
        {error && <p className="text-red-500">{error}</p>}
        {clients?.map((client) => (
          <div
            key={client._id}
            className="flex justify-between p-4 rounded-xl shadow-sm hover:shadow-md transition-all"
          >
            <div>
              <h2 className="text-lg font-semibold">{client.firstName} {client.lastName}</h2>
              <p><span className="font-medium">Phone:</span> {client.phone}</p>
              <p><span className="font-medium">National ID:</span> {client.nationalId}</p>
            </div>
            <div>
              <button
                onClick={() => navigate(`/clients/${client._id}`)}
                type="button"
                className="bg-gray-700 border-0 outline-0 text-white rounded py-2 px-4"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clients;
// This code defines a React component that fetches and displays a list of clients from an API.
// It uses a custom hook `useFetch` to handle the data fetching logic, including loading and error states.