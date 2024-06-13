import React, { useEffect, useState } from 'react'
// import Header from '../Components/header'
import { Link, useNavigate } from 'react-router-dom';
import './style.css'

const View = () => {
  let navigate = useNavigate();
  let data = JSON.parse(localStorage.getItem('users')) || [];
  const [record, setRecord] = useState(data);
  const [mdelets, setMdeletes] = useState("");
  const [mstatus, setMstatus] = useState("")
  const [status, setStatus] = useState("")
  const [sort, setSort] = useState("")
  const [search, setSearch] = useState("")
  const [filterRec, setFilterRec] = useState([])

  // multiple deleting start............................................................................... ...
  const handleMultiDel = (id, checked) => {
    let allIds = [...mdelets];
    if (checked) {
      allIds.push(id);
    }
    else {
      allIds = allIds.filter((val, i) => val !== id);
    }
    setMdeletes(allIds);
  }

  const handleMultipleDelete = () => {
    if (mdelets.length > 0) {
      let ans = confirm('delete this user?')
      if (ans) {
        let updatedata = record.filter((val) => !mdelets.includes(val.id));
        setRecord(updatedata);
        localStorage.setItem(('users'), JSON.stringify(updatedata));
      }
    }
    else {
      alert('select at least one user..');
    }
    setMdeletes("")
  }
  // multiple deleting end.................................................................................
  // multiple editing status-------------------------------------------------------------------------------
  const handleMultistatus = (id, checked) => {
    let allids = [...mstatus];
    if (checked) {
      allids.push(id)
    }
    else {
      allids = allids.filter((val) => val !== id);
    }
    setMstatus(allids);
  }

  const handleMultipleEditStatus = () => {
    let ans = confirm('Change this status ??');
    if (ans) {
      if (mstatus.length > 0) {
        let updatedData = record.map((val) => {
          if (mstatus.includes(val.id)) {
            if (val.status === 'active') {
              val.status = 'deactive'
            }
            else {
              val.status = 'active'
            }
          }
          return val;
        })
        setRecord(updatedData)
        localStorage.setItem(('users'), JSON.stringify(updatedData));
      }
      else {
        alert('select at least one user..');
      }
    }
    setMstatus("");
  }

  useEffect(() => {
    let filterData = [...record];

    if (status) {
      filterData = filterData.filter(val => val.status === status);
      console.log(filterData);
    }

    if (sort) {
      if (sort === 'aec') {
        filterData.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
      }
      else if (sort === 'dec') {
        filterData.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1)
      }
    }

    if (search) {
      filterData = filterData.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    setFilterRec(filterData)
  }, [status, sort, search])
  return (
    <div>
      {/* <Header /> */}
      <div className="container mt-5 view-body">
        <div className="row justify-content-center align-items-center">
          <div className="col border shadow pt-4 p-5">
            <div className=" d-flex justify-content-between mb-4">
              <h3 className='text-center text-uppercase'>USERS</h3>
              <Link to={'/'} className='btn btn-primary'>Add</Link>
            </div>
            <div className="row mb-3">
              <div className="col-4">
                <select className='form-control border shadow' onChange={(e) => setStatus(e.target.value)} value={status}>
                  <option value="">---select-status---</option>
                  <option value="active">Active</option>
                  <option value="deactive">Deactive</option>
                </select>
              </div>
              <div className="col-4">
                <select className='form-control border shadow' onChange={(e) => setSort(e.target.value)} value={sort}>
                  <option value="">---Sorting---</option>
                  <option value="aec">A-Z</option>
                  <option value="dec">Z-A</option>
                </select>
              </div>
              <div className="col-4">
                <form>
                  <input type="text" onChange={(e) => setSearch(e.target.value)} className='form-control border shadow' placeholder='search here' />
                </form>

              </div>
            </div>
            <table className="table table-secondary table-striped">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Password</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Courses</th>
                  <th scope="col">Date</th>
                  <th scope="col">Status</th>
                  <th scope="col">
                    <button className='btn fw-bold btn-light' onClick={handleMultipleDelete}>Delete</button>
                  </th>
                  <th>
                    <button className='btn btn-light fw-bold' onClick={handleMultipleEditStatus}>EditStatus</button>
                  </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  filterRec.map((val, i) => {
                    return (
                      <tr key={i}>
                        <td>{val.id}</td>
                        <td>{val.name}</td>
                        <td>{val.email}</td>
                        <td>{val.password}</td>
                        <td>{val.gender}</td>
                        <td>{val.selectedCourse.join(" , ")}</td>
                        <td>{val.date}</td>
                        <td>{val.status}</td>
                        <td>
                          <input type="checkbox" onChange={(e) => handleMultiDel(val.id, e.target.checked)} checked={mdelets.includes(val.id)} />
                        </td>
                        <td>
                          <input type="checkbox" onChange={(e) => handleMultistatus(val.id, e.target.checked)} checked={mstatus.includes(val.id)} />
                        </td>
                        <td>
                          <button className='btn btn-light border' onClick={() => navigate('/edit', { state: val })}>Edit</button>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </div >
  )
}

export default View
