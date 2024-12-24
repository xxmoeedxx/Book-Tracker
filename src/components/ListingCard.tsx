import React from 'react';
import {Link} from 'react-router-dom'
interface Listing {
  _id: string;
  title: string;
  description: string;
  DueDate: Date
}

const ListingCard: React.FC<{ listing: Listing }> = ({ listing }) => {
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/admin/listings/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          alert("Listing deleted successfully");
          window.location.reload();
          
        } else {
          alert("Failed to delete the listing");
        }
      } catch (error) {
        console.error("Error deleting the listing:", error);
        alert("An error occurred while deleting the listing");
      }
    }
  };
  const handleEdit = async (id: string) => {
    const updates = {
      title: prompt("Enter new title:", listing.title) || listing.title,
      description: prompt("Enter new description:", listing.description) || listing.description,
      DueDate: new Date(prompt("Enter new due date (YYYY-MM-DD):", new Date(listing.DueDate).toLocaleDateString()) || listing.DueDate)
    };
    if (window.confirm("Are you sure you want to edit this listing?")) {
      try {
      const response = await fetch(`http://localhost:5000/api/admin/listings/${id}`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      if (response.ok) {
        alert("Listing edited successfully");
        window.location.reload();
        
      } else {
        alert("Failed to edit the listing");
      }
      } catch (error) {
      console.error("Error editing the listing:", error);
      alert("An error occurred while editing the listing");
      }
    }
  };

  return (
    <>
      <div
      className="border rounded-lg overflow-hidden shadow-md bg-white transition-transform transform hover:scale-105 hover:shadow-lg duration-300 ease-in-out cursor-pointer"
    >
    <Link to={`/listings/${listing._id}`}>
      </Link>
      {/* Card Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold">{listing.title}</h3>
        <p className="text-sm text-gray-600">
          {listing.description}
        </p>
        <p className="font-semibold text-gray-800 mt-2">Due Date: {new Date(listing.DueDate).toLocaleDateString()}</p>
        
        
        <button
          onClick={() => handleEdit(listing._id)}
          className="absolute top-2 right-10 bg-green-500 text-white p-1 rounded"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 15.707a1 1 0 001.414 0L15 6.414 13.586 5 3 15.586V17h1.414l10.586-10.586 1.414 1.414L4.293 15.707z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button
          onClick={() => handleDelete(listing._id)}
          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H3a1 1 0 100 2h14a1 1 0 100-2h-2V3a1 1 0 00-1-1H6zm2 4a1 1 0 011 1v7a1 1 0 11-2 0V7a1 1 0 011-1zm4 0a1 1 0 011 1v7a1 1 0 11-2 0V7a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      
      </div>
    </div>
    
    </>
  );
};

export default ListingCard;
