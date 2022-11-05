import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { showErrorMessage } from '../helpers/message';
import { showLoading } from '../helpers/loading';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import { signin } from '../api/auth';
import { setAuthentication, isAuthenticated } from '../helpers/auth';


const Signin = () => {
  
  let navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated() && isAuthenticated().role === 1) {
      navigate('/admin/dashboard');
    } else if (isAuthenticated() && isAuthenticated().role === 0) {
      navigate('/user/dashboard');
    } else
    navigate('/signin');
  }, [navigate]);

  const [formData, setFormData] = useState({
    email: 'Vedant@gmail.com',
    password: 'Qwerty',
    error: '',
    loading: false,
  })

  const { email, password, error, loading } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value, error: "" })
    // console.log(formData)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if ( isEmpty(email) || isEmpty(password) ) {
      setFormData({ ...formData, error: 'All fields are required' })
    } else if (!isEmail(email)) {
      setFormData({ ...formData, error: 'Invalid email' })
    } else {
      const { email, password } = formData;
      const data = {  email, password };
      setFormData({ ...formData, loading: true })

      signin(data)
        .then (response => {
          setAuthentication(response.data.token, response.data.user)
          if (isAuthenticated() && isAuthenticated().role === 1) {
            console.log('Redirect to admin dashboard')
            navigate('/admin/dashboard')
          } else {
            console.log('Redirect to user dashboard')
            navigate('/user/dashboard')
          }
        })
        .catch(err => {
          console.log('Axios signin error', err)
        })
        
        
    }

  }

  const showSigninForm = () => (
    <section className="vh-100 bg-image" style={{backgroundImage: 'url("https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp")'}}>
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{borderRadius: '15px'}}>
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">LOGIN HERE</h2>
                    {error && showErrorMessage(error)}
                    {loading && <div className="text-center pb-4">{showLoading()}</div>}
                    <form onSubmit={handleSubmit}>
                      <div className="form-outline mb-2">
                        <input name='email' value={email} onChange = {handleChange} type="email" id="form3Example3cg" className="form-control form-control-lg" />
                        <label className="form-label" htmlFor="form3Example3cg">Your Email</label>
                      </div>
                      <div className="form-outline mb-2">
                        <input name='password' value={password} onChange = {handleChange} type="password" id="form3Example4cg" className="form-control form-control-lg" />
                        <label className="form-label" htmlFor="form3Example4cg">Password</label>
                      </div>
                      <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Login</button>
                      </div>
                      <p className="text-center text-muted mt-2 mb-0">Don't have a account? <Link to='/signup' className="fw-bold text-body"><u>Register here</u></Link></p>
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
    
  {showSigninForm()} 

</div>;

}

export default Signin