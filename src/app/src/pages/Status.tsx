import * as React from 'react';
import getStatus from '../api/status';

export const Status = () => {
  const [status, setStatus] = React.useState('');

  React.useEffect(() => {
    const getStatusFromApi = async () => {
      setStatus(await getStatus());
    };

    getStatusFromApi();
  }, []);

  return (
    <h1>
      App backend: <b>{status || 'not running'}</b>.
    </h1>
  );
};
