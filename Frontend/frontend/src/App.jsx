import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    versity: '',
    cgpa: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    
    try {
      const response = await axios.post('http://localhost:4000/insert', formData);
      setMessage(response.data.message);
      setFormData({ name: '', versity: '', cgpa: '' }); // Reset form
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      console.error('Submission error:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Assuming your backend is running on port 5000
        const response = await axios.get("http://localhost:4000/");
        console.log('Response:', response.data); // Log the response
        setData(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error details:', err); // Log the full error
        setError('An error occurred while fetching data: ' + err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  // Check if data is an array before mapping
  if (!Array.isArray(data)) {
    return <div className="text-center">No data available or invalid data format.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Data from Backend</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              {data[0] && Object.keys(data[0]).map(key => (
                <th key={key} className="px-4 py-2 text-center text-xl">{key.toUpperCase()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                {Object.values(row).map((value, i) => (
                  <td key={i} className="border px-4 py-2">{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

      </div>
      <br />
      <form onSubmit={handleSubmit}>
        
        
        <label className="input input-bordered border flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70">
            <path
              d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input type="text"
           name="name" 
           className="grow"
            placeholder="Username" 
            onChange={handleChange}
            value={formData.name}/>
           
        </label>


        <label className="input input-bordered border flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70">
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd" />
          </svg>
          <input type="text"
           name="versity" 
           value={formData.versity}
           className="grow"
            placeholder='Versity'
            onChange={handleChange} />
        </label>

        <label className="input input-bordered border  flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70">
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd" />
          </svg>
          <input type="number"
            step="0.01" 
           name="cgpa"
            className="grow" 
            placeholder='CGPA'
            value={formData.cgpa}
            onChange={handleChange} />
        </label>
        <button className="btn btn-primary border w-24 bg-red-600 text-white">Submit</button>



      </form>
      

    </div>
    
  );
}

export default App;