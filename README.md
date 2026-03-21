# Secure & Scalable File Processing System on AWS

This project demonstrates a secure file upload and processing pipeline using AWS cloud architecture.

## Architecture

User → React Frontend  
→ Application Load Balancer  
→ EC2 Backend  
→ Lambda (Generate Presigned URL)  
→ S3 File Upload  
→ Lambda (Process File)  
→ AI API  
→ DynamoDB  
→ SES Email Notification  
→ CloudFront Download Link  

## AWS Services Used

- VPC  
- Subnets  
- NAT Gateway  
- EC2  
- Lambda  
- S3  
- DynamoDB  
- SES  
- CloudFront  
- ALB  

## Features

- Secure direct file upload to S3  
- Serverless processing with Lambda  
- AI API integration  
- Email notification after processing  
- Scalable architecture using VPC networking