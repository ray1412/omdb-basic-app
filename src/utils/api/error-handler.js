import _ from 'utils/lodash-wrapper';
import BadGatewayError from 'utils/errors/bad-gateway-error';
import ServiceUnavailableError from 'utils/errors/service-unavailable-error';
import ResourceNotFound from 'utils/errors/resource-not-found-error';

export default function handleError(error) {
  const { response, stack } = error;
  const status = _.get(response, 'status', null);

  switch (status) {
    case 404: {
      throw new ResourceNotFound('Please check your API URL', {
        response,
        stack,
      });
    }
    case 502: {
      throw new BadGatewayError('Server Not Responding', {
        response,
        stack,
      });
    }
    case 503: {
      throw new ServiceUnavailableError('Server unable to handle request', {
        response,
        stack,
      });
    }
    default: {
      throw error;
    }
  }
}
