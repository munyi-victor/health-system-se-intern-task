import { useEffect, useState } from "react"
import axios from "../api/axios"
import { Program } from "../types"
import CreateProgramModal from "../components/CreateProgramModal";
import Spinner from "../components/Spinner";

const ProgramsPage = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {loading && <Spinner />}

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <h1 className="text-2xl font-bold">All Programs</h1>
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