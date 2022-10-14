import axios from 'axios';
import zipCodeMarker1 from '../../assets/images/marker1.svg';
import zipCodeMarker2 from '../../assets/images/marker2.svg';
import zipCodeMarker3 from '../../assets/images/marker3.svg';
import exclamation from '../../assets/images/exclamation.svg';
import {
  highlightAddedFilterLayer,
  highlightAddedLayer,
  highlightDeletedFilterLayer,
  highlightDeletedLayer,
  highlightSavedFilterLayer,
  highlightSavedLayer,
  addedMarkerLayer,
  addedTakenMarkerLayer,
  deletedMarkerLayer,
  savedMarkerLayer,
  warehouseMarkerStyle,
  searchLayer,
  searchMarkerLayer,
} from './styles';
import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import Map, { Source, Layer, Marker } from 'react-map-gl';
import _ from 'lodash';

import { useAppSelector } from '../../hooks/store';
import Pin from './pin';
import Exclamation from './exclamation';

const MAPBOX_TOKEN = window.env.MAPBOX_TOKEN;
const BOUNDARIES_API_URL =
  'https://vanitysoft-boundaries-io-v1.p.rapidapi.com/rest/v1/public/boundary/zipcode';
const BOUNDARIES_API_KEY = window.env.BOUNDARIES_API_KEY;

export const ZipcodesMap = () => {
  const markerIcon1 = new Image(15, 15);
  markerIcon1.src = zipCodeMarker1;
  const markerIcon2 = new Image(15, 15);
  markerIcon2.src = zipCodeMarker2;
  const markerIcon3 = new Image(15, 15);
  markerIcon3.src = zipCodeMarker3;
  const exclamationIcon = new Image(15, 15);
  exclamationIcon.src = exclamation;

  const [map, setMap] = useState({} as any);
  const [maploaded, setMapLoaded] = useState(false);
  const [boundaryData, setBoundaryData] = useState(null as any);
  const [invalidZips, setInvalidZips] = useState([] as string[]);

  const warehouse = useAppSelector((state) => state.zipCode.warehouse);

  const saved = useAppSelector((state) => state.zipCode.savedZipCodes);
  const added = useAppSelector((state) => state.zipCode.addedZipCodes);
  const deleted = useAppSelector((state) => state.zipCode.deletedZipCodes);

  const filter = useAppSelector((state) => state.zipCode.filter);
  const addAble = useAppSelector((state) => state.zipCode.zipcodeAddable);

  const onHover = useCallback((event) => {}, []);

  const fly = (long, lat) => {
    map.flyTo({
      center: [long, lat],
      duration: 3000,
      zoom: 11,
    });
    setFlyOk(true);
  };

  useEffect(() => {
    if (
      maploaded &&
      filter.length === 5 &&
      boundaryData &&
      boundaryData.features
    ) {
      const filterZC = _.find(
        boundaryData.features,
        (feature) => feature?.properties?.zipCode === filter,
      );
      const lat = filterZC?.geometry?.geometries[0]?.coordinates[0];
      const long = filterZC?.geometry?.geometries[0]?.coordinates[1];
      if (_.isNumber(lat) && _.isNumber(long)) {
        fly(lat, long);
      }
    }
  }, [filter, boundaryData, maploaded]);

  useEffect(() => {
    if (
      maploaded &&
      warehouse?.latitude &&
      warehouse?.longitude &&
      _.isNumber(warehouse?.latitude) &&
      _.isNumber(warehouse?.longitude) &&
      !flyOk
    ) {
      fly(warehouse.longitude, warehouse.latitude);
    }
  }, [warehouse, maploaded]);

  useEffect(() => {
    if (maploaded && !flyOk) {
      const lat =
        boundaryData?.features[0]?.geometry?.geometries[0]?.coordinates[0];
      const long =
        boundaryData?.features[0]?.geometry?.geometries[0]?.coordinates[1];
      if (_.isNumber(lat) && _.isNumber(long)) {
        fly(lat, long);
      }
    }
  }, [boundaryData, maploaded]);

  // marker filter
  const filterMarkerAdded = useMemo(() => {
    const zipcodes = _.chain(added)
      .filter((o) => o.warehouse === undefined)
      .map('zipCode')
      .value();
    return ['all', ['==', '$type', 'Point'], ['in', 'zipCode', ...zipcodes]];
  }, [boundaryData, added]);

  const filterMarkerAddedTaken = useMemo(() => {
    const zipcodes = _.chain(added)
      .filter((o) => o.warehouse !== undefined)
      .map('zipCode')
      .value();
    return ['all', ['==', '$type', 'Point'], ['in', 'zipCode', ...zipcodes]];
  }, [boundaryData, added]);

  const exclamationMarkers = useMemo(() => {
    const zipcodes = _.chain(added)
      .filter((o) => o?.warehouse !== undefined)
      .map('zipCode')
      .value();
    if (boundaryData?.features) {
      return _.map(zipcodes, (z) => {
        const zc = _.find(
          boundaryData?.features,
          (feature) => feature?.properties?.zipCode === z,
        );
        return zc ? (
          <Marker
            latitude={zc?.geometry?.geometries[0]?.coordinates[1]}
            longitude={zc?.geometry?.geometries[0]?.coordinates[0]}
          >
            <Exclamation />
          </Marker>
        ) : null;
      });
    } else {
      return null;
    }
  }, [added, boundaryData]);

  const filterMarkerSaved = useMemo(() => {
    const zipcodes = _.map(saved, 'zipCode');
    return ['all', ['==', '$type', 'Point'], ['in', 'zipCode', ...zipcodes]];
  }, [boundaryData, saved]);

  const filterMarkerDeleted = useMemo(() => {
    const zipcodes = _.map(deleted, 'zipCode');
    return ['all', ['==', '$type', 'Point'], ['in', 'zipCode', ...zipcodes]];
  }, [boundaryData, deleted]);

  const filterSearchMarker = useMemo(() => {
    if (addAble) {
      return ['all', ['==', '$type', 'Point'], ['in', 'zipCode', filter]];
    } else {
      return ['in', 'zipCode', ''];
    }
  }, [filter, addAble]);

  // zipcodes filters
  const filterAdded = useMemo(() => {
    const zipcodes = _.map(added, 'zipCode');
    return ['in', 'zipCode', ...zipcodes];
  }, [boundaryData, added]);

  const filterDeleted = useMemo(() => {
    const zipcodes = _.map(deleted, 'zipCode');
    return ['in', 'zipCode', ...zipcodes];
  }, [boundaryData, deleted]);

  const filterSaved = useMemo(() => {
    const zipcodes = _.map(saved, 'zipCode');
    return ['in', 'zipCode', ...zipcodes];
  }, [boundaryData, saved]);

  // filtered zipcodes filters

  const filterAddedFilter = useMemo(() => {
    const zipcodes = _.chain(added)
      .map('zipCode')
      .filter((x) => _.startsWith(x, filter))
      .value();
    if (filter && zipcodes.length > 0) {
      return ['in', 'zipCode', ...zipcodes];
    } else {
      return ['in', 'zipCode', ''];
    }
  }, [filter, added]);

  const filterDeletedFilter = useMemo(() => {
    const zipcodes = _.chain(deleted)
      .map('zipCode')
      .filter((x) => _.startsWith(x, filter))
      .value();
    if (filter && zipcodes.length > 0) {
      return ['in', 'zipCode', ...zipcodes];
    } else {
      return ['in', 'zipCode', ''];
    }
  }, [filter, deleted]);

  const filterSavedFilter = useMemo(() => {
    const zipcodes = _.chain(saved)
      .map('zipCode')
      .filter((x) => _.startsWith(x, filter))
      .value();
    if (filter && zipcodes.length > 0) {
      return ['in', 'zipCode', ...zipcodes];
    } else {
      return ['in', 'zipCode', ''];
    }
  }, [filter, saved]);

  const filterSearch = useMemo(() => {
    if (addAble) {
      return ['in', 'zipCode', filter];
    } else {
      return ['in', 'zipCode', ''];
    }
  }, [filter, addAble]);

  const maxZipCountPerRequest = 1000;

  useEffect(() => {
    let allzips = [...saved, ...added, ...deleted].map((item) => item.zipCode);
    if (addAble) {
      allzips.push(filter);
    }
    // let allzipCount = allzips.length;

    if (boundaryData !== null) {
      // remove the zips for which boundary data is already available
      allzips = allzips.filter((zc) => {
        const zipBoundaryData = (feature) =>
          feature.type === 'Feature' && feature.properties.zipCode === zc;
        return boundaryData.features.find(zipBoundaryData) === undefined;
      });
    }

    allzips = allzips.filter((zc) => invalidZips.indexOf(zc) === -1);

    // let cachedzipCount = allzipCount - allzips.length;
    // console.log(`Zipcode boundary data: ${cachedzipCount} in cache out of ${allzipCount} in total on map`);

    if (allzips.length > 0) {
      const options = {
        method: 'POST',
        url: BOUNDARIES_API_URL,
        params: { combine: 'false', showCenter: 'true' },
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': BOUNDARIES_API_KEY,
          'X-RapidAPI-Host': 'vanitysoft-boundaries-io-v1.p.rapidapi.com',
        },
        data: '',
      };

      // newBD will be filled in chunks of [maxZipCountPerRequest] entries
      let newBD = null as any;

      const fetchers = fetchBoundaryData(options, allzips);
      const promises = fetchers.map((element) => element.promise);
      const zipChunks = fetchers.map((element) => element.zipChunk);

      // identify user provided zipcodes with no corresponding
      // data returned in the reponse of the boundary api call
      // these would be invalid zip codes
      const invalidsInBatch = [] as string[];

      Promise.all(promises).then((values) => {
        values.forEach((value, index) => {
          if (
            value?.status === 200 &&
            value?.statusText === 'OK' &&
            value?.data
          ) {
            const newDBChunk = value.data;
            const zipChunk = zipChunks[index];

            // identify user provided zipcodes with no corresponding
            // data returned in the reponse of the boundary api call
            // these would be invalid zip codes
            const features = newDBChunk.features as any[];
            const invalidsInChunk = zipChunk.filter((zc) => {
              const zipBoundaryData = (feature) =>
                feature.type === 'Feature' && feature.properties.zipCode === zc;
              return features.find(zipBoundaryData) === undefined;
            });

            invalidsInBatch.push(...invalidsInChunk);

            if (newBD === null) {
              newBD = newDBChunk;
            } else {
              newBD.features = newBD.features.concat(newDBChunk.features);
            }
          } else {
            console.warn('zipcode boundary api error', value);
          }
        });

        if (boundaryData !== null) {
          newBD.features = newBD.features.concat(boundaryData.features);
        }
        setBoundaryData(newBD);
      });

      invalidsInBatch.push(...invalidZips);
      setInvalidZips(invalidsInBatch);
    }
  }, [saved, added, deleted, addAble]);

  const fetchBoundaryData = (reqOptions, zips) => {
    let promises = [] as any[];

    // call the zip code boundary api with chunks of zipcodes
    const zipChunks = _.chunk(zips, maxZipCountPerRequest);
    for (let zipChunk of zipChunks) {
      reqOptions.data = '["' + zipChunk.join('","') + '"]';

      const res = axios.request(reqOptions);
      promises.push({ promise: res, zipChunk: zipChunk });
    }

    return promises;
  };

  const initialPosition = {
    latitude: 40,
    longitude: -100,
    zoom: 1,
  };

  const warehouseMarkerInfoPopup = useRef(null as any);
  const [flyOk, setFlyOk] = useState(false);

  return (
    <Map
      onLoad={(e) => {
        const map = e.target;
        setMap(map);
        setMapLoaded(true);
        map.addImage('_marker1', markerIcon1);
        map.addImage('_marker2', markerIcon2);
        map.addImage('_marker3', markerIcon3);
        // map.addImage('_exclamation', exclamationIcon);
      }}
      initialViewState={initialPosition}
      mapStyle="mapbox://styles/mapbox/light-v9"
      mapboxAccessToken={MAPBOX_TOKEN}
      onMouseMove={onHover}
    >
      <Source id="zipcodes" type="geojson" data={boundaryData}>
        {warehouse &&
        _.isNumber(warehouse?.latitude) &&
        _.isNumber(warehouse?.longitude) ? (
          <Marker
            longitude={warehouse?.longitude}
            latitude={warehouse?.latitude}
          >
            <div>
              <div
                ref={warehouseMarkerInfoPopup}
                style={warehouseMarkerStyle}
                sx={{
                  boxShadow: '0 0 10px rgba(91, 91, 91, 0.25)',
                  padding: '12px!important',
                  position: 'absolute',
                  bottom: '30px',
                  transform: 'translateX(-50%)',
                  left: '50%',
                }}
              >
                {warehouse.name}
              </div>
              <div
                onMouseOver={(e) => {
                  warehouseMarkerInfoPopup.current.style.display =
                    'inline-block';
                }}
                onMouseOut={(e) => {
                  warehouseMarkerInfoPopup.current.style.display = 'none';
                }}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: '0.3s',
                  padding: '5px 0 3px 5px',
                  borderRadius: '50%',
                  '&:hover': {
                    background: '#FBE8A8',
                    boxSizing: 'content-box',
                    transition: '0.3s',
                  },
                }}
              >
                <Pin />
              </div>
            </div>
          </Marker>
        ) : null}

        {exclamationMarkers}

        <Layer
          beforeId="waterway-label"
          {...highlightSavedLayer}
          filter={filterSaved}
        />
        <Layer
          beforeId="waterway-label"
          {...highlightDeletedLayer}
          filter={filterDeleted}
        />
        <Layer
          beforeId="waterway-label"
          {...highlightAddedLayer}
          filter={filterAdded}
        />

        <Layer
          beforeId="waterway-label"
          {...highlightSavedFilterLayer}
          filter={filterSavedFilter}
        />
        <Layer
          beforeId="waterway-label"
          {...highlightDeletedFilterLayer}
          filter={filterDeletedFilter}
        />
        <Layer
          beforeId="waterway-label"
          {...highlightAddedFilterLayer}
          filter={filterAddedFilter}
        />

        <Layer
          beforeId="waterway-label"
          {...addedMarkerLayer}
          filter={filterMarkerAdded}
        />
        <Layer
          beforeId="waterway-label"
          {...addedTakenMarkerLayer}
          filter={filterMarkerAddedTaken}
        />
        <Layer
          beforeId="waterway-label"
          {...savedMarkerLayer}
          filter={filterMarkerSaved}
        />
        <Layer
          beforeId="waterway-label"
          {...deletedMarkerLayer}
          filter={filterMarkerDeleted}
        />

        <Layer
          beforeId="waterway-label"
          {...searchMarkerLayer}
          filter={filterSearchMarker}
        />
        <Layer
          beforeId="waterway-label"
          {...searchLayer}
          filter={filterSearch}
        />
      </Source>
    </Map>
  );
};
