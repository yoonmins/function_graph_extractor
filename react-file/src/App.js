import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Graph Extractor</h1>
        <ul className='headerBanerList'>
          <li>Exponential function</li>
          <li>Logarithmic function</li>
          <li>Linear function</li>
          <li>Quadratic function</li>
          <li>Home</li>
        </ul>
      </header>
      <body className="App-header">
        <h2>함수 랜덤 추출기</h2>
        <p>랜덤함수 추출을 통한 그래프 시각화 (Python with sympy)</p>
        <img></img>
      </body>
      <footer>
      Copyright 2024. yoonmin All rights reserved.
      </footer>
    </div>
  );
}

export default App;
