import React, {useState, Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from react-redux

const CreateProfile = props => {
    const [formData, setFormData] = useState({
        company: '',
        website:'',
        location: '',
        status: '',
        skills: '',
        githubusername: '',
        bio: '',

    })

    const {company, website, location, status, skills, githubusername, bio} = formData

    return (
        <Fragment>
            <h1 className="large text-primary">
            Create Your <Profile></Profile></h1>
        </Fragment>
    )
}
import {connect} from react-redux

CreateProfile.propTypes = {

}
import {connect} from react-redux

export default CreateProfile
