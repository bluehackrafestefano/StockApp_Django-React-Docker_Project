# Select a base image which suits your usecase
FROM python:3.10.8-slim-bullseye

# PYTHONDONTWRITEBYTECODE=1 env prevents Python from copying pyc files 
# to the container. 
ENV PYTHONDONTWRITEBYTECODE=1

# PYTHONUNBUFFERED=1 ensures that Python output is logged to 
# the terminal, making it possible to monitor Django logs in 
# realtime.
ENV PYTHONUNBUFFERED=1

WORKDIR /code

# Docker checks if layers can be reused, if it finds that there are 
# no changes to the requirements.txt file, it will jump straight 
# to the COPY instruction, which will be resolved in a matter of seconds. 
# With this tiny change, we speed up a lot the build process: No more 
# waiting for minutes between builds each time that we modify something 
# in our code.
COPY requirements.txt /code/requirements.txt

# Adding --no-cache-dir to the pip install command saves an 
# additional disk space, as this prevents pip from caching 
# downloads and caching wheels locally. Since you won't need 
# to install requirements again after the Docker image has 
# been created, this can be added to the pip install command.
RUN pip install -r requirements.txt --no-cache-dir

# Copy all the working directory to the container. Optionally a
# `.dockerignore` file can be used not to copy unrelated things
# to the continer and keep it smaller in size and less vulnerable
COPY . /code

CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]
