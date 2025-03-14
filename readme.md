# if-domain

if-domain is a TypeScript-based repository that provides a set of REST API endpoints for creating and managing projects, updating project licenses, declarations, contributors, relations, locations, and proposing contributions. Additionally, the repository also provides endpoints for claiming projects from losh. To ensure the security of user data, if-domain utilizes Zenflows-crypto flow to verify the user's signature. When a user sends a request, they sign it with their eddsa key. The server then verifies the signature using the eddsa public key provided by Zenflows server. This verification process ensures that the request was indeed sent by the user and has not been tampered with in transit. By implementing this security measure, if-domain can guarantee the integrity of user data and protect against unauthorized access or malicious activities.

## Requirements

To use if-domain, you will need to have the following installed on your machine:

Node.js (v18)
pnpm (v6.14.2 or higher)

## Installation

Clone the repository using the following command:

```
git clone https://github.com/phoebubs-84/if-domain.git --recurse-submodules
```

Note: The --recurse-submodules option is required to clone the submodule used by if-domain.

Navigate to the cloned repository:

```
cd if-domain
```

Install dependencies using pnpm:

```
pnpm install
```

To use the if-domain service, you will need to provide and configure a '.env.local' file. This file should include the following variables:

- `GRAPHQL_ENDPOINT`: This should be set to the GraphQL endpoint URL for the service.
- `ZENFLOWS_ID`: This should be set to the Zenflows `ID` to comunicate with a zenflows instance.
- `UNIT_ONE`: This should be set to the Unit One `ID` provided from a zenflows instance.
- `LOSH_ID`: This should be set to the System User _Losh_ `ID`.
- `WALLET_ENDPOINT`: This should be set to the wallet endpoint URL for the service.
- `IDEA_POINTS_ON_FORK`, `IDEA_POINTS_ON_CREATE`, `IDEA_POINTS_ON_CONTRIBUTIONS`, `IDEA_POINTS_ON_STAR`, `IDEA_POINTS_ON_WATCH`, `IDEA_POINTS_ON_ACCEPT`, and `IDEA_POINTS_ON_CITE`: These variables should be set to the number of idea points awarded for the corresponding actions.
- `STRENGTHS_POINTS_ON_FORK`, `STRENGTHS_POINTS_ON_CREATE`, `STRENGTHS_POINTS_ON_CONTRIBUTIONS`, `STRENGTHS_POINTS_ON_STAR`, `STRENGTHS_POINTS_ON_WATCH`, `STRENGTHS_POINTS_ON_ACCEPT`, and `STRENGTHS_POINTS_ON_CITE`: These variables should be set to the number of strength points awarded for the corresponding actions.

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

Use --port to set the port you wish.

To run the server in development mode, use the following command:

```
pnpm dev
```

This will start the server with nodemon, which will automatically restart the server whenever changes are made to the code.

## API Endpoints

The following are the available REST API endpoints provided by if-domain:

| Endpoint                            | Interface | Returned Values | Use Case                                                    |
| ----------------------------------- | --------- | --------------- | ----------------------------------------------------------- |
| `/project/create`                   | TBD       | TBD             | Create a new project.                                       |
| `/project/:id/update/licenses`      | TBD       | TBD             | Update the licenses for a project with the given `id`.      |
| `/project/:id/update/declarations`  | TBD       | TBD             | Update the declarations for a project with the given `id`.  |
| `/project/:id/update/contributors`  | TBD       | TBD             | Update the contributors for a project with the given `id`.  |
| `/project/:id/update/relations`     | TBD       | TBD             | Update the relations for a project with the given `id`.     |
| `/project/:id/update/locations`     | TBD       | TBD             | Update the locations for a project with the given `id`.     |
| `/project/:id/propose/contribution` | TBD       | TBD             | Propose a contribution for the project with the given `id`. |
| `/resource/:id/claim`               | TBD       | TBD             | Claim a resource with the given `id`.                       |
| `/proposal/:id/accept`              | TBD       | TBD             | Accept a contribution proposal with the given `id`.         |
| `/proposal/:id/decline`             | TBD       | TBD             | Decline a contribution proposal with the given `id`.        |

## License

if-domain

    Copyright (c) 2021-2022 Dyne.org foundation, Amsterdam

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
