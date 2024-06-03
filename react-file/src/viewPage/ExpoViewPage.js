import React, { useState } from 'react';

const Expo = () => {
    const [formula, setFormula] = useState('');
    const [image, setImage] = useState('');

    const fetchPlot = async () => {
        const formData = new FormData();
        formData.append('function_type', 'exponential');
        try {
        const response = await fetch('http://127.0.0.1:3000/plot',  { //errror
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setFormula(data.formula);
        setImage(`data:image/png;base64,${data.image}`);
        } catch (error) {
            console.error('Error fetching plot:',  error.message); //errror
        }
    };

    return (
        <div className="App_body">
          <div className="title_section">
            <h2>지수함수 랜덤 추출기</h2>
            <p className='subtitleMessage'>랜덤 지수함수 추출을 통한 그래프 시각화</p>
            <p>(Python with sympy)</p>
            <button className='btnStart'  onClick={fetchPlot}>랜덤 추출</button>
          </div>
          <div className="img_section">
                <div className='img_section_img'>
                    {image && <img src={image} alt="Exponential Function Plot" />}
                    {formula && <p>Function: {formula}</p>}
                </div>
            </div>
        </div>
    );
}

export default Expo;