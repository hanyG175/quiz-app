import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../components/Loader.tsx'; // Assuming you already have a Loader component

export default function Home() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    grade: '',
    category: '',
    subcategory: '',
    email: '',
  });
  const [emailError, setEmailError] = useState('');
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  useEffect(() => {
    if (formData.category === 'Science') {
      setSubcategories(['Physics', 'Maths', 'Natural Science']);
    } else if (formData.category === 'Languages') {
      setSubcategories(['Arabic', 'French', 'English']);
    } else {
      setSubcategories([]);
    }
    setFormData((prev) => ({ ...prev, subcategory: '' }));
  }, [formData.category]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'email') {
      setEmailError(validateEmail(value) ? '' : 'Invalid email format');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.name &&
      formData.grade &&
      formData.category &&
      validateEmail(formData.email) &&
      (formData.category === 'History/Geography' || formData.subcategory)
    ) {
      setIsLoading(true); // Show the loader

      try {
        const registerResponse = await fetch('http://localhost:3000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (registerResponse.ok) {
          const registerData = await registerResponse.json();
          toast.success(registerData.message || 'Registered successfully!');

          // Log in the user
          const loginResponse = await fetch('https://quiz-app-server.onrender.com/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: formData.name, email: formData.email }),
          });

          if (loginResponse.ok) {
            const loginData = await loginResponse.json();

            // Store in localStorage
            localStorage.setItem('token', loginData.token);
            localStorage.setItem('hasTakenQuiz', 'false');
            localStorage.setItem('category', formData.category);
            localStorage.setItem('subcategory', formData.subcategory);

            // Navigate to the quiz intro page
            setTimeout(() => {
              setIsLoading(false); // Hide the loader
              navigate(`/quiz-intro?category=${formData.category}&subcategory=${formData.subcategory}`);
            }, 2000); // Add a delay for the loader
            
          } else {
            const loginErrorData = await loginResponse.json();
            setIsLoading(false); // Hide the loader
            toast.error(loginErrorData.error || 'Failed to log in user.');
          }
        } else {
          const registerErrorData = await registerResponse.json();
          setIsLoading(false); // Hide the loader
          toast.error(registerErrorData.error || 'Failed to register user.');
        }
      } catch (error) {
        console.error('Error during registration or login:', error);
        setIsLoading(false); // Hide the loader
        toast.error('An unexpected error occurred. Please try again.');
      }
    } else {
      toast.error('Please fill in all fields correctly.');
    }
  };

  return (
    <main 
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat p-6"
      rel="preload"
      style={{ backgroundImage: "url('/images/bg9.webp')" }}
    >
      <ToastContainer />

      {isLoading ? (
        <Loader /> // Show loader when loading
      ) : (
        <div className="bg-white bg-opacity-100 p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-6">Competition Signup</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter your email"
                required
              />
              {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="grade" className="block text-lg font-medium text-gray-700 mb-1">Year</label>
              <select
                id="grade"
                name="grade"
                value={formData.grade}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                required
              >
                <option value="">Select Grade</option>
                {[1, 2, 3, 4, 5].map((grade) => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="category" className="block text-lg font-medium text-gray-700 mb-1">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                required
              >
                <option value="">Select Category</option>
                <option value="Science">Science</option>
                <option value="Languages">Languages</option>
                <option value="History/Geography">History/Geography</option>
              </select>
            </div>
            {subcategories.length > 0 && (
              <div className="mb-6">
                <label htmlFor="subcategory" className="block text-lg font-medium text-gray-700 mb-1">Subcategory</label>
                <select
                  id="subcategory"
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  required
                >
                  <option value="">Select Subcategory</option>
                  {subcategories.map((subcategory) => (
                    <option key={subcategory} value={subcategory}>
                      {subcategory}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <button
              type="submit"
              className="w-full p-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600"
            >
              Start Test
            </button>
          </form>
        </div>
      )}
    </main>
  );
}
