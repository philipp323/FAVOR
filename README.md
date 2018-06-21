# v0.3 FAVOR RELEASE :pushpin:

## :clipboard: Table of Contents
- [Introduction](#arrow_forward-introduction)
- [Quickstart](#rocket-quickstart)
- [Site-List](#mag_right-site-list)
- [Feature-List](#memo-feature-list)
- [Change-Log](#floppy_disk-change-log)
- [Documentation](#page_facing_up-documentation)
- [Testing](#microscope-testing)
  - Testing-Documents
  - Known Issues
- [Contributing](#chart_with_upwards_trend-contributing)
- [Build with](#wrench-build-with)
- [Links](#link-links)
- [License](#lock-license)

## :arrow_forward: Introduction

 FAVOR is a project to improve family-life by helping planning tasks and structure everyday-life.  
 Developed with Materialize.
 
 This Relase (v0.3) **isn't** a final release and also not a online website which can be visited. 

## :rocket: Quickstart: 

- Clone v0.3 of FAVOR
  ```
  $ git clone https://github.com/philipp323/FAVOR.git
  $ git checkout tags/v0.3
  ```
  
- Start JSON-"Server"  
  (Install Instructions: [JSON-Server](https://github.com/typicode/json-server/blob/master/README.md))
  ```
  $ json server --watch favor.json
    \{^_^}/ hi!
    Loading favor.json
    DONE
    
    Resources
    http://localhost:3000/family
    http://localhost:3000/member
    http://localhost:3000/task
  ```
  
- Open "index.html" file

- Info: [Manual](Documents/Manual.pdf)

Just for design and animation reviewing, the website is already [reachable online.](http://favorproject.somee.com/index.html)  
:construction: Notice: No database connection given!

## :mag_right: Site-List:

#### List of all reachable HTML-Files
  - [index.html](http://favorproject.somee.com/index.html) (Frontpage with Product Introduction)
  - [about.html](http://favorproject.somee.com/about.html) (Page which shows us and our school)
  - creation.html (Page for the Family-Group-Creation-Process)
  - app.html (Page with Features and Functionalities, such as the Task-Create-Menu)

## :memo: Feature-List:

- Register (Family-Group)
  - Saves data to JSON-File
  - Table: "family"
- Family-Member-Creation
  - Saves data to JSON-File
  - Table: "member"
- Task-Creation
  - Saves data to JSON-File
  - Table: "task"
- Family-Overview
  - Gives information about the Family-Group
- Remove Member
  - In the Family-Overview
- Logout
  - Clears Local-Data

## :floppy_disk: Change-Log:

Reachable in the [Footer of our Website](http://favorproject.somee.com/#footer) -> "Website-History"

##  :page_facing_up: Documentation:

Project Documents:
- [System Specification](Documents/SystemSpecificationFavor.pdf)
- [Project Proposal](Documents/ProjectProposalFavor.pdf)
- [Manual](Document/Manual.pdf)

## :microscope: Testing:
Browser: FireFox Quantum 60.0.2

Testing-Documents:
  - [Test-Specification](Documents/Test-Specification.pdf)
  - [Test-Protocol](Documents/Test-Protocol.pdf)
  - [Test-Report](Documents/Test-Report.pdf)

Known Issues:
  - Error in Console when POST/DELETE a element (still works)
  - After task-creation site is needed to be reloaded
  - Problem with mobile-view in app.html

## :chart_with_upwards_trend: Contributing:

### Developers:
- Philipp Auinger
- Alexander Walter

School: HTL Leonding

More about us and our school on [our website](http://favorproject.somee.com/about.html)

### To see the contributions to master, of each developer, check out [this graph.](https://github.com/PhilippAuinger/FAVOR/graphs/contributors)

## :wrench: Build with:

- [Materialize](https://materializecss.com)
- [jQuery](https://jquery.com)
- [HeroPatterns](http://www.heropatterns.com)
- [StackOverflow](https://stackoverflow.com)
- HTML5
- CSS
- JavaScript

## :link: Links:
- [FAVOR](http://favorproject.somee.com/index.html)
- [Materialize](https://materializecss.com)
  - [Github](https://github.com/Dogfalo/materialize)
- [JSON-Server](https://github.com/typicode/json-server)


## :lock: License:

[MIT License](LICENSE)

Copyright (c) 2018 Philipp A.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
