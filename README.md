# Air Quality Data API

This is a RESTful API for managing and retrieving air quality data based on PM2.5 pollution levels. The API supports basic CRUD operations, filtering, and statistical analysis of the dataset.

## Prerequisites

Before running the project, ensure you have the following installed:

- **Docker**: Version `27.2.1`
- **Node.js**: Version `19.1.0`
- **TypeScript**: Version `^5.6.3`

### Additional Tools:

- **npm**: Version `9.1.2` or higher.

---

## Steps to Run the API via Docker

### Pre-steps:

Ensure the Docker daemon is running on your machine before proceeding.

### Steps:

1. Navigate to the root of the project.
2. Build and run the Docker container by running the following command:

   ```bash
   npm run docker:build-run
Once the container is running, you can start making API requests.

## Steps to Run Locally

### Pre-steps:

Ensure that you have the necessary version of npm (version 9.1.2) installed.

### Steps:

1.  Navigate to the root of the project.

2.  Install the dependencies by running:

    ```bash
    npm install
    ```

3.  Start the server by running:

    ```bash
    npm run start
Once the server is running, you can make requests to the same endpoints mentioned above.

# API Endpoints

### 1. **GET** `/data`

Retrieve all available air quality data.

---

### 2. **GET** `/data/:id`

Retrieve a specific data entry by ID.

---

### 3. **POST** `/data`

Add a new data entry. The request body should contain:

- **`lat`**: Latitude (required)
- **`long`**: Longitude (required)
- **`year`**: Year the data was recorded (required)
- **`pm25Level`**: PM2.5 pollution level (required)

#### Example Payload:

    {
        "lat": 37.774929,
        "long": -122.419418,
        "year": 2022,
        "pm25Level": 8.3
    }

---

### 4. **PUT** `/data/:id`

Update an existing data entry by ID.

#### Example Payload:

    {
        "lat": 40.712776,
        "long": -74.005974,
        "year": 2021,
        "pm25Level": 7.5
    }

---

### 5. **DELETE** `/data/:id`

Delete a data entry by ID.

---

### 6. **GET** `/data/filter?year=:year&lat=:lat&long=:long`

Filter the dataset based on the provided year, latitude, and longitude.

---

### 7. **GET** `/data/stats`

Retrieve basic statistics such as:

- **Total count of entries**
- **Average PM2.5 levels**
- **Minimum and maximum PM2.5 levels**
