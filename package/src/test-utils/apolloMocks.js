import getViewer from "../graphql/queries/viewer.graphql";

export default [
  {
    request: {
      query: getViewer
    },
    result: {
      data: {
        viewer: {
          _id: "1234"
        }
      }
    }
  }
];
