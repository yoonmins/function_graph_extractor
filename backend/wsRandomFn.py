from fastapi import FastAPI, Form
from fastapi.responses import   FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import numpy as np
import matplotlib.pyplot as plt
from io import BytesIO
import base64
import random
import os

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

# Serve React app
@app.get("/")
async def read_index():
    return FileResponse('static/index.html')

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update this with the frontend URL or use ["*"] to allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/plot")
async def plot(function_type: str = Form(...)):
    # 랜덤 정수 파라미터 생성
    a = random.randint(1, 10)
    b = random.randint(-10, 10)
    c = random.randint(-10, 10)
    
    x_range = 10
    y_range = 10

    # 그래프와 함수 식 생성
    if function_type == "linear": 
        x = np.linspace(-x_range, x_range, 400) #일차함수
        y = a * x + b
        function_formula = f"y = {a}x + {b}"
    elif function_type == "quadratic": 
        x = np.linspace(-x_range, x_range, 400) #이차함수
        y = a * x**2 + b * x + c
        function_formula = f"y = {a}x² + {b}x + {c}"
    elif function_type == "log":
        a = random.randint(2, 10)  # 로그 함수의 밑은 1과 0이 아닌 양의 정수
        x = np.linspace(0.1, x_range, 400)
        y = np.log(x) / np.log(a) + b
        function_formula = f"y = logₐ(x) + {b}, a = {a}"
    elif function_type == "exponential":
        a = random.randint(2, 10)  # 지수 함수의 밑은 1과 0이 아닌 양의 정수
        x = np.linspace(-x_range, x_range, 400)
        y = a ** x
        function_formula = f"y = {a}^x"
    else:
        return JSONResponse(content={"error": "Invalid function type"}, status_code=400)
    
    # 그래프 생성
    plt.figure()
    plt.plot(x, y)
    plt.title(f"{function_type.capitalize()} Function")
    plt.xlabel("x")
    plt.ylabel("y")
    plt.ylim(-y_range, y_range)
    plt.xlim(-x_range, x_range)
    plt.grid(True)  # 그리드 추가로 그래프를 더 명확하게 함

    # 그래프를 이미지로 변환
    buf = BytesIO()
    plt.savefig(buf, format="png")
    buf.seek(0)
    image_base64 = base64.b64encode(buf.read()).decode("utf-8")
    buf.close()
    plt.close()

    return JSONResponse(content={"formula": function_formula, "image": image_base64})

if __name__ == "__wsRandomFn__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=3000, reload=True)