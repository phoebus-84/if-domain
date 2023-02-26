import createLocation from "../zenflows/createLocation";

export default async function handleCreateLocation(location:any, design:boolean) {
  console.log("create location", location, design);
  const remote = location.remote || design;
  const name = location.locationName;
  const address = location.location?.address?.label;
  const position = location.location?.position;
  if (!name || name.length == 0) return { st: undefined, remote: remote };
  try {
    const { data } = await createLocation({name, address, position:{
      lat: position?.lat,
      lng: position?.lng,
    }});
    const spatialThing = data?.createSpatialThing.spatialThing;
    return { spatialThing, remote };
  } catch (e) {
    throw e;
  }
}
