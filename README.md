# Secure & Scalable File Processing System on AWS

This project demonstrates a **production-style secure file upload and processing pipeline** built using AWS cloud architecture best practices.

The system is designed to be **highly available, scalable, and secure**, following real-world cloud architecture patterns.

---

## 📌 Project Objective

To design and implement a secure and scalable file processing system where:

- Users upload files via a web application  
- Files are stored securely in Amazon S3  
- Background processing is triggered automatically  
- External AI API is called for analysis  
- Results are stored in DynamoDB  
- Email notification is sent to the user  
- Files are delivered securely via CloudFront CDN  

---

## 🏗️ Architecture Overview

User → React Frontend → CloudFront → Application Load Balancer → EC2 Backend  
→ Lambda (Generate Presigned URL) → Direct Upload to S3  
→ S3 Event Trigger → Lambda (Process File)  
→ External AI API → DynamoDB Update → SES Email Notification  
→ CloudFront Secure File Access  

---

## 🧱 AWS Services Used

- Amazon VPC  
- Public & Private Subnets (Multi-AZ)  
- Internet Gateway  
- NAT Gateway  
- Application Load Balancer  
- EC2 Auto Scaling Group  
- AWS Lambda  
- Amazon S3  
- Amazon DynamoDB  
- Amazon SES  
- Amazon CloudFront  
- VPC Gateway Endpoints (S3 & DynamoDB)  
- IAM Roles & Security Groups  

---

## 🌐 Networking Design

- Custom VPC with CIDR `10.0.0.0/16`
- 2 Availability Zones for High Availability  
- Public Subnets:
  - Application Load Balancer  
  - NAT Gateway  
  - Bastion Host  

- Private Subnets:
  - Backend EC2 instances  
  - Processing Lambda  

- Route Strategy:
  - Internet traffic via Internet Gateway  
  - Private outbound traffic via NAT Gateway  

---

## 🔄 File Upload Strategy (Presigned URL Pattern)

Instead of uploading files through backend servers:

- Backend requests Lambda to generate **temporary presigned upload URL**
- Browser uploads file **directly to S3**
- This reduces backend load and improves scalability and security

---

## ⚙️ Serverless Processing Flow

### Lambda Function – Generate Presigned URL
- Generates temporary secure S3 upload URL  
- Returns URL to backend  

### Lambda Function – Process File
- Triggered automatically by S3 upload event  
- Runs inside private subnet  
- Fetches file from S3  
- Calls external AI API for analysis  
- Generates CloudFront access link  
- Updates DynamoDB record  
- Sends email via SES  

---

## 💾 Data Layer

### Amazon S3
- Stores uploaded files  
- Bucket kept **private**  
- Access allowed only via:
  - Presigned URL  
  - CloudFront Origin Access Control  

### Amazon DynamoDB
Stores:

- File metadata  
- Processing status  
- Generated AI result  
- CloudFront file link  

---

## 📧 Email Notification System

Amazon SES sends automated email:
Hello,
Your file has been processed successfully.
CloudFront Link:  AI Generated Result: 
Thank you.

---

## 🔐 Security Implementation

- Backend resources placed in **private subnets**
- No public IP for EC2 instances  
- NAT Gateway used for **outbound-only internet access**
- VPC Gateway Endpoints for S3 and DynamoDB  
- CloudFront Origin Access Control (OAC) to secure S3  
- Layered Security Groups  
- IAM Least Privilege roles  

---

## 📈 Scalability & High Availability

- Multi-AZ subnet deployment  
- Application Load Balancer health checks  
- EC2 Auto Scaling Group  
- Serverless background processing  
- CloudFront global content delivery  

---

## 🚀 Key Features

✅ Secure direct file upload to S3  
✅ Event-driven serverless processing  
✅ AI API integration  
✅ Email notification after processing  
✅ Secure CDN file delivery  
✅ Highly available multi-AZ architecture  
✅ Production-style VPC network design  

---

## 🧠 Learning Outcomes

This project demonstrates understanding of:

- Real-world VPC architecture design  
- Public vs Private subnet strategy  
- NAT Gateway usage  
- Gateway Endpoints for secure AWS access  
- Presigned URL upload architecture  
- Auto Scaling and Load Balancing  
- Serverless processing inside VPC  
- CloudFront secure content delivery  
- Integration of multiple AWS services  

---

## 📷 Architecture Diagram
https://drive.google.com/file/d/1kwD2_rRdtI5p44BDa40AiiVJXC2GriLu/view?usp=sharing

