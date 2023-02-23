import { client } from "./graphql.js";
export async function handleCreateLocation(formData,design) {
    const remote = formData.location.remote || design;
    const label =
      formData.location.locationName.length > 0
        ? formData.location.locationName
        : formData.location.location.address.label;
    const name = remote ? "remote" : label;
    const addr = remote ? "remote" : formData.location.location?.address.label;
    const position = formData.location.location?.position;
    try {
      const { data } = await client.request(CREATE_LOCATION,{
          name: name,
          addr: addr,
          lat: position?.lat || 0,
          lng: position?.lng || 0,
        });
      const st = data?.createSpatialThing.spatialThing;
      console.log("info: location created", st);
      return st;
    } catch (e) {
        console.error(e);
        return e
      throw e;
    }
  }
