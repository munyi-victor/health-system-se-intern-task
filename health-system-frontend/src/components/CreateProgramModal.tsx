import { useState, useEffect } from "react";
import axios from "../api/axios";

interface ModalProps {
  closeModal: () => void;
}

const CreateProgramModal = ({ closeModal }: ModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);

  /**
   * @desc Handles the change of input fields
   * @param e - The event object
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  /**
   * @desc Handles the create program logic
   */
  const handleCreateProgram = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await axios.post('/programs', formData);

      // check if the response is successful
      if (response.status !== 201) {
        throw new Error('Failed to register client');
      }
      axios.get("http://localhost:5000/api/programs");
      console.log('Program created:', response.data);
      closeModal();
    } catch (error) {
      console.error('Error registering client:', error);
    } finally {
      setLoading(false);
    }
  }

  // Focus management: Automatically focus on the first input field when the modal is opened
  useEffect(() => {
    const firstInput = document.querySelector('input');
    if (firstInput) {
      firstInput.focus();
    }
  }, []);

  return (
    <>
      <div
        className="fixed inset-0 z-50 overflow-y-auto bg-gray-900 bg-opacity-75 flex items-center justify-center px-4"
        role="dialog"
        aria-labelledby="modal-title"
      >
        <div className="relative w-full max-w-2xl md:max-w-xl mx-auto shadow rounded-xl bg-white p-4 pt-0 h-fit">
          <span
            onClick={closeModal}
            className="flex justify-end text-4xl cursor-pointer font-light hover:font-bold"
          >
            &times;
          </span>

          <div className="flex flex-col gap-2 w-full justify-center items-center">
            <form onSubmit={handleCreateProgram} className="w-full">
              <h2 className="text-xl text-gray-700 font-semibold mb-4">Create Program</h2>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Program name"
                className="border p-2 mb-3 rounded w-full"
                required
              />
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="border p-2 mb-3 rounded w-full"
                required
              />
              <input
                type="submit"
                value={loading ? "Loading..." : "Create Program"}
                className="bg-gray-700 text-white px-4 py-2 rounded w-full cursor-pointer"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProgramModal;
