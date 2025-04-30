# TableTap

TableTap is a self-ordering service designed for modern restaurants. By scanning a QR code, customers can view the menu, place orders directly from their phones, and have those orders sent to the kitchen and counter in real time. Payments are made at the counter after dining.
<br>
<br>
**No downloads, no wait time — just seamless ordering and dining.**

## Applications
TableTap consists of three main applications:

  - Console – Admin and kitchen dashboard (this repository)

  - Shopper Web App – Customer-facing ordering interface (under development)

  - API – Backend service for handling all application logic ([(repo)](https://github.com/Tech-Notes/table-tap.api))

## Features
  - Admin can manage orders, menu items, tables.
  - Kitchen staff can view orders in real time and update their status to notify customers.

## Upcoming Features
  - Users and Roles management.
  - Sales report graphs for daily, monthly, and yearly sales.
  - Print order slips.
  - Export reports, orders, and table data to Excel.
  - Upload Excel files to create menu items.

## Project Status & Vision
TableTap is an ongoing long-term project, currently under active development. The goal is to bring this platform into real-world restaurant environments and continuously refine it based on practical use cases and feedback. Beyond the technical build, this project is also a learning and growth opportunity. Once the platform gains real users, it will serve as a base to offer internship opportunities—especially for those who haven’t yet worked on real-world applications.<br>
Taking full responsibility for this project is also part of my personal growth journey, helping me gain hands-on experience in leading and managing an end-to-end software product.

## Tech Stack
  - Frontend: Next.js, Tailwind CSS, Shadcn UI

  - Backend: Golang, PostgreSQL

  - Real-time: WebSockets, Redis (Pub/Sub)
  
  - File Storage: Amazon S3 

