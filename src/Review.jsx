import { useState } from 'react';
import axios from 'axios';

function Review({ setReviews, emp, reviews,review,setReview,editReview,setEditReview,setEditReviewEmpId,editReviewEmpId}) {  // Added 'emp' and 'reviews' as props
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
    const [reviewStatus,setReviewStatus] = useState("")
    const [editReviewStatus,setEditReviewStatus] = useState("")
    const backendUrl = import.meta.env.VITE_RENDER_URL;
    // const backendUrl = 'http://localhost:8080';
    console.log('review',review,review === emp.id);
    console.log('editReview',editReview,typeof Number(editReview) === 'number',editReview !== null);

    const cancelAddReview = () => {
        setReview([]);
    }

    const cancelEditReview= () => {
        setEditReviewEmpId('');
    }

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

        try{
            const response = await axios.post(`${backendUrl}/reviews/add`, reviewDTO);

            setReviewStatus("success");


            setTimeout(async ()=>{
                setReviewComments('');
                setReviewScore(0);
                const fetchReviews = await axios.get(`${backendUrl}/reviews`);
                console.log("fetchReviews",fetchReviews.data);
                setReviews(fetchReviews.data);
                setReview([]);
                setReviewStatus("");

            },1500);

        }catch(error){
            setReviewStatus("error");
        }

    };

    // const handleReviewDeleteClick = async(id)=>{
    //     const response = await axios.delete(`${backendUrl}/reviews/delete/${id}`);

    //     const fetchReviews = await axios.get(`${backendUrl}/reviews`);
    //     setReviews(fetchReviews.data);
    // }

    // const handleReviewEditClick = (reviewId) => {
    //     setEditReview(reviewId);
    //     const reviewToEdit = reviews.find(review => review.id === reviewId);
    //     setEditedReviewComments(reviewToEdit.reviewComments);
    //     setEditedReviewScore(reviewToEdit.reviewScore);
    // };

    const handleReviewEditSubmit = async (event, reviewId) => {
        event.preventDefault();
        const editedReviewDTO = {
            reviewComments: editedReviewComments,
            reviewScore: editedReviewScore
        };

        try{
            const response = await axios.put(`${backendUrl}/reviews/update/${reviewId}`, editedReviewDTO);
            setEditReviewStatus("success")
            setTimeout(async ()=>{
                setEditReview(null);
                setEditReviewEmpId('');
                const fetchReviews = await axios.get(`${backendUrl}/reviews`);
                setReviews(fetchReviews.data);
                setEditReviewStatus("")
            },1500);
        }catch(error){
            setEditReviewStatus("error")
        }




    };

    return (
        <>

            {
    review === emp.id?(


        <div style = {{}} className="reviewContainer">

            <form className="reviewForm" onSubmit={(e) => handleReviewSubmit(e, emp.id)}>
            <label className="addReviewLabel">Add Review</label>


    <label style={{marginTop:'30px'}}>
        Comments
        <input type="text" value={reviewComments} onChange={(e) => setReviewComments(e.target.value)} />
    </label>
    <label>
        <div className="scoreDiv">Score</div>
        <div className="enterDiv">(Please type a number from 1 through 5)</div>

        <input type="number" value={reviewScore} onChange={(e) => setReviewScore(e.target.value)} />
    </label>
    <div className="addReviewBtnCont">
        <div id="reviewAddMsg" style={{marginLeft: '100px'}} className={reviewStatus === "success" ? "successMsg" : reviewStatus === "error" ? "errorMsg" : "hidden"}>

                    {reviewStatus === "success" && "Review added successfully!"}
                    {reviewStatus === "error" && "Something went wrong."}
        </div>
        {/* <div id="reviewAddMsg" style={{marginLeft: '100px'}} className="successMsg">
            Review added successfully!

        </div> */}
        <button style={{}} onClick={cancelAddReview} className="cancel">Cancel</button>
        <button style={{marginLeft:'20px'}} className="reviewSubmit" type="submit">Save</button>
    </div>

</form>




</div>

    ):typeof Number(editReview) === 'number' && editReview !== '' && editReviewEmpId === emp.id? (
        <div className="editReviewFormWrapper">
            <form className = "editReviewForm" key={editReview} onSubmit={(e) => handleReviewEditSubmit(e, editReview)}>
            <label style={{borderBottom:'1px solid lightgray',width:'100%',textAlign:'left',fontWeight:'bold',fontSize:'25px',   color: '#64728c',paddingBottom:'10px'}}>Edit Review</label>
            <label style={{marginTop:'40px'}}>
                Comments
                <input type="text" value={editedReviewComments} onChange={(e) => setEditedReviewComments(e.target.value)} />
            </label>
            <label style={{marginTop:'20px'}}>
                Score
                <input type="number" value={editedReviewScore} onChange={(e) => setEditedReviewScore(e.target.value)} />
            </label>
            <div className="editReviewDiv"></div>

            <div className="editReviewMsg" style={{width:'100%',justifyContent:'flex-end',display:'flex',marginTop:'10px'}}>
            <div style={{marginLeft:'100px'}} className={editReviewStatus === "success" ? "successMsg" : editReviewStatus === "error" ? "errorMsg" : "hidden"}>
                {editReviewStatus === "success" && "Review edited successfully!"}
                {editReviewStatus === "error" && "Something went wrong."}
            </div>

            {/* <div style={{marginLeft:'100px'}} className="successMsg">
                Review edited successfully!

            </div> */}


                <button style={{marginRight:'20px'}} onClick={cancelEditReview} className="cancel">Cancel</button>
                <button type="submit">Save</button>
            </div>


        </form>
        </div>

    ):null
}

        </>

    );
}

export default Review;
