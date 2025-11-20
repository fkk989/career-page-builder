# Technical Specification

### Assumptions

- Dashboard needed to updated company details

- Each company has one public career page

- Jobs are public, so APIs for jobs are not protected

- Career page sections are only editable by authenticated company owners and all the section will be predefined users can only edit the content

- Drag & drop reordering for the sections

- Will store edited section in localStorage as draft before publishing

### architecture

- Using Next.js (App Router) for both frontend and backend.
- when user signup we create a company and default sections of the career page.

### Data Schema

#### user

- Stores user profile
- **Relation** : one-one with company

#### Company

- Stores company data
- **Relation** : one-one with user
- **Relation** : one-many with section
- **Relation** : one-many with job

#### Section

- Stores career page sections data
- **Relation** : many-one with company

#### Job

- Stores Jobs Data
- **Relation** : many-one with company
