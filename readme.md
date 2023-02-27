# if-domain
if-domain is a TypeScript-based repository that provides a set of REST API endpoints for creating and managing projects, updating project licenses, declarations, contributors, relations, locations, and proposing contributions. Additionally, the repository also provides endpoints for claiming resources.

## Requirements
To use if-domain, you will need to have the following installed on your machine:

Node.js (v18)
pnpm (v6.14.2 or higher)

## Installation
Clone the repository using the following command:

bash
Copy code
git clone https://github.com/phoebubs-84/if-domain.git --recurse-submodules
Note: The --recurse-submodules option is required to clone the submodule used by if-domain.

Navigate to the cloned repository:

bash
Copy code
cd if-domain
Install dependencies using pnpm:

Copy code
pnpm install
## Usage

To build the project, use the following command:
```
pnpm build
```
This will create a build folder in the project directory containing the compiled code.
To start the server, use the following command:

```
pnpm start
```

This will start the server on port 3000.

To run the server in development mode, use the following command:

```
pnpm dev
```
This will start the server with nodemon, which will automatically restart the server whenever changes are made to the code.

## API Endpoints
The following are the available REST API endpoints provided by if-domain:

| Endpoint                           | Interface                    | Returned Values            | Use Case                                                                                                                           |
| ---------------------------------- | ---------------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `/project/create`                  | TBD                          | TBD                        | Create a new project.                                                                                                              |
| `/project/:id/update/licenses`     | TBD                          | TBD                        | Update the licenses for a project with the given `id`.                                                                             |
| `/project/:id/update/declarations` | TBD                          | TBD                        | Update the declarations for a project with the given `id`.                                                                         |
| `/project/:id/update/contributors` | TBD                          | TBD                        | Update the contributors for a project with the given `id`.                                                                         |
| `/project/:id/update/relations`    | TBD                          | TBD                        | Update the relations for a project with the given `id`.                                                                            |
| `/project/:id/update/locations`    | TBD                          | TBD                        | Update the locations for a project with the given `id`.                                                                            |
| `/project/:id/propose/contribution`| TBD                          | TBD                        | Propose a contribution for the project with the given `id`.                                                                        |
| `/resource/:id/claim`              | TBD                          | TBD                        | Claim a resource with the given `id`.                                                                                              |


## License
if-domain is licensed under the MIT License. See LICENSE for more information.