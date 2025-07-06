# API Coordination for Drag & Drop Functionality

This document outlines the API endpoints that need to be implemented on the Python backend to support the drag and drop functionality for reordering experiences and skills.

## Overview

The frontend now includes drag and drop functionality that allows users to reorder items within sections (Experiences and Skills). When items are reordered, the frontend sends requests to update the order on the server.

## Required API Endpoints

### 1. Fetch Experiences
- **Endpoint**: `GET /resume/experience`
- **Purpose**: Retrieve all experiences for display
- **Expected Response Format**:
```json
[
  {
    "id": 1,
    "title": "Software Engineer",
    "company": "Tech Corp",
    "start_date": "2022-01-01",
    "end_date": "2023-12-31",
    "description": "Developed web applications using React and Python",
    "logo": "https://example.com/logo.png",
    "order": 0
  },
  {
    "id": 2,
    "title": "Junior Developer",
    "company": "StartupCo",
    "start_date": "2021-06-01",
    "end_date": "2021-12-31",
    "description": "Built frontend components and APIs",
    "logo": "https://example.com/logo2.png",
    "order": 1
  }
]
```

### 2. Fetch Skills
- **Endpoint**: `GET /resume/skill`
- **Purpose**: Retrieve all skills for display
- **Expected Response Format**:
```json
[
  {
    "id": 1,
    "name": "React",
    "proficiency": "Advanced",
    "logo": "https://example.com/react-logo.png",
    "order": 0
  },
  {
    "id": 2,
    "name": "Python",
    "proficiency": "Intermediate",
    "logo": "https://example.com/python-logo.png",
    "order": 1
  }
]
```

### 3. Update Experience Order
- **Endpoint**: `PUT /resume/experience/reorder`
- **Purpose**: Update the order of experiences when user drags and drops
- **Request Format**:
```json
{
  "experiences": [
    {
      "id": 2,
      "order": 0
    },
    {
      "id": 1,
      "order": 1
    }
  ]
}
```
- **Expected Response**: Success status (200 OK)

### 4. Update Skill Order
- **Endpoint**: `PUT /resume/skill/reorder`
- **Purpose**: Update the order of skills when user drags and drops
- **Request Format**:
```json
{
  "skills": [
    {
      "id": 3,
      "order": 0
    },
    {
      "id": 1,
      "order": 1
    },
    {
      "id": 2,
      "order": 2
    }
  ]
}
```
- **Expected Response**: Success status (200 OK)

### 5. Delete Experience
- **Endpoint**: `DELETE /resume/experience/{id}`
- **Purpose**: Delete a specific experience
- **Expected Response**: Success status (200 OK or 204 No Content)

### 6. Delete Skill
- **Endpoint**: `DELETE /resume/skill/{id}`
- **Purpose**: Delete a specific skill
- **Expected Response**: Success status (200 OK or 204 No Content)

## Database Schema Requirements

### Experiences Table
The experiences table should include an `order` field to store the display order:
- `id` (Primary Key)
- `title` (String)
- `company` (String)
- `start_date` (Date/String)
- `end_date` (Date/String, nullable)
- `description` (Text, nullable)
- `logo` (String, nullable)
- `order` (Integer) - **New field for ordering**

### Skills Table
The skills table should include an `order` field to store the display order:
- `id` (Primary Key)
- `name` (String)
- `proficiency` (String, nullable)
- `logo` (String, nullable)
- `order` (Integer) - **New field for ordering**

## Implementation Notes

1. **Default Ordering**: When fetching experiences or skills, they should be ordered by the `order` field in ascending order.

2. **New Item Order**: When a new experience or skill is added, it should be assigned the next available order number (max current order + 1).

3. **Reordering Logic**: When updating order, the backend should update all affected items' order values based on the provided array.

4. **Error Handling**: The API should return appropriate error responses (400, 404, 500) with descriptive error messages.

5. **Data Validation**: Validate that all required fields are present and have valid values.

## Frontend Integration

The frontend components are already implemented and will:
- Automatically fetch data on component mount
- Send reorder requests when items are dragged and dropped
- Handle loading states and error conditions
- Provide visual feedback during drag operations

## Testing

Make sure to test:
- Fetching empty lists (should return empty arrays)
- Reordering with different combinations
- Error scenarios (invalid IDs, network errors)
- Concurrent access scenarios

## Related GitHub Issue

This implementation relates to issue: MLH-Fellowship/orientation-project-python#11