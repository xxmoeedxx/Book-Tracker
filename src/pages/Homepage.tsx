import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ListingCard from '../components/ListingCard';
import Footer from '../components/Footer';
import useAuth from '../components/useAuth';

const Homepage = () => {
  const [Tasks, setTasks] = useState([{ _id: "_", title: '', description: '', DueDate: new Date() }]); // Initialize with an empty array
  const { user } = useAuth();
  const [UserId,setUserId] = useState(user?.id);
  useEffect(() => {
    // Fetch listings from backend
    const fetchTasks = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/listings/user/${UserId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch listings');
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };
    if(UserId){
      fetchTasks();
    }
  }, [UserId]);
  useEffect(() => {
    setUserId(user?.id);
  }, [user]);

  return (
    <>
    <div>
      <Navbar />
      <div className="p-4">
      {Tasks.length > 1 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
          {Tasks.map((listing) => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No Tasks found</p>
      )}
      </div>
      
    </div>
    <Footer />
    </>
  );
};

export default Homepage;
