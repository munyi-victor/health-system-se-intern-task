import { useState, useEffect } from "react";
import axios from "../api/axios";
import useFetch from "../hooks/useFetch";

interface ModalProps {
  closeModal: () => void;
}

const RegisterClientModal = ({ closeModal }: ModalProps) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    nationalId: '',
    age: '',
    gender: '',
    phone: '',
  });

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

  const handleRegisterClient = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('/clients/register', formData);

      // check if the response is successful
      if (response.status !== 201) {
        throw new Error('Failed to register client');
      }
      useFetch("http://localhost:5000/api/clients");
      console.log('Client registered:', response.data);
      closeModal();
    } catch (error) {
      console.error('Error registering client:', error);
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
            <form onSubmit={handleRegisterClient} className="w-full">
              <h2 className="text-xl text-gray-700 font-semibold mb-4">Register Client</h2>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="border p-2 mb-3 rounded w-full"
                required
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="border p-2 mb-3 rounded w-full"
                required
              />
              <input
                type="number"
                name="nationalId"
                value={formData.nationalId}
                onChange={handleChange}
                placeholder="National ID"
                className="border p-2 mb-3 rounded w-full"
                required
              />
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Age"
                className="border p-2 mb-3 rounded w-full"
                required
              />
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="border p-2 mb-3 rounded w-full"
              >
                <option value="" disabled>Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>

              <input
                type="number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="border p-2 mb-3 rounded w-full"
                required
              />
              <input
                type="submit"
                value="Register"
                className="bg-gray-700 text-white px-4 py-2 rounded w-full cursor-pointer"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterClientModal;
