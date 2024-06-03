from fastapi import FastAPI, Form
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
import numpy as np
import matplotlib.pyplot as plt
from io import BytesIO
import base64

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/", response_class=HTMLResponse)
async def read_root():
    with open("static/index.html", "r", encoding="utf-8") as f:
        html_content = f.read()
    return HTMLResponse(content=html_content)

@app.post("/plot")
async def plot(function_type: str = Form(...), a: float = Form(1), b: float = Form(0), c: float = Form(0)):
    x_range = 100
    y_range = 100

    # 동적 범위 설정
    if abs(a) < 1:
        x_range = 10
    if abs(b) < 1:
        y_range = 10
    if abs(a) >= 10 or abs(b) >= 10 or abs(c) >= 10:
        x_range = 100
        y_range = 100

    if function_type == "linear":
        x = np.linspace(-x_range, x_range, 400)
        y = a * x + b
    elif function_type == "quadratic":
        x = np.linspace(-x_range, x_range, 400)
        y = a * x**2 + b * x + c
        if abs(a) >= 1:
            y_range = max(abs(a * x_range**2), y_range)
    elif function_type == "log":
        if a <= 0 or a == 1:
            return HTMLResponse(content="Parameter a must be > 0 and ≠ 1 for logarithmic functions", status_code=400)
        x = np.linspace(0.1, x_range, 400)
        y = np.log(x) / np.log(a) + b
    elif function_type == "exponential":
        if a <= 0 or a == 1:
            return HTMLResponse(content="Parameter a must be > 0 and ≠ 1 for exponential functions", status_code=400)
        x = np.linspace(-x_range, x_range, 400)
        y = a ** x
        y_range = max(abs(a ** x_range), y_range)
        plt.ylim(0, y_range)
        plt.xlim(-x_range, x_range)
    else:
        return HTMLResponse(content="Invalid function type", status_code=400)
    
    plt.figure()
    plt.plot(x, y)
    plt.title(f"{function_type.capitalize()} Function")
    plt.xlabel("x")
    plt.ylabel("y")
    if function_type != "exponential":
        plt.ylim(-y_range, y_range)
        plt.xlim(-x_range, x_range)

    buf = BytesIO()
    plt.savefig(buf, format="png")
    buf.seek(0)
    image_base64 = base64.b64encode(buf.read()).decode("utf-8")
    buf.close()
    plt.close()

    return HTMLResponse(f'<img src="data:image/png;base64,{image_base64}"/>')

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)
    