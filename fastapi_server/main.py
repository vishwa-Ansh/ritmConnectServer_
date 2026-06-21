from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {
        "message": "FastAPI Working"
    }

@app.get("/students")
def get_students():
    print(dir(app))
    return [
        {
            "id": 1,
            "name": "Ansh"
        },
        {
            "id": 2,
            "name": "Rahul"
        }
    ]