import { client } from "../graphql.js";
import { CREATE_LOCATION } from "../mutations.js";

export default async function handleCreateLocation(location,design) {
  console.log("create location", location, design);
  const remote = location.remote || design;
  const name = location.locationName;
  const addr = location.location?.address?.label;
  const position = location.location?.position;
  if (!name || name.length == 0) return { st: undefined, remote: remote };
  try {
    const { data } = await client.request(CREATE_LOCATION, {
      variables: {
        name: name,
        addr: addr,
        lat: position?.lat,
        lng: position?.lng,
      },
    });
    const spatialThing = data?.createSpatialThing.spatialThing;
    return { spatialThing, remote };
  } catch (e) {
    throw e;
  }
}