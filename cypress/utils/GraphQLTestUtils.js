export const hasOperationName = (req, operationName) => {
      const { body } = req;
      return (
        body.hasOwnProperty('operationName') && body.operationName === operationName
      );
    };

    // Alias query if operationName matches
    export const aliasQuery = (req, operationName) => {
      if (hasOperationName(req, operationName)) {
        req.alias = `gql${
          operationName[0].toUpperCase() + operationName.slice(1)
        }Query`;
      }
    };

    // Alias mutation if operationName matches
    export const aliasMutation = (req, operationName) => {
      if (hasOperationName(req, operationName)) {
        req.alias = `gql${
          operationName[0].toUpperCase() + operationName.slice(1)
        }Mutation`;
      }
    };
