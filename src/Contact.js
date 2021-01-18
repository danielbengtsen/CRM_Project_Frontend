import React from 'react';
import { useState } from 'react';
import apiFacade from './apiFacade';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-tabs/style/react-tabs.css';
import Grid from '@material-ui/core/Grid';
import PersonIcon from '@material-ui/icons/Person';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import BusinessIcon from '@material-ui/icons/Business';
import WorkIcon from '@material-ui/icons/Work';
import PhoneIcon from '@material-ui/icons/Phone';

const Contact = ({ contacts, loading, handleDelete, handleEditChange }) => {

    Modal.setAppElement('#root')
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            background: "#333333"
        }
    };

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [jobtitle, setJobtitle] = useState('');
    const [phone, setPhone] = useState('');
    const [editedPassword, setEditedPassword] = useState('');
    const [editMsg, setEditMsg] = useState('');
    const editStyleColor = <p className="sucsMsg">{editMsg}</p>

    function openModal(name, email, company, jobtitle, phone) {
        setIsOpen(true);
        setName(name);
        setEmail(email);
        setCompany(company);
        setJobtitle(jobtitle);
        setPhone(phone);
    }

    var subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#FFFFFF';
    }

    function closeModal(email) {
        setIsOpen(false);
    }

    function editUserSubmit(event) {
        /* event.preventDefault();
        apiFacade.editUser(username, editedPassword)
        .then(res => {
            closeModal();
            setEditMsg("The password has been updated!");
          }) */
    }

    function handleEditChange(event) {
        /* setEditedPassword(event.target.value); */
    };

    function modalShow() {
        return (
            <div ref={_subtitle => (subtitle = _subtitle)}>
                <ul className="list-group mb-4" key={email}>
                    <Modal
                        isOpen={modalIsOpen}
                        onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Example Modal">

                        <li className="list-group-item ownList">
                            <div className="mb-1">
                                <PersonIcon /> {name}
                            </div>
                            <div className="mb-1">
                                <AlternateEmailIcon /> {email}
                            </div>
                            <div className="mb-1">
                                <BusinessIcon /> {company}
                            </div>
                            <div className="mb-1">
                                <WorkIcon /> {jobtitle}
                            </div>
                            <div className="mb-1">
                                <PhoneIcon /> {phone}
                            </div>
                        </li>
                        <hr className="ownHr mt-3"></hr>
                        <form onChange={handleEditChange}>
                            <div>
                                <input className="form-control ownInputs mb-3" value={name} placeholder="Edit name.." id="editName"/>
                                <input className="form-control ownInputs mb-3" value={email} placeholder="Edit email.." id="editEmail"/>
                                <input className="form-control ownInputs mb-3" value={company} placeholder="Edit company.." id="editCompany"/>
                                <input className="form-control ownInputs mb-3" value={jobtitle} placeholder="Edit job title.." id="editJobtitle"/>
                                <input className="form-control ownInputs mb-3" value={phone} placeholder="Edit phone.." id="editPhone"/>
                            </div>
                            <div>
                                <button onClick={editUserSubmit} className="btn btn-black btnBorder">Update</button>
                                <button onClick={closeModal} Style="" className="btn btn-black btnBorder btnBorderClose">Close</button>
                            </div>
                        </form>
                    </Modal>
                </ul>
            </div>
        )
    }

    if(loading) {
        return <h2>Loading... </h2>;
    }

    let displayContacts = contacts.map((contact, index) => (
        <div key={index}>
            <ul className="list-group">
                <li className="list-group-item list-group-test">
                    <div className="btn-toolbar">
                        <ul key={contact.email}>
                            <p>Name: {contact.name}</p>
                            <p>Email: {contact.email}</p>
                            <p>Phone: {contact.phone}</p>
                            <button className="btn btn-black btnBorder btn-sm mr-2" onClick={() => handleDelete(contact.email)}>Delete</button>
                            <button className="btn btn-black btnBorder btn-sm mr-2" onClick={() => openModal(contact.name, contact.email, contact.company, contact.jobtitle, contact.phone)}>More</button> 
                        </ul>
                    </div>
                </li>
            </ul>
            <hr className="allUsersHr"></hr>
        </div>
    ));

    return (
        <div>
            {displayContacts}
            {modalShow()}
            {editStyleColor}
        </div>
    )
}

export default Contact;