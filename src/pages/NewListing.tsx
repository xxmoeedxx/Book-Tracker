import {useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useAuth from '../components/useAuth';

const NewListing = () => {
    const [title, setTitle] = useState('');
    const [description, setdescription] = useState('');
    const [DueDate, setDueDate] = useState<Date | null>(null);
    const [success, setSuccess] = useState(false);
    const {user} = useAuth();
    const userId = user?.id;
    const navigate = useNavigate();

   
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newListing = {
            title,
            description,
            DueDate,
            userId
        };

        try {
            console.log(newListing);
            const response = await fetch('http://localhost:5000/api/admin/listings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newListing),
            });

            if (!response.ok) {
                throw new Error('Failed to create listing');
            }

            setSuccess(true);
            setTimeout(() => navigate('/'), 2000); // Redirect after 2 seconds
        } catch (err: any) {
            console.log(err.message || 'Something went wrong.');
        }
    };



    return (
        <div className="max-w-5xl mx-auto px-6 py-8">
            <BackButton className="mb-4" />
            <h1 className="text-4xl font-bold text-center mb-6 text-blue-800">Create a New Task</h1>
            <form onSubmit={handleSubmit} className="">
                <div className=" gap-6">
                    {/* Title */}
                    <div className="flex items-center mb-4">
                        <label htmlFor="title" className="block w-1/6 text-sm font-medium text-gray-700">
                            Name:
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-3/4 mt-1 border border-gray-300 rounded-md shadow-sm p-2"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="flex items-center mb-4">
                        <label htmlFor="description" className="block w-1/6 text-sm font-medium text-gray-700">
                            Description:
                        </label>
                        <input
                            type="text"
                            id="description"
                            value={description}
                            onChange={(e) => setdescription(e.target.value)}
                            className="w-3/4 mt-1 border border-gray-300 rounded-md shadow-sm p-2"
                            required
                        />
                    </div>

                    {/* Due Date */}
                    <div className="flex items-center mb-4">
                        <label htmlFor="DueDate" className="block w-1/6 text-sm font-medium text-gray-700">
                            Due Date:
                        </label>
                        <DatePicker
                            id="DueDate"
                            selected={DueDate}
                            onChange={(date) => setDueDate(date)}
                            placeholderText="Add date"
                            className="w-3/4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                            dateFormat="MMM d, yyyy"
                            required
                        />
                    </div>
                    
                </div>
                    {/* Submit Button */}
                    <div className="py-6">
                        <button
                            type="submit"
                            className="w-full bg-blue-800 text-white py-3 rounded-lg hover:bg-blue-900 font-bold"
                        >
                            Create Listing
                        </button>
                    </div>
                    {/* Success/Error Messages */}
                    {success && <p className="text-green-500 mt-4">Listing created successfully! Redirecting...</p>}
            </form>
        </div>
    );
};

export default NewListing;
