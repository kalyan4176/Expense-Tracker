import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import { FaCamera, FaSpinner } from 'react-icons/fa';

const BillScanner = ({ onScanComplete }) => {
    const [scanning, setScanning] = useState(false);
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
            processImage(e.target.files[0]);
        }
    };

    const processImage = async (imageFile) => {
        setScanning(true);
        try {
            const result = await Tesseract.recognize(
                imageFile,
                'eng',
                { logger: m => console.log(m) }
            );

            const text = result.data.text;
            console.log("Scanned Text:", text);

            // Simple regex to try and find an amount
            const amountMatch = text.match(/(\d+\.\d{2})/);
            const amount = amountMatch ? parseFloat(amountMatch[0]) : 0;

            // Simple regex to try and find a date
            const dateMatch = text.match(/(\d{1,2}\/\d{1,2}\/\d{2,4})/);
            const date = dateMatch ? new Date(dateMatch[0]) : new Date();

            onScanComplete({
                amount,
                date,
                description: 'Scanned Receipt'
            });
        } catch (err) {
            console.error(err);
            alert('Failed to scan bill');
        } finally {
            setScanning(false);
        }
    };

    return (
        <div className="bill-scanner" style={{ marginBottom: '20px' }}>
            <input
                type="file"
                accept="image/*"
                id="bill-upload"
                style={{ display: 'none' }}
                onChange={handleImageChange}
            />
            <label
                htmlFor="bill-upload"
                className="btn btn-primary"
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                    cursor: 'pointer'
                }}
            >
                {scanning ? <FaSpinner className="fa-spin" /> : <FaCamera />}
                {scanning ? 'Scanning...' : 'Scan Bill'}
            </label>
            {image && (
                <div style={{ marginTop: '10px', textAlign: 'center' }}>
                    <img src={image} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px' }} />
                </div>
            )}
        </div>
    );
};

export default BillScanner;
