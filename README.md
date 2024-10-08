# IDENTITY PROVIDER 

## Functional Requirements: 

1. User Authentication
2. User Authorization
3. MFA 
4. User management 
5. Logging And Auditing 
6. Password Policies 


## Non- Functional Requirements: 
1. Security 
2. High Availability
3. Scalability
4. Reliability
5. Logging and Monitoring

## Estimation And Contraints 

### Traffic 
- Assume we have: 
    - 50 million total users 
    - 5 million daily active user (DAU)
    - Each user 3 write time(login or register) a day 
    - Each user read info 1 time a day 

     This give 15 million users login per day

$$
5 \space million \times 3 \space login \space times = 15 \space million/day
$$

**Requests Per Second (RPS) for our system?**

Read per second: 57 requests/second

$$
\frac{5 \space million \times \space 1 \space time/day }{(24 \space hrs \times 3600 \space seconds)} = \sim 57 \space requests/second
$$


Write per Second: 173 requests/seconds

$$
\frac{5 \space million \times \space 3 \space time/day }{(24 \space hrs \times 3600 \space seconds)} = \sim 173 \space requests/second
$$

Write = 3 x Read => This is write-heavy system


### Storage 

**Account**
- int_account_id : BIGINT => 8 bytes
- str_email: VARCHAR(10) = > 10 bytes
- str_hashed_password: VARCHAR(128) => 128 bytes
- str_password_salt: VARCHAR(128) => 128 bytes
- str_last_login_ip: VARCHAR(128) => 128 bytes 
- dt_created_date: DATETIME  => 8 bytes
- dt_modified_date: DATETIME, => 8 bytes
- dt_password_changed: DATETIME => 8 bytes
- dt_last_login: DATETIME  => 8 bytes 

=> 8+10+128+128+128+8+8+8+8= 552 bytes

Total: 552 bytes per user 

Total Storage = Number of Users * Storage per User

$$
Total storage = 50 \space million * 552 \space bytes  = 27.6 \space GB 
$$

### Bandwidth 


#### Read Bandwidth:
------------------------

Assuming an average request size of 552 bytes (as calculated for storage per user), the read bandwidth can be estimated as follows:

Read Bandwidth: 
= Read Requests/second * Average Request Size

$$
ReadBandwidth= 57 \space requests/second \times 552 \space bytes/request = 31,464 \space bytes/second 
$$

Convert KB:

$$
ReadBandwidth= \frac{31,464 \space bytes/second}{1024 \space KB} = 31,5 \space KB/second
$$


----   

#### Write Bandwidth:
------------------------

$$
WriteBandwidth= 173 \space requests/second \times 552 \space bytes/request = 95,496 \space bytes/second 
$$

Convert KB: 

$$
WriteBandwidth= \frac{95,496 \space bytes/second}{1024 \space KB} = 93.33 \space KB/second
$$


------------------------
# System Estimates Overview

## Traffic
| Metric                   | Value                   |
|--------------------------|-------------------------|
| Total Users              | 50 million              |
| Daily Active Users (DAU) | 5 million               |
| Login/Registration RPS   | 173 (write-heavy)       |
| Read RPS                 | 57                      |

## Storage
| Data Element              | Size (bytes) |
|---------------------------|--------------|
| int_account_id (BIGINT)    | 8            |
| str_email (VARCHAR(10))    | 10           |
| str_hashed_password        | 128          |
| str_password_salt          | 128          |
| str_last_login_ip          | 128          |
| dt_created_date (DATETIME) | 8            |
| dt_modified_date (DATETIME)| 8            |
| dt_password_changed        | 8            |
| dt_last_login (DATETIME)   | 8            |
| **Total per User**         | **552**      |

**Total Storage Estimate: 27.6 GB**

## Bandwidth
| Operation          | Requests/second | Average Request Size | Bandwidth (KB/second) |
|--------------------|------------------|----------------------|------------------------|
| Read               | 57               | 552 bytes            | ~30.72                 |
| Write              | 173              | 552 bytes            | ~93.3                  |



### Clean Architecture
![image](https://github.com/user-attachments/assets/22a8adc2-9cdb-4557-9dbc-b62495bccf5f)


## API DESIGN 

## 1. User Registration

- **Endpoint:** `/register`
- **Method:** `POST`
- **Description:** Registers a new user in the system.
- **Request Body:**
```json
{
  "account": {
    "email": "examplddde@example.com",
    "password": "123456"
  },
  "info_user": {
    "name": "Ngoc Phu",
    "phone_number": "1234567890",
    "date_of_birth": "2023-11-12T08:00:23.719000",
    "gender": true,
    "address": "Ha Noi"
  }
}
```
- **Response:**

  - **Success Response:**
    - **Status Code:** 201 Created
    - **Description:** Registration is successful.

  - **Bad Request Response:**
    - **Status Code:** 400 Bad Request
    - **Description:** The request is malformed or missing required fields.

  - **Conflict Response:**
    - **Status Code:** 409 Conflict
    - **Description:** The email is already registered.

  - **Internal Server Error Response:**
    - **Status Code:** 500 Internal Server Error
    - **Description:** Other server-side errors.



## 2. User Login

- **Endpoint:** `/login`
- **Method:** `POST`
- **Description:** Authenticates a user and generates a session token.
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "user_password",
    "mfa_code": "optional_mfa_code"
  }
- **Response:**

  - **Success Response:**
    - **Status Code:** 201 Created
    - **Description:** Registration is successful.

  - **Unauthorized Response:**
    - **Status Code:** 401 Unauthorized
    - **Description:** Authentication fails due to incorrect credentials or MFA code.

  - **Not Found Response:**
    - **Status Code:** 404 Not Found
    - **Description:** The user account does not exist.

  - **Internal Server Error Response:**
    - **Status Code:** 500 Internal Server Error
    - **Description:** Other server-side errors.


## 3. User Logout

- **Endpoint:** `/logout`
- **Method:** `POST`
- **Description:** Logs out the currently authenticated user, invalidating the session token.
- **Request Cookie:**
  - `access_token: <session_token>`
  
- **Response:**
  - **Success Response:**
    - **Status Code:** 204 No Content
    - **Description:** Logout is successful.

  - **Unauthorized Response:**
    - **Status Code:** 401 Unauthorized
    - **Description:** The session token is invalid or expired.

  - **Internal Server Error Response:**
    - **Status Code:** 500 Internal Server Error
    - **Description:** Other server-side errors.



## 4. Update User Profile  
- **Endpoint:** `/user/profile`
- **Method:** `PUT`
- **Description:** Updates the user's profile information.
- **Request Cookie:**
  - `access_token: <session_token>`
- **Request Body:**
  ```json
  {
    "email": "new_email@example.com",
    "password": "new_password",
    "additional_fields": "..."
  }

- **Response:**
  - **Success Response:**
    - **Status Code:** 200 OK
    - **Description:** The update is successful.

  - **Bad Request Response:**
    - **Status Code:** 400 Bad Request
    - **Description:** The request is malformed or contains invalid data.

  - **Unauthorized Response:**
    - **Status Code:** 401 Unauthorized
    - **Description:** The session token is invalid or expired.

  - **Internal Server Error Response:**
    - **Status Code:** 500 Internal Server Error
    - **Description:** Other server-side errors.

## 5. Change Password

- **Endpoint:** `/user/password`
- **Method:** `PUT`
- **Description:** Changes the user's password.
- **Request Cookie:**
  - `access_token: <session_token>`
- **Request Body:**
  ```json
  {
    "old_password": "current_password",
    "new_password": "new_password"
  }
- **Response:**
  
  - **Success Response:**
    - **Status Code:** 200 OK
    - **Description:** The password change is successful.

  - **Bad Request Response:**
    - **Status Code:** 400 Bad Request
    - **Description:** The request is malformed or contains invalid data.

  - **Unauthorized Response:**
    - **Status Code:** 401 Unauthorized
    - **Description:** The session token is invalid or expired.

  - **Internal Server Error Response:**
    - **Status Code:** 500 Internal Server Error
    - **Description:** Other server-side errors.



