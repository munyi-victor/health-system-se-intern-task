import { useEffect, useState } from "react"
import axios from "../api/axios"
import { Program } from "../types"
import CreateProgramModal from "../components/CreateProgramModal";
import Spinner from "../components/Spinner";

const ProgramsPage = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPrograms, setFilteredPrograms] = useState<Program[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };
  const openModal = () => {
    setShowModal(true);
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  /**
   * @desc logic to get the programs from the api
   */
  const fetchPrograms = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/programs");
      if (response) {
        setPrograms(response.data);
      }
    } catch (error) {
      console.error("Error fetching programs:", error);
    } finally {
      setLoading(false);
    }
  }

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
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div>
        <button
          onClick={openModal}
          type="button"
          className="bg-gray-700 text-white rounded py-2 px-4 mb-4"
        >
          Create a new Program
        </button>
        {showModal && <CreateProgramModal closeModal={closeModal} />}
      </div>

      <div className="mb-4">
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
          <div className="mt-4">
            <h2 className="text-lg font-bold">Search Results:</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPrograms.map((program) => (
                <div
                  key={program._id}
                  className="border p-4 rounded-xl shadow-sm hover:shadow-md transition-all"
                >
                  <h2 className="text-lg font-semibold">{program.name}</h2>
                  <p>{program.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {searchLoading && <Spinner />}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <h1 className="text-2xl font-bold">All Programs</h1>
        {loading && <Spinner />}
        {programs?.map((program) => (
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
    </div>
  )
}

export default ProgramsPage