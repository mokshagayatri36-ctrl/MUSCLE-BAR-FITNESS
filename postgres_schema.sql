-- PostgreSQL Database Schema for Muscle Bar Fitness Centre
-- Production Deployment DDL Script

-- Create Users table
CREATE TABLE IF NOT EXISTS "User" (
    "id" VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) UNIQUE NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" VARCHAR(50) DEFAULT 'MEMBER'
);

-- Create MembershipPlans table
CREATE TABLE IF NOT EXISTS "MembershipPlan" (
    "id" VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "name" VARCHAR(255) NOT NULL,
    "duration" VARCHAR(100) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "benefits" TEXT NOT NULL
);

-- Create Trainer table
CREATE TABLE IF NOT EXISTS "Trainer" (
    "id" VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "name" VARCHAR(255) NOT NULL,
    "photo" TEXT NOT NULL,
    "experience" VARCHAR(255) NOT NULL,
    "certifications" TEXT NOT NULL,
    "achievements" TEXT NOT NULL
);

-- Create Programs table
CREATE TABLE IF NOT EXISTS "Program" (
    "id" VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "duration" VARCHAR(100) NOT NULL,
    "benefits" TEXT NOT NULL
);

-- Create Gallery table
CREATE TABLE IF NOT EXISTS "Gallery" (
    "id" VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "imageUrl" TEXT NOT NULL,
    "category" VARCHAR(100) NOT NULL
);

-- Create Enquiries table
CREATE TABLE IF NOT EXISTS "Enquiry" (
    "id" VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "name" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(50) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "plan" VARCHAR(100) NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Registrations table
CREATE TABLE IF NOT EXISTS "Registration" (
    "id" VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "name" VARCHAR(255) NOT NULL,
    "gender" VARCHAR(50) NOT NULL,
    "age" INTEGER NOT NULL,
    "phone" VARCHAR(50) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "address" TEXT NOT NULL,
    "selectedPlan" VARCHAR(100) NOT NULL,
    "status" VARCHAR(50) DEFAULT 'PENDING',
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Feedback table
CREATE TABLE IF NOT EXISTS "Feedback" (
    "id" VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "name" VARCHAR(255) NOT NULL,
    "rating" INTEGER NOT NULL,
    "review" TEXT NOT NULL,
    "approvalStatus" VARCHAR(50) DEFAULT 'PENDING',
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Payments table
CREATE TABLE IF NOT EXISTS "Payment" (
    "id" VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "memberName" VARCHAR(255) NOT NULL,
    "plan" VARCHAR(100) NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "paymentDate" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "status" VARCHAR(50) DEFAULT 'PENDING'
);
