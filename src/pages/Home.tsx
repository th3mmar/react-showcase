import ZipCodes from '../components/ZipCodes';
import ZipCodeFilter from '../components/zipcode-filter';

import { useAppDispatch, useAppSelector } from '../hooks/store';
import { appSliceActions } from '../state/zipcode';
import { useGetWarehouseInfoQuery } from '../generated/graphql-operations';

import { useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Box,
  Heading,
  Paragraph,
  ThemeUICSSObject,
} from 'theme-ui';
import Loading from '../components/Loading';
import Alert from '../components/Alert';
import { AppConfig } from '../config';
import InvalidWarehouseIdError from '../components/InvalidWarehouseIdError';
import { ZipcodesMap } from '../components/zipcodes-map';
export type IdProps = {
  id: string;
};

const flexWrapper: ThemeUICSSObject = {
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  height: 'calc(100vh - 140px)',
};

const HomeContent = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<IdProps>();
  const [{ fetching, data, error }] = useGetWarehouseInfoQuery({
    requestPolicy: 'network-only',
    variables: { warehouseId: id, active: true },
  });

  useEffect(() => {
    if (!fetching && data) {
      dispatch(
        appSliceActions.setWarehouse({
          id: data.warehouse.id,
          pkId: data.warehouse.pkId,
          name: data.warehouse.name,
          latitude: data.warehouse.vendor
            ? data.warehouse.vendor[0].address?.latitude
            : 0,
          longitude: data.warehouse.vendor
            ? data.warehouse.vendor[0].address?.longitude
            : 0,
        }),
      );

      dispatch(
        appSliceActions.setSavedZipCodes(
          data?.warehouse?.zipcodes ? data.warehouse.zipcodes : [],
        ),
      );
    }
  }, [data?.warehouse?.id]);

  return (
    <>
      {!fetching && data && (
        <Container paddingX={[4, 4, 11]} bg="muted">
          <Grid
            gap={24}
            columns={[2]}
            sx={{
              height: 'calc(100vh - 140px)',
              overflow: 'hidden',
            }}
          >
            <Box>
              <div sx={flexWrapper}>
                <Heading variant="headingLg" sx={{ mb: 4 }}>
                  {data.warehouse.name}
                </Heading>
                <Paragraph variant="labelLg" sx={{ mb: 4 }}>
                  Filter through your existing zip codes or enter a new one to
                  add it to the list.
                </Paragraph>
                <ZipCodeFilter />
                <ZipCodes />
              </div>
            </Box>
            <Box>
              <ZipcodesMap />
            </Box>
          </Grid>
        </Container>
      )}
      {!fetching && error && (
        <InvalidWarehouseIdError
          redirect={false}
          showAlert={true}
          error={error.message}
        />
      )}
    </>
  );
};
const HomeLoading = () => {
  const loading = useAppSelector((state) => state.loading.loading);
  const loadingText = useAppSelector((state) => state.loading.loadingText);

  return loading ? <Loading curtain text={loadingText} /> : null;
};
const Home = () => {
  return (
    <>
      <HomeLoading />

      <HomeContent />
    </>
  );
};

export default Home;
