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

const Contact = ({ deleteMsg, contacts, loading, handleDelete, handleEdit }) => {

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
    const edits = { editName: "", editEmail: "", editCompany: "", editJobtitle: "", editPhone: "" };
    const [contactEdit, setContactEdit] = useState(edits);
    const [editMsg, setEditMsg] = useState('');
    const editStyleColor = <p>{editMsg}{deleteMsg}</p>

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
        event.preventDefault();
        console.log("old mail: " + email);
        console.log("name: " + edits.editName);
        console.log("email: " + edits.editEmail);
        console.log("company: " + edits.editCompany);
        console.log("jobtitle: " + edits.editJobtitle);
        console.log("phone: " + edits.editPhone);
        apiFacade.editContact(email, edits.editName, edits.editEmail, edits.editCompany, edits.editJobtitle, edits.editPhone)
        .then(res => {
            closeModal();
            setEditMsg("Contact updated!");
            setTimeout(() => {
                setEditMsg("");
            }, 10000);
            console.log("Contact updated!", res)
          })
          .catch(err => {
            closeModal();
            Promise.resolve(err.fullError).then(function (value) {
                setEditMsg(value.message);
            });
            setTimeout(() => {
                setEditMsg("");
            }, 10000);
            console.log(err);
          })
        handleEdit();
    }

    function handleEditChange(event) {
        setContactEdit({ ...contactEdit, [event.target.id]: event.target.value });
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
                                <input className="form-control ownInputs mb-3" placeholder="Edit name.." id="editName"/>
                                <input className="form-control ownInputs mb-3" placeholder="Edit email.." id="editEmail"/>
                                <input className="form-control ownInputs mb-3" placeholder="Edit company.." id="editCompany"/>
                                <input className="form-control ownInputs mb-3" placeholder="Edit job title.." id="editJobtitle"/>
                                <input className="form-control ownInputs mb-3" placeholder="Edit phone.." id="editPhone"/>
                            </div>
                            <div>
                                <button onClick={editUserSubmit} className="btn btn-black btnBorder">Update</button>
                                <button onClick={closeModal} className="btn btn-black btnBorder btnBorderClose">Close</button>
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