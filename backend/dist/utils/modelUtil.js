export function normalizeFeatureProperties(feature) {
    const normalized = {
        bbox: feature.bbox,
        geoCoordinates: feature.geometry.coordinates,
        geoType: feature.geometry.type,
        coarseLocation: feature.properties.coarseLocation,
        continent: feature.properties.context?.whosonfirst.continent,
        country: feature.properties.context?.whosonfirst.country,
        locality: feature.properties.context?.whosonfirst.locality,
        gid: feature.properties.gid,
        name: feature.properties.name
    };
    return normalized;
}
//# sourceMappingURL=modelUtil.js.map