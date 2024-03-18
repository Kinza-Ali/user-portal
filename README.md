# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts
Install node packages
### `npm install`

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


## Structure of a code


## Tools & Technologies

Following table shows list of tools used in this project.

| Tool / Tech       | Purpose / Description                             |
|-------------------|---------------------------------------------------|
| TypeScript        | Typings for JavaScript                            |    
| React-Router-DOM  | Navigation Management                             |   
| Chakra UI         | UI Components library                             |
| Tanstack/react-table   | Data table for rendering large row/cell data.|
| Redux-Toolkit     | Standardized way of writing redux logic           |
| Github            | Run                                               |  
| React-Leaflet     | Map implementation                                |  


## Project Structure

The project is structured as follows:

| Directory   | Description                                                                                                     |
|-------------|-----------------------------------------------------------------------------------------------------------------|
| `assets`    | Contains static assets such as images, fonts, and other media files.                                           |
| `components`| Houses reusable React components that can be used across multiple pages or sections of your application.         |
| `pages`     | Contains top-level components representing different pages or views of your application.                        |
| `routes`    | Holds the route configurations for your application, typically using a routing library like React Router.       |
| `http`      | Includes modules for handling HTTP requests, such as API services or utilities for making network calls.        |
| `constants` | Stores constant values used throughout your application, such as API endpoints or configuration settings.       |
| `store`     | Houses Redux-related files if you're using Redux for state management, including actions, reducers, and store setup. |


# Components

This directory contains reusable React components that can be utilized across multiple pages or sections of your application.

## Available Components

| Components   | Description                                                                                                     |
|-------------|-----------------------------------------------------------------------------------------------------------------|
| Maps                        | A component for displaying maps on profile|
| Search Bar                  | A searchable  component that allows users to search firts, last names,email and phone                           |
| Grid View for Data Listing  | Displays data in a grid format, suitable for presenting a collection of items with uniform structure.         |
| Data Table for Listing      | Presents tabular data with feature  such as filtering on the basis of gender, and pagination for effective data representation. |
| Pagination for Data Table   | Implements pagination functionality for splitting large datasets into manageable pages.                       |
| Search                      | Provides a search input component for users to search for search firts, last names,email and phone within a given dataset. |
| User Info                   | Displays user information, such as profile details or user preferences.                                     |

## Functionalities
- Loader when data is being loaded. 
- Implementation of filter gender based. 
- Implementation of search functionality based on first and last gender, emails and phone
- Displaying data in Grid Layout or Table View
- Pagination for Data Table
- Profile information on click of CTA (action button in last column) for table
- Profile information on click of card view for grid
