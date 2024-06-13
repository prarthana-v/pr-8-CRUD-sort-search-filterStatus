import React, { useEffect, useState } from 'react'
import Header from '../Components/header'
import { Link } from 'react-router-dom';

const Add = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [gender, setGender] = useState("");
  const [selectedCourse, setSelectedCourse] = useState([])
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");

  let data = JSON.parse(localStorage.getItem('users')) ? JSON.parse(localStorage.getItem('users')) : [];
  const [record, setRecord] = useState(data);

  const handleCourses = (crs, checked) => {
    let allcrs = [...selectedCourse];
    if (checked) {
      allcrs.push(crs);
    }
    else {
      allcrs = allcrs.filter((c) => c != crs);
    }
    setSelectedCourse(allcrs)
  }
  let course = ["html", "css", "bootstrap", "js", "react js", "node js", "php", "angular", "python", "laravel"]

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !password || !email || !selectedCourse || !date || !status || !gender) {
      alert("Please fill all the fields")
      return false;
    }
    let obj = {
      id: Date.now(),
      name, email, password, gender, selectedCourse, date, status,
    }
    let newObj = [...record, obj];
    setRecord(newObj);
    localStorage.setItem(('users'), JSON.stringify(newObj));
    setName("")
    setEmail("")
    setPassword("")
    setGender("")
    setSelectedCourse([])
    setDate("")
    setStatus("")
    alert('user added');
    console.log(record);
  }
  return (
    <div>
      {/* <Header /> */}
      <div className="container mt-5">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-7 border shadow pt-4 p-5 view-body fw-bold">
            <div className=" d-flex justify-content-between mb-4">
              <h3 className='text-center text-uppercase fw-bolder'>Login Form</h3>
              <Link to={'/view'} className='btn btn-primary'>View</Link>

            </div>
            <form onSubmit={handleSubmit} >
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Full Name</label>
                <input type="text" placeholder='Jhon Smith' className="form-control" aria-describedby="emailHelp" onChange={(e) => setName(e.target.value)} value={name} />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                <input type="text" placeholder='example@xmail.com' className="form-control" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} value={email} />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Password</label>
                <input type="text" className=" form-control" aria-describedby="emailHelp" onChange={(e) => setPassword(e.target.value)} value={password} />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Gender</label>
                <div className="form-check">
                  <input class="form-check-input" type="radio" onChange={(e) => setGender(e.target.value)} value="male" checked={gender === 'male'} />
                  <label class="form-check-label" for="flexRadioDefault1">
                    Male
                  </label>
                </div>
                <div className="form-check">
                  <input class="form-check-input" type="radio" onChange={(e) => setGender(e.target.value)} checked={gender === 'female'} value="female" />
                  <label class="form-check-label" for="flexRadioDefault1">
                    Female
                  </label>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label d-block">Courses</label>
                {
                  course.map((c, i) => {
                    return (
                      <div class="form-check d-inline-block me-3">
                        <input class="form-check-input" type="checkbox" value="" onChange={(e) => handleCourses(c, e.target.checked)} checked={selectedCourse.includes(c)} />
                        <label class="form-check-label" for="flexCheckDefault">
                          {c}
                        </label>
                      </div>
                    )
                  })
                }
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Date</label>
                <input type="date" placeholder='' className="form-control" aria-describedby="emailHelp" onChange={(e) => setDate(e.target.value)} value={date} />
              </div>

              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Status</label>
                <select class="form-select" aria-label="Default select example" onChange={(e) => setStatus(e.target.value)} value={status}>
                  <option >---select-Status---</option>
                  <option value="active">active</option>
                  <option value="deactive">deactive</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Add
