import { ActionInput } from '../../lib/ActionInput';
import { AddIcon, CancelIcon, LoadingIcon, SearchIcon } from './icon/buttons';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { appSliceActions } from '../../state/zipcode';
import { useGetActiveZipcodesQuery } from '../../generated/graphql-operations';
import { useEffect } from 'react';
import Loading from '../Loading';
const ZipcodeFilter = () => {
  const dispatch = useAppDispatch();
  const zipcodeAddable = useAppSelector(
    (state) => state.zipCode.zipcodeAddable,
  );
  const zipcodeCancelable = useAppSelector(
    (state) => state.zipCode.zipcodeCancelable,
  );

  const fetchingActiveZipcodes = useAppSelector(
    (state) => state.zipCode.fetchingActiveZipcodes,
  );
  const filterValue = useAppSelector((state) => state.zipCode.filter);

  const ZipcodeInfoFetcher = () => {
    const [{ fetching, data, error, operation }] = useGetActiveZipcodesQuery({
      requestPolicy: 'network-only',
      variables: { zipcodes: [filterValue] },
    });

    useEffect(() => {
      if (!error && data) {
        const newZipcode = {
          zipCode: filterValue,
          id: '',
        };

        if (data?.activeZipcodes?.length) {
          const d = data?.activeZipcodes[0];
          if (d) {
            newZipcode['warehouse'] = {
              id: d.warehouseId,
              name: d.warehouseName,
            };
          }
        }
        dispatch(appSliceActions.addZipCode(newZipcode));
        dispatch(appSliceActions.setFetchingActiveZipCodes(false));
      }
    });

    return null;
  };

  const addLoading = () => {
    return fetchingActiveZipcodes && <Loading />;
  };

  const addButton = () => (
    <AddIcon
      onClick={(e) => {
        dispatch(appSliceActions.setFetchingActiveZipCodes(true));

        e.target.blur();
      }}
    />
  );

  const cancelButton = () => (
    <CancelIcon
      onClick={() => {
        dispatch(appSliceActions.setFilter(''));
      }}
    />
  );

  const handleKeyDown = (e) => {
    // do zipcode add when Enter is pressed
    const isEnter = e.keyCode === 13;

    if (isEnter && zipcodeAddable) {
      dispatch(appSliceActions.setFetchingActiveZipCodes(true));
    }
  };

  const handleValueChange = (value) => {
    // restrict input to 5 numeric digits
    const isNumber = /^[0-9]*$/i.test(value);
    const length = value.length;

    if (length <= 5 && isNumber) {
      dispatch(appSliceActions.setFilter(value));
    }
  };

  return (
    <>
      <ActionInput
        value={filterValue}
        placeholder="Filter/Add Zip Code"
        onChange={(value) => handleValueChange(value)}
        onKeyDown={handleKeyDown}
        leftIcon={<SearchIcon onClick={() => {}} />}
        rightIcon={
          zipcodeCancelable
            ? cancelButton()
            : zipcodeAddable
            ? fetchingActiveZipcodes
              ? addLoading()
              : addButton()
            : null
        }
      />
      {fetchingActiveZipcodes && <ZipcodeInfoFetcher />}
    </>
  );
};

export default ZipcodeFilter;
