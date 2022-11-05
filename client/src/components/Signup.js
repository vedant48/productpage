import React, { useState, useEffect } from 'react'
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import equals from 'validator/lib/equals';
import { showErrorMessage, showSuccessMessage } from '../helpers/message';
import { showLoading } from '../helpers/loading';
import {signup } from '../api/auth';
import { Link, useNavigate } from 'react-router-dom';
import './css/css.css'
import { setAuthentication, isAuthenticated } from '../helpers/auth';

const Signup = () => {

  let navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated() && isAuthenticated().role === 1) {
      navigate('/admin/dashboard');
    } else if (isAuthenticated() && isAuthenticated().role === 0) {
      navigate('/user/dashboard');
    } else
    navigate('/signup');
  }, [navigate]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    error: '',
    success: false,
    loading: false
  })
  
  const { name, email, password, password2, error, success, loading } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, error: false, [e.target.name]: e.target.value, success: "", error: "" })
    // console.log(formData)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isEmpty(name) || isEmpty(email) || isEmpty(password) || isEmpty(password2)) {
      setFormData({ ...formData, error: 'All fields are required' })
    } else if (!isEmail(email)) {
      setFormData({ ...formData, error: 'Invalid email' })
    } else if (!equals(password, password2)) {
      setFormData({ ...formData, error: 'Passwords do not match' })
    } else {
      const { name, email, password } = formData;
      const data = { name, email, password };
      setFormData({ ...formData, loading: true })

      signup(data)
        .then (response => {
          console.log('Axios signup success', response)
          setFormData({
            name: '',
            email: '',
            password: '',
            password2: '',
            success: response.data.successMessage,
            loading: false
          })
        })
        .catch(err => {
          console.log('Axios signup error', err)
          setFormData({...formData, loading: false, error: err.response.data.errorMessage})
        })


      console.log(data)
    }
    console.log(formData)
  }

  const showSignupForm = () => (
    <section className="vh-100 bg-image" style={{backgroundImage: 'url("https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp")'}}>
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{borderRadius: '15px'}}>
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">Create an account</h2>
                    {success && showErrorMessage(success)}
                    {error && showErrorMessage(error)}
                    {loading && ( <div className="text-center pb-4">{showLoading()}</div> )}
                    <form onSubmit={handleSubmit}>
                      <div className="form-outline mb-2">
                        <input name='name' value={name} onChange = {handleChange} type="text" id="form3Example1cg" className="form-control form-control-lg" />
                        <label className="form-label" htmlFor="form3Example1cg">Your Name</label>
                      </div>
                      <div className="form-outline mb-2">
                        <input name='email' value={email} onChange = {handleChange} type="email" id="form3Example3cg" className="form-control form-control-lg" />
                        <label className="form-label" htmlFor="form3Example3cg">Your Email</label>
                      </div>
                      <div className="form-outline mb-2">
                        <input name='password' value={password} onChange = {handleChange} type="password" id="form3Example4cg" className="form-control form-control-lg" />
                        <label className="form-label" htmlFor="form3Example4cg">Password</label>
                      </div>
                      <div className="form-outline mb-2">
                        <input name='password2' value={password2} onChange = {handleChange} type="password" id="form3Example4cdg" className="form-control form-control-lg" />
                        <label className="form-label" htmlFor="form3Example4cdg">Repeat your password</label>
                      </div>
                      <div className="form-check d-flex justify-content-center mb-2">
                        <input className="form-check-input me-2 " style={{marginLeft:"-310px"}} type="checkbox" defaultValue id="form2Example3cg" />
                        <label className="form-check-label" htmlFor="form2Example3g">
                          I agree all statements in <a href="#!" className="text-body"><u>Terms of service</u></a>
                        </label>
                      </div>
                      <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                      </div>
                      <p className="text-center text-muted mt-2 mb-0">Have already an account? <Link to='/signin' className="fw-bold text-body"><u>Login here</u></Link></p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
  return <div>
    
    {showSignupForm()} 
  
  </div>;
}

export default Signup