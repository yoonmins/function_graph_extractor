import React,  { useState } from 'react';

const Log = () => {
    const [formula, setFormula] = useState('');
    const [image, setImage] = useState('');

    const fetchPlot = async () => {
        const formData = new FormData();
        formData.append('function_type', 'log');

        const response = await fetch('http://127.0.0.1:3000/plot', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const data = await response.json();
            setFormula(data.formula);
            setImage(`data:image/png;base64,${data.image}`);
        } else {
            console.error('Error fetching plot');
        }
    };
    return (
        <div className="App_body">
          <div className="title_section">
            <h2>로그함수 랜덤 추출기</h2>
            <p className='subtitleMessage'>랜덤 로그함수 추출을 통한 그래프 시각화</p>
            <p>(Python with sympy)</p>
            <button className='btnStart' onClick={fetchPlot}>랜덤 추출</button>
          </div>
          <div className="img_section">
                <div className='img_section_img'>
                    {image && <img src={image} alt="Log Function Plot" />}
                    {formula && <p>Function: {formula}</p>}
                </div>
            </div>
        </div>
    );
}

export default Log;