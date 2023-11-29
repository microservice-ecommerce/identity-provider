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
