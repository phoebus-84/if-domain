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

