import { useState } from 'react';
import axios from 'axios';

function Review({ setReviews, emp, reviews }) {  // Added 'emp' and 'reviews' as props
    const [departmentName, setDepartmentName] = useState('');
    const [departmentManager, setDepartmentManager] = useState('');
    const [salary, setSalary] = useState(0);
    const [editedSalary, setEditedSalary] = useState(0);
    const [editedDepartmentName, setEditedDepartmentName] = useState('');
    const [editedDepartmentManager, setEditedDepartmentManager] = useState(0);
    const [edit, setEdit] = useState(0);
    const [reviewComments, setReviewComments] = useState(''); // Added for review comments
    const [reviewScore, setReviewScore] = useState(0); // Added for review score
    const [editedReviewComments, setEditedReviewComments] = useState(''); // Added for edited review comments
    const [editedReviewScore, setEditedReviewScore] = useState(0); // Added for edited review score
    const [editReview, setEditReview] = useState(null); // State to track which review is being edited
    const backendUrl = import.meta.env.VITE_RENDER_URL;

    const handleDeleteDepartmentClick = async (id) => {
        const response = await axios.delete(`${backendUrl}/departments/delete/${id}`);

        const fetchDepartments = await axios.get(`${backendUrl}/departments`);
        setDepartments(fetchDepartments.data);
    };

    const handleEditDepartmentClick = async (department) => {
        setEdit(department.id);
        setEditedDepartmentName(department.departmentName);
        setEditedDepartmentManager(department.departmentManager);
    };

    const handleEditDepartmentSubmit = async (event, id) => {
        event.preventDefault();
        const departmentDTO = {
            departmentName: editedDepartmentName,
            departmentManager: editedDepartmentManager
        };

        const response = await axios.put(`${backendUrl}/departments/update/${id}`, departmentDTO);

        setEditedDepartmentName('');
        setEditedDepartmentManager('');
        const fetchDepartments = await axios.get(`${backendUrl}/departments`);

        setEdit(null);
        setDepartments(fetchDepartments.data);
    };

    const handleDepartmentSubmit = async (event) => {
        event.preventDefault();
        const departmentDTO = {
            departmentName,
            departmentManager: Number(departmentManager)
        };

        const response = await axios.post(`${backendUrl}/departments/add`, departmentDTO);

        setDepartmentName('');
        setDepartmentManager(0);
        const fetchDepartments = await axios.get(`${backendUrl}/departments`);

        setDepartments(fetchDepartments.data);
    };

    const handleReviewSubmit = async (event, empId) => {
        event.preventDefault();
        const reviewDTO = {
            employeeId: empId,
            reviewComments,
            reviewScore
        };

        const response = await axios.post(`${backendUrl}/reviews/add`, reviewDTO);

        setReviewComments('');
        setReviewScore(0);
        const fetchReviews = await axios.get(`${backendUrl}/reviews`);
        setReviews(fetchReviews.data);
    };

    const handleReviewDeleteClick = async(id)=>{
        const response = await axios.delete(`${backendUrl}/reviews/delete/${id}`);

        const fetchReviews = await axios.get(`${backendUrl}/reviews`);
        setReviews(fetchReviews.data);
    }

    const handleReviewEditClick = (reviewId) => {
        setEditReview(reviewId);
        const reviewToEdit = reviews.find(review => review.id === reviewId);
        setEditedReviewComments(reviewToEdit.reviewComments);
        setEditedReviewScore(reviewToEdit.reviewScore);
    };

    const handleReviewEditSubmit = async (event, reviewId) => {
        event.preventDefault();
        const editedReviewDTO = {
            reviewComments: editedReviewComments,
            reviewScore: editedReviewScore
        };

        const response = await axios.put(`${backendUrl}/reviews/update/${reviewId}`, editedReviewDTO);

        setEditReview(null);
        const fetchReviews = await axios.get(`${backendUrl}/reviews`);
        setReviews(fetchReviews.data);
    };

    return (
        <div style = {{backgroundColor:'purple'}} className="reviewContainer">
            <h3 style={{color:'white'}}>Add Review</h3>
            <form className="reviewForm" onSubmit={(e) => handleReviewSubmit(e, emp.id)}>
                <label>
                    Add Review Comments:
                    <input type="text" value={reviewComments} onChange={(e) => setReviewComments(e.target.value)} />
                </label>
                <label>
                    Add Review Score:
                    <input type="number" value={reviewScore} onChange={(e) => setReviewScore(e.target.value)} />
                </label>
                <button className="reviewSubmit" type="submit">Submit</button>
            </form>
            <div style={{marginLeft:'-20px',backgroundColor:'yellow'}}>

                {reviews.map((review) => (
                    review.employeeId === emp.id ? (
                        editReview === review.id ? (
                            <form class = "editReviewForm" key={review.id} onSubmit={(e) => handleReviewEditSubmit(e, review.id)}>
                                <label>
                                    Edit Review Comments:
                                    <input type="text" value={editedReviewComments} onChange={(e) => setEditedReviewComments(e.target.value)} />
                                </label>
                                <label>
                                    Edit Review Score:
                                    <input type="number" value={editedReviewScore} onChange={(e) => setEditedReviewScore(e.target.value)} />
                                </label>
                                <button type="submit">Submit Changes</button>
                            </form>
                        ) : (
                            <div style={{backgroundColor:'gold',marginLeft:'20px'}} className="review" key={review.id}>
                                <div>Review Comments: {review.reviewComments}</div>
                                <div>Review Score: {review.reviewScore}</div>
                                <div>Review Date: {review.reviewDate}</div>
                                <button onClick={() => handleReviewEditClick(review.id)}>Edit Review</button>
                                <button onClick={() => handleReviewDeleteClick(review.id)}>Delete Review</button>
                            </div>
                        )
                    ) : null
                ))}
            </div>
        </div>
    );
}

export default Review;
