import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { Client } from "../types";

const ClientDetailsPage = () => {
  const { clientId } = useParams<{ clientId: string }>();

  const { data: client, loading, error } = useFetch<Client>(`/clients/${clientId}`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-4">Client Details</h2>

      {client ? (
        <div className="space-y-4 flex flex-col items-center">
          <div>
            <img src="/user.svg" alt="Client Avatar" className="w-40 h-40 rounded-full" />
          </div>
          <div className="pb-1">
            {client.firstName} {client.lastName}
          </div>
          <div className="pb-1">
            <strong>National ID:</strong> {client.nationalId}
          </div>
          <div className="pb-1">
            <strong>Age:</strong> {client.age}
          </div>
          <div className="pb-1">
            <strong>Gender:</strong> {client.gender === "male" ? "Male" : "Female"}
          </div>
          <div className="pb-1">
            <strong>Phone Number:</strong> 0{client.phone}
          </div>
        </div>
      ) : (
        <div>No client data available.</div>
      )}
    </div>
  );
};

export default ClientDetailsPage;
