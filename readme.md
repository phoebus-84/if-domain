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

