# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /code

# Copy the requirements file into the container
COPY ./requirements.txt /code/requirements.txt

# Install dependencies
ENV PIP_DEFAULT_TIMEOUT=1000 \
    PIP_NO_CACHE_DIR=1
RUN pip install --upgrade pip && pip install --upgrade -r /code/requirements.txt

# --- Hugging Face Transformer Cache ---
# Pre-download the embedding model during the build process.
# This prevents a slow download on the first run of the container.
RUN python -c "from sentence_transformers import SentenceTransformer; SentenceTransformer('all-MiniLM-L6-v2')"

# Copy the application code and data into the container
COPY ./app /code/app
COPY ./scripts /code/scripts
COPY ./data /code/data

# Expose the port the app runs on
EXPOSE 8000

# Define the command to run your app using uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
