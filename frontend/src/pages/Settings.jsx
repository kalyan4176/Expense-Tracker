import React, { useState, useEffect } from 'react';
import { useCurrency } from '../context/CurrencyContext';
import api from '../utils/api';
import { useToast } from '../context/ToastContext';

const Settings = () => {
    const { currencies, updateCurrencyState } = useCurrency();
    const { showToast } = useToast();
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        salary: '',
        currency: 'INR'
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get('/user/profile');
                setFormData({
                    name: res.data.name,
                    mobile: res.data.mobile,
                    salary: res.data.salary || 0,
                    currency: res.data.currency || 'INR'
                });
            } catch (err) {
                console.error(err);
            }
        };
        fetchProfile();
    }, []);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            await api.put('/user/profile', formData);
            updateCurrencyState(formData.currency);
            showToast('Profile Updated Successfully', 'success');
        } catch (err) {
            console.error(err);
            showToast('Error updating profile', 'error');
        }
    };

    return (
        <div className="container">
            <h2 style={{ marginBottom: '20px', background: 'linear-gradient(to right, #c084fc, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Settings</h2>
            <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" name="name" value={formData.name} onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <label>Mobile Number</label>
                        <input type="text" name="mobile" value={formData.mobile} onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <label>Monthly Salary / Income</label>
                        <input type="number" name="salary" value={formData.salary} onChange={onChange} placeholder="Enter your monthly income" />
                    </div>
                    <div className="form-group">
                        <label>Currency</label>
                        <select name="currency" value={formData.currency} onChange={onChange}>
                            {Object.keys(currencies).map(code => (
                                <option key={code} value={code}>
                                    {code} ({currencies[code].symbol})
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '20px' }}>Save Changes</button>
                </form>
            </div>
        </div>
    );
};

export default Settings;
