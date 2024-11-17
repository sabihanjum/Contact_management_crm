import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const API_URL = 'http://localhost:5000/contacts';

const App = () => {
    const [contacts, setContacts] = useState([]);
    const [formOpen, setFormOpen] = useState(false);
    const [formData, setFormData] = useState({ id: '', firstName: '', lastName: '', email: '', phone: '', company: '', jobTitle: '' });
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const response = await axios.get(API_URL);
            setContacts(response.data);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async () => {
        try {
            // Validate for duplicates
            const isDuplicate = contacts.some(
                (contact) =>
                    (contact.email === formData.email || contact.phone === formData.phone) &&
                    contact.id !== formData.id
            );

            if (isDuplicate) {
                alert("Duplicate contact found! Please check the email or phone number.");
                return;
            }

            if (editMode) {
                await axios.put(`${API_URL}/${formData.id}`, formData);
            } else {
                await axios.post(API_URL, formData);
            }
            fetchContacts();
            handleCloseForm();
        } catch (error) {
            console.error('Error saving contact:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            fetchContacts();
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    };

    const handleEdit = (contact) => {
        setFormData(contact);
        setEditMode(true);
        setFormOpen(true);
    };

    const handleCloseForm = () => {
        setFormOpen(false);
        setFormData({ id: '', firstName: '', lastName: '', email: '', phone: '', company: '', jobTitle: '' });
        setEditMode(false);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Contact Management</Typography>
            <Button variant="contained" onClick={() => setFormOpen(true)}>Add Contact</Button>

            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Company</TableCell>
                            <TableCell>Job Title</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {contacts.map((contact) => (
                            <TableRow key={contact.id}>
                                <TableCell>{contact.id}</TableCell>
                                <TableCell>{contact.firstName}</TableCell>
                                <TableCell>{contact.lastName}</TableCell>
                                <TableCell>{contact.email}</TableCell>
                                <TableCell>{contact.phone}</TableCell>
                                <TableCell>{contact.company}</TableCell>
                                <TableCell>{contact.jobTitle}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleEdit(contact)}>Edit</Button>
                                    <Button onClick={() => handleDelete(contact.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={formOpen} onClose={handleCloseForm}>
                <DialogTitle>{editMode ? 'Edit Contact' : 'Add Contact'}</DialogTitle>
                <DialogContent>
                    <TextField fullWidth margin="normal" label="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                    <TextField fullWidth margin="normal" label="Last Name" name="lastName" value={formData.lastName} onChange={handleInputChange} />
                    <TextField fullWidth margin="normal" label="Email" name="email" value={formData.email} onChange={handleInputChange} />
                    <TextField fullWidth margin="normal" label="Phone" name="phone" value={formData.phone} onChange={handleInputChange} />
                    <TextField fullWidth margin="normal" label="Company" name="company" value={formData.company} onChange={handleInputChange} />
                    <TextField fullWidth margin="normal" label="Job Title" name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseForm}>Cancel</Button>
                    <Button variant="contained" onClick={handleFormSubmit}>{editMode ? 'Update' : 'Save'}</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default App;
