import React from 'react';
import logo from '/Users/yoonsungmin/Documents/GitHub/function_graph_extractor/react-file/src/logo.svg';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="App_body">
          <div className="title_section">
            <h2>함수 랜덤 추출기</h2>
            <p className='subtitleMessage'>랜덤 지수함수 추출을 통한 그래프 시각화</p>
            <p>(Python with sympy)</p>
            <Link className='btnHomeStart' to="/expoViewPage"><span>시작하기</span></Link>
          </div>
          <div className="img_section">
            <div className='img_section_img'>
                {<img src={logo} alt={`logo`} />}
            </div>
          </div>
        </div>
    );
}

export default Home;
