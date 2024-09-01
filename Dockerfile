# Stage 1: Build the React frontend
FROM node:18 AS frontend-build
WORKDIR /frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Build the FastAPI backend
FROM python:3.11 AS backend
WORKDIR /backend
COPY backend/requirements.txt ./
RUN pip install -r requirements.txt
COPY backend/ ./

# Stage 3: Serve static files with FastAPI
FROM python:3.11
WORKDIR /app
COPY --from=backend /backend /app
COPY --from=frontend-build /frontend/build /app/frontend/build

# Install dependencies
RUN pip install fastapi uvicorn gunicorn

# Set environment variable for Python path
# ENV PYTHONPATH=/app

# Debugging step: Check installed packages
RUN pip show gunicorn uvicorn

# Debugging step: Verify executable paths

# Run the FastAPI app
CMD ["gunicorn", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "main:app"]
