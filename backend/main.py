from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .models import PipelineData
from .graph_logic import analyze_pipeline

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Change this for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/ping")
def ping():
    return {"Ping": "Pong"}

@app.post("/api/pipelines/parse")
def parse_pipeline(pipeline: PipelineData):
    result = analyze_pipeline(pipeline.nodes, pipeline.edges)
    return result