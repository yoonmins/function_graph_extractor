import logo from './logo.svg';
import './App.css';
import './styleFile/button.css';
import './styleFile/footer.css';
import './styleFile/header.css';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Graph Extractor</h1>
        <ul className='headerBanerList'>
          <li><a className="btn2" href="exponential">지수함수</a></li>
          <li><a className="btn2" href="logarithmic">로그함수</a></li>
          <li><a className="btn2" href="linear">일차함수</a></li>
          <li><a className="btn2" href="quadratic">이차함수</a></li>
          <li><a className="btn" href="">Home</a></li>
        </ul>
      </header>
      <body>
        <div className="App_body">
          <div className="title_section">
            <h1>함수 랜덤 추출기</h1>
            <h4>랜덤함수 추출을 통한 그래프 시각화 (Python with sympy)</h4>
            <button>시작하기</button>
          </div>
          <div className="img_section">
            <img src={logo} alt={`logo`} />
          </div>
        </div>
      </body>
      <footer>
        <p>
      Copyright 2024. yoonmin All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
