import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { Client, Program } from "../types";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import Spinner from "../components/Spinner";

const ClientDetailsPage = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const [programs, setPrograms] = useState<Program[]>([]);
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPrograms, setFilteredPrograms] = useState<Program[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);


  const { data: client, loading, error } = useFetch<Client>(`http://localhost:5000/api/clients/${clientId}`);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    const response = await axios.get("/programs");
    if (response) {
      setPrograms(response.data);
    }
  }
  /***
   * @desc Handles change of chech box, when its checked or unchecked
   */
  const handleCheckboxChange = (programId: string) => {
    setSelectedPrograms((prev) => prev.includes(programId) ? prev.filter((id) => id !== programId) : [...prev, programId]);
  };

  /***
   * @desc Hndles logic to enroll a client to the selected program(s)
   */
  const handleEnroll = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientId) return;

    try {
      const response = await axios.post(`/clients/${clientId}/enroll`, { programIds: selectedPrograms });
      // check if the request is successfull
      if (response.status === 200) {
        setMessage("Client enrolled successfully");
        await axios.get(`/clients/${clientId}`);
        setSelectedPrograms([]);
      } else {
        setMessage("Enrollment failed");
      }
    } catch (err) {
      console.error("Error enrolling client:", err);
      setMessage("Enrollment failed");
    }
  }

  // get program ids of already enrolled programs
  const enrolledProgramIds = client?.enrolledPrograms.map(p => p._id);

  // program ids for programs not yet enrolled
  const availablePrograms = programs.filter(program => !enrolledProgramIds?.includes(program._id))

  if (loading) return <Spinner />;
  if (error) return <div>{error}</div>;

  /**
 * @desc logic to get search items (programs) from api
 */
  const handleSearch = () => {
    setSearchLoading(true);
    if (searchQuery === "") {
      setFilteredPrograms([]);
    } else {
      const filtered = programs?.filter((program) =>
        program.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        program.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPrograms(filtered || []);
    }

    try {
      axios.get(`/programs?search=${searchQuery}`)
    } catch (error) {
      console.error("Error fetching clients:", error);
      setFilteredPrograms([]);
    } finally {
      setSearchLoading(false);
    }
  };

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

          <div className="flex flex-col items-center">
            <h1 className="text-xl text-gray-700 font-semibold">Enrolled Programs</h1>
            {client.enrolledPrograms.length > 0 ? (<div>
              <div className="flex items-center">
                {client.enrolledPrograms.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {client.enrolledPrograms?.map((program: Program) => (
                      <div
                        key={program._id}
                        className="flex justify-between p-4 rounded-xl shadow-sm hover:shadow-md transition-all"
                      >
                        <div>
                          <h2 className="text-lg font-semibold">{program.name}</h2>
                          <p>{program.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>) : (
              <p>Client is not enrolled to any programs.</p>
            )}
          </div>
        </div>
      ) : (
        <p>No client data available.</p>
      )}

      {/* Show other available programs a client is not enrolled in */}
      <div className="mt-4">
        <h1 className="text-xl text-gray-700 font-semibold">Available Programs</h1>

        {/* search for programs */}
        <div className="my-2">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search by name or description"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value === "") {
                  setFilteredPrograms([]);
                } else {
                  // display the programs that match the search query as you search
                  const filtered = programs?.filter((program) =>
                    program.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
                    program.name.toLowerCase().includes(e.target.value.toLowerCase())
                  );
                  setFilteredPrograms(filtered || []);
                }
              }}
              className="border p-2 rounded-lg w-full"
            />
            <button onClick={handleSearch} type="button" className="bg-gray-700 border-0 outline-0 text-white rounded p-2">Search</button>
          </div>

          {/* display clienys from the search */}
          {filteredPrograms.length > 0 && (
            <form onSubmit={handleEnroll} className="flex flex-col gap-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {filteredPrograms.map(program => (
                  <label key={program._id} className="flex justify-between p-4 rounded-xl shadow-sm hover:shadow-md transition-all gap-3">
                    <input type="checkbox" className="w-4" checked={selectedPrograms.includes(program._id)} onChange={() => handleCheckboxChange(program._id)} />
                    <div>
                      <p className="font-semibold">{program.name}</p>
                      <p className="text-gray-700">{program.description}</p>
                    </div>
                  </label>
                ))}
              </div>

              <button type="submit" className="bg-gray-700 text-white px-4 py-2 rounded">Enroll Selected Programs</button>

              {message && <p className="mt-3 text-sm text-gray-700">{message}</p>}
            </form>
          )}

          {searchLoading && <Spinner />}
        </div>

        {availablePrograms.length > 0 ? (
          <form onSubmit={handleEnroll} className="flex flex-col gap-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {availablePrograms.map(program => (
                <label key={program._id} className="flex justify-between p-4 rounded-xl shadow-sm hover:shadow-md transition-all gap-3">
                  <input type="checkbox" className="w-4" checked={selectedPrograms.includes(program._id)} onChange={() => handleCheckboxChange(program._id)} />
                  <div>
                    <p className="font-semibold">{program.name}</p>
                    <p className="text-gray-700">{program.description}</p>
                  </div>
                </label>
              ))}
            </div>

            <button type="submit" className="bg-gray-700 text-white px-4 py-2 rounded">Enroll Selected Programs</button>

            {message && <p className="mt-3 text-sm text-gray-700">{message}</p>}
          </form>
        ) : (
          <p>No programs available to enroll.</p>
        )}
      </div>
    </div>
  );
};

export default ClientDetailsPage;
